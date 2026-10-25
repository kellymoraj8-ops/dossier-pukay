
"use strict";

// Servicios del prototipo Node.js de PUKAY.
// Conserva las funciones originales para Cucumber
// y agrega adaptadores compatibles con OpenAPI.

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

// ----------------------------------------------------
// REGISTRO DE USUARIOS
// ----------------------------------------------------

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

// ----------------------------------------------------
// INICIO DE SESIÓN
// ----------------------------------------------------

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

  // Vigencia del token: 24 horas.
  const expiraEn = Date.now() + 24 * 60 * 60 * 1000;

  almacen.sesiones.set(token, {
    usuarioId: usuario.id,
    expiraEn,
  });

  return {
    estado: 200,
    cuerpo: { token },
  };
}

// ----------------------------------------------------
// CATÁLOGO DE DEPORTES
// ----------------------------------------------------

function listarDeportes(almacen) {
  return {
    estado: 200,
    cuerpo: almacen.deportes,
  };
}

// ----------------------------------------------------
// REGISTRO ORIGINAL DE ACTIVIDADES
// ----------------------------------------------------

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

// ----------------------------------------------------
// HISTORIAL ORIGINAL DE ACTIVIDADES
// ----------------------------------------------------

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
// ADAPTADORES OPENAPI
// ----------------------------------------------------

const equivalenciasDeportes = {
  Running: "running",
  Caminata: "caminata",
  Ciclismo: "ciclismo",
  "Fútbol": "fútbol",
  Gimnasio: "gimnasio",
  "Natación": "natación",
};

// Validaciones compartidas entre registro y actualización.
function validarActividadOpenAPI(cuerpo) {
  if (
    !cuerpo ||
    typeof cuerpo !== "object" ||
    Array.isArray(cuerpo)
  ) {
    return { error: "Datos inválidos" };
  }

  const deporteInterno = equivalenciasDeportes[cuerpo.deporte];

  if (!deporteInterno) {
    return { error: "Deporte no válido" };
  }

  if (
    typeof cuerpo.fecha !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(cuerpo.fecha)
  ) {
    return { error: "Fecha inválida" };
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
    return { error: "Fecha inválida o futura" };
  }

  if (
    !Number.isInteger(cuerpo.duracion) ||
    cuerpo.duracion < 1
  ) {
    return {
      error: "La duración debe ser mayor que cero",
    };
  }

  const distancia = cuerpo.distancia === undefined
    ? 0
    : cuerpo.distancia;

  if (
    typeof distancia !== "number" ||
    !Number.isFinite(distancia) ||
    distancia < 0
  ) {
    return {
      error: "La distancia no puede ser negativa",
    };
  }

  if (
    cuerpo.observacion !== undefined &&
    typeof cuerpo.observacion !== "string"
  ) {
    return { error: "Observación inválida" };
  }

  return {
    datos: {
      deporte: deporteInterno,
      fecha: cuerpo.fecha,
      duracion: cuerpo.duracion,
      distancia,
      comentario: cuerpo.observacion ?? "",
    },
  };
}

// ----------------------------------------------------
// LOGIN OPENAPI
// ----------------------------------------------------

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

// ----------------------------------------------------
// REGISTRAR ACTIVIDAD OPENAPI
// ----------------------------------------------------

function registrarActividadOpenAPI(
  almacen,
  usuarioId,
  cuerpo
) {
  const validacion = validarActividadOpenAPI(cuerpo);

  if (validacion.error) {
    return errorOpenAPI(400, validacion.error);
  }

  const resultado = registrarActividad(
    almacen,
    usuarioId,
    validacion.datos
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

// ----------------------------------------------------
// LISTAR ACTIVIDADES OPENAPI
// ----------------------------------------------------

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

// ----------------------------------------------------
// ACTUALIZAR ACTIVIDAD OPENAPI
// ----------------------------------------------------

function actualizarActividadOpenAPI(
  almacen,
  usuarioId,
  cuerpo
) {
  if (
    !cuerpo ||
    !Number.isInteger(cuerpo.id_actividad) ||
    cuerpo.id_actividad < 1
  ) {
    return errorOpenAPI(
      400,
      "Identificador de actividad inválido"
    );
  }

  // Solo buscar actividades del usuario autenticado.
  const actividad = almacen.actividades.find(
    (a) =>
      a.id === cuerpo.id_actividad &&
      a.usuarioId === usuarioId
  );

  if (!actividad) {
    return errorOpenAPI(
      404,
      "Actividad no encontrada"
    );
  }

  const validacion = validarActividadOpenAPI(cuerpo);

  if (validacion.error) {
    return errorOpenAPI(400, validacion.error);
  }

  actividad.deporte = validacion.datos.deporte;
  actividad.fecha = validacion.datos.fecha;
  actividad.duracion = validacion.datos.duracion;
  actividad.distancia = validacion.datos.distancia;
  actividad.comentario = validacion.datos.comentario;

  return {
    estado: 200,
    cuerpo: {
      estado: "ok",
      mensaje: "Actividad actualizada correctamente",
    },
  };
}

// ----------------------------------------------------
// ELIMINAR ACTIVIDAD OPENAPI
// ----------------------------------------------------

function eliminarActividadOpenAPI(
  almacen,
  usuarioId,
  cuerpo
) {
  // El identificador debe ser un entero positivo.
  if (
    !cuerpo ||
    !Number.isInteger(cuerpo.id_actividad) ||
    cuerpo.id_actividad < 1
  ) {
    return errorOpenAPI(
      400,
      "Identificador de actividad inválido"
    );
  }

  // Buscar una actividad que pertenezca al usuario.
  const indice = almacen.actividades.findIndex(
    (a) =>
      a.id === cuerpo.id_actividad &&
      a.usuarioId === usuarioId
  );

  if (indice === -1) {
    return errorOpenAPI(
      404,
      "Actividad no encontrada"
    );
  }

  // Eliminar la actividad.
  almacen.actividades.splice(indice, 1);

  return {
    estado: 200,
    cuerpo: {
      estado: "ok",
      mensaje: "Actividad eliminada correctamente",
    },
  };
}

// ----------------------------------------------------
// EXPORTACIONES
// ----------------------------------------------------

module.exports = {
  registrarUsuario,
  iniciarSesion,
  listarDeportes,
  registrarActividad,
  listarActividades,
  iniciarSesionOpenAPI,
  registrarActividadOpenAPI,
  listarActividadesOpenAPI,
  actualizarActividadOpenAPI,
  eliminarActividadOpenAPI,
};
