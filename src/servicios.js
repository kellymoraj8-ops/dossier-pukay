
"use strict";

// Servicios del prototipo Node.js de PUKAY.
// Conserva las funciones originales para Cucumber
// y agrega adaptadores para el contrato OpenAPI.

const {
  generarHash,
  verificarPassword,
  generarToken,
} = require("./seguridad");

const error = (estado, mensaje) => ({
  estado,
  cuerpo: { mensaje },
});

const errorOpenAPI = (estado, mensaje) => ({
  estado,
  cuerpo: {
    estado: "error",
    mensaje,
  },
});

const aPublica = (a) => ({
  id: a.id,
  deporte: a.deporte,
  fecha: a.fecha,
  duracion: a.duracion,
  distancia: a.distancia,
  comentario: a.comentario,
});

const textoVacio = (v) =>
  typeof v !== "string" || v.trim() === "";

function registrarUsuario(almacen, cuerpo) {
  if (textoVacio(cuerpo.correo) || textoVacio(cuerpo.password)) {
    return error(400, "Correo y contraseña son obligatorios");
  }

  if (almacen.usuarios.some((u) => u.correo === cuerpo.correo)) {
    return error(409, "El correo ya está registrado");
  }

  const { sal, hash } = generarHash(cuerpo.password);

  const usuario = {
    id: almacen.siguienteUsuario++,
    correo: cuerpo.correo,
    sal,
    hash,
  };

  almacen.usuarios.push(usuario);

  return {
    estado: 201,
    cuerpo: {
      id: usuario.id,
      correo: usuario.correo,
    },
  };
}

function iniciarSesion(almacen, cuerpo) {
  if (textoVacio(cuerpo.correo) || textoVacio(cuerpo.password)) {
    return error(400, "Correo y contraseña son obligatorios");
  }

  const usuario = almacen.usuarios.find(
    (u) => u.correo === cuerpo.correo
  );

  if (
    !usuario ||
    !verificarPassword(
      cuerpo.password,
      usuario.sal,
      usuario.hash
    )
  ) {
    return error(401, "Credenciales no válidas");
  }

  const token = generarToken();

  almacen.sesiones.set(token, usuario.id);

  return {
    estado: 200,
    cuerpo: { token },
  };
}

function listarDeportes(almacen) {
  return {
    estado: 200,
    cuerpo: almacen.deportes,
  };
}

function registrarActividad(almacen, usuarioId, cuerpo) {
  const deportes = almacen.deportes.map((d) => d.nombre);

  if (!deportes.includes(cuerpo.deporte)) {
    return error(400, "Deporte no válido");
  }

  if (
    textoVacio(cuerpo.fecha) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(cuerpo.fecha)
  ) {
    return error(400, "La fecha es obligatoria (AAAA-MM-DD)");
  }

  if (
    !Number.isInteger(cuerpo.duracion) ||
    cuerpo.duracion < 1
  ) {
    return error(400, "La duración en minutos es obligatoria");
  }

  if (
    cuerpo.distancia !== undefined &&
    (
      typeof cuerpo.distancia !== "number" ||
      !Number.isFinite(cuerpo.distancia) ||
      cuerpo.distancia < 0
    )
  ) {
    return error(
      400,
      "La distancia debe ser un número mayor o igual a 0"
    );
  }

  const actividad = {
    id: almacen.siguienteActividad++,
    usuarioId,
    deporte: cuerpo.deporte,
    fecha: cuerpo.fecha,
    duracion: cuerpo.duracion,
    distancia: cuerpo.distancia,
    comentario: cuerpo.comentario,
  };

  almacen.actividades.push(actividad);

  return {
    estado: 201,
    cuerpo: aPublica(actividad),
  };
}

function listarActividades(almacen, usuarioId) {
  const propias = almacen.actividades
    .filter((a) => a.usuarioId === usuarioId)
    .map(aPublica);

  return {
    estado: 200,
    cuerpo: propias,
  };
}

// ----------------------------------------------------
// ADAPTADORES DEL CONTRATO OPENAPI
// ----------------------------------------------------

const equivalenciasDeportes = {
  Running: "running",
  Caminata: "caminata",
  Ciclismo: "ciclismo",
  "Fútbol": "fútbol",
  Gimnasio: "gimnasio",
  "Natación": "natación",
};

function iniciarSesionOpenAPI(almacen, cuerpo) {
  if (
    !cuerpo ||
    textoVacio(cuerpo.correo) ||
    textoVacio(cuerpo.contrasena)
  ) {
    return errorOpenAPI(
      400,
      "Correo y contraseña son obligatorios"
    );
  }

  const resultado = iniciarSesion(almacen, {
    correo: cuerpo.correo,
    password: cuerpo.contrasena,
  });

  if (resultado.estado !== 200) {
    return errorOpenAPI(
      resultado.estado,
      resultado.cuerpo.mensaje
    );
  }

  const usuario = almacen.usuarios.find(
    (u) => u.correo === cuerpo.correo
  );

  return {
    estado: 200,
    cuerpo: {
      estado: "ok",
      mensaje: "Inicio de sesión correcto",
      token: resultado.cuerpo.token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre || "Deportista PUKAY",
        correo: usuario.correo,
      },
    },
  };
}

function registrarActividadOpenAPI(
  almacen,
  usuarioId,
  cuerpo
) {
  if (!cuerpo || typeof cuerpo !== "object" ||
      Array.isArray(cuerpo)) {
    return errorOpenAPI(400, "Datos inválidos");
  }

  const deporteInterno = equivalenciasDeportes[cuerpo.deporte];

  if (!deporteInterno) {
    return errorOpenAPI(400, "Deporte no válido");
  }

  // El contrato exige una fecha real y no futura.
  if (
    typeof cuerpo.fecha !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(cuerpo.fecha)
  ) {
    return errorOpenAPI(400, "Fecha inválida");
  }

  const [anio, mes, dia] = cuerpo.fecha
    .split("-")
    .map(Number);

  const fecha = new Date(Date.UTC(anio, mes - 1, dia));

  if (
    fecha.getUTCFullYear() !== anio ||
    fecha.getUTCMonth() !== mes - 1 ||
    fecha.getUTCDate() !== dia ||
    fecha.getTime() > Date.now()
  ) {
    return errorOpenAPI(400, "Fecha inválida o futura");
  }

  if (
    !Number.isInteger(cuerpo.duracion) ||
    cuerpo.duracion < 1
  ) {
    return errorOpenAPI(
      400,
      "La duración debe ser mayor que cero"
    );
  }

  const distancia = cuerpo.distancia === undefined
    ? 0
    : cuerpo.distancia;

  if (
    typeof distancia !== "number" ||
    !Number.isFinite(distancia) ||
    distancia < 0
  ) {
    return errorOpenAPI(
      400,
      "La distancia no puede ser negativa"
    );
  }

  if (
    cuerpo.observacion !== undefined &&
    typeof cuerpo.observacion !== "string"
  ) {
    return errorOpenAPI(400, "Observación inválida");
  }

  // La función original conserva las reglas del prototipo.
  const resultado = registrarActividad(
    almacen,
    usuarioId,
    {
      deporte: deporteInterno,
      fecha: cuerpo.fecha,
      duracion: cuerpo.duracion,
      distancia,
      comentario: cuerpo.observacion ?? "",
    }
  );

  if (resultado.estado !== 201) {
    return errorOpenAPI(
      resultado.estado,
      resultado.cuerpo.mensaje
    );
  }

  return {
    estado: 201,
    cuerpo: {
      estado: "ok",
      mensaje: "Actividad registrada correctamente",
      id_actividad: resultado.cuerpo.id,
    },
  };
}

function listarActividadesOpenAPI(almacen, usuarioId) {
  const equivalenciasInversas = Object.fromEntries(
    Object.entries(equivalenciasDeportes).map(
      ([oficial, interno]) => [interno, oficial]
    )
  );

  const actividades = almacen.actividades
    .filter((a) => a.usuarioId === usuarioId)
    .sort((a, b) =>
      b.fecha.localeCompare(a.fecha) || b.id - a.id
    )
    .map((a) => ({
      id: a.id,
      deporte: equivalenciasInversas[a.deporte] || a.deporte,
      fecha: a.fecha,
      duracion: a.duracion,
      distancia: a.distancia ?? 0,
      observacion: a.comentario ?? "",
    }));

  return {
    estado: 200,
    cuerpo: {
      estado: "ok",
      mensaje: "Actividades obtenidas correctamente",
      actividades,
    },
  };
}

module.exports = {
  registrarUsuario,
  iniciarSesion,
  listarDeportes,
  registrarActividad,
  listarActividades,
  iniciarSesionOpenAPI,
  registrarActividadOpenAPI,
  listarActividadesOpenAPI,
};
