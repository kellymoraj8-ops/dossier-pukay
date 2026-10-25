
"use strict";

const {
  generarHash,
  verificarPassword,
  generarToken,
} = require("./seguridad");

// ========================================
// RESPUESTAS DE ERROR
// ========================================

const error = (estado, mensaje) => ({
  estado,
  cuerpo: {
    mensaje,
  },
});

const errorOpenAPI = (estado, mensaje) => ({
  estado,
  cuerpo: {
    estado: "error",
    mensaje,
  },
});

const textoVacio = (valor) =>
  typeof valor !== "string" || valor.trim() === "";

const aPublica = (actividad) => ({
  id: actividad.id,
  deporte: actividad.deporte,
  fecha: actividad.fecha,
  duracion: actividad.duracion,
  distancia: actividad.distancia,
  comentario: actividad.comentario,
});

// ========================================
// REGISTRAR USUARIO
// ========================================

function registrarUsuario(almacen, cuerpo) {
  if (
    !cuerpo ||
    textoVacio(cuerpo.correo) ||
    textoVacio(cuerpo.password)
  ) {
    return error(
      400,
      "Correo y contraseña son obligatorios"
    );
  }

  const existe = almacen.usuarios.some(
    (usuario) => usuario.correo === cuerpo.correo
  );

  if (existe) {
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

// ========================================
// INICIAR SESIÓN
// ========================================

function iniciarSesion(almacen, cuerpo) {
  if (
    !cuerpo ||
    textoVacio(cuerpo.correo) ||
    textoVacio(cuerpo.password)
  ) {
    return error(
      400,
      "Correo y contraseña son obligatorios"
    );
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

  // Token válido durante 24 horas.
  const expiraEn = Date.now() + 24 * 60 * 60 * 1000;

  almacen.sesiones.set(token, {
    usuarioId: usuario.id,
    expiraEn,
  });

  return {
    estado: 200,
    cuerpo: {
      token,
    },
  };
}

// ========================================
// LISTAR DEPORTES
// ========================================

function listarDeportes(almacen) {
  return {
    estado: 200,
    cuerpo: almacen.deportes,
  };
}

// ========================================
// REGISTRAR ACTIVIDAD ORIGINAL
// ========================================

function registrarActividad(almacen, usuarioId, cuerpo) {
  if (!cuerpo) {
    return error(400, "Datos inválidos");
  }

  const deportes = almacen.deportes.map(
    (deporte) => deporte.nombre
  );

  if (!deportes.includes(cuerpo.deporte)) {
    return error(400, "Deporte no válido");
  }

  if (
    textoVacio(cuerpo.fecha) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(cuerpo.fecha)
  ) {
    return error(
      400,
      "La fecha es obligatoria (AAAA-MM-DD)"
    );
  }

  if (
    !Number.isInteger(cuerpo.duracion) ||
    cuerpo.duracion < 1
  ) {
    return error(
      400,
      "La duración en minutos es obligatoria"
    );
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

// ========================================
// LISTAR ACTIVIDADES ORIGINAL
// ========================================

function listarActividades(almacen, usuarioId) {
  const actividades = almacen.actividades
    .filter(
      (actividad) => actividad.usuarioId === usuarioId
    )
    .map(aPublica);

  return {
    estado: 200,
    cuerpo: actividades,
  };
}

// ========================================
// EQUIVALENCIAS DE DEPORTES OPENAPI
// ========================================

const equivalenciasDeportes = {
  Running: "running",
  Caminata: "caminata",
  Ciclismo: "ciclismo",
  "Fútbol": "fútbol",
  Gimnasio: "gimnasio",
  "Natación": "natación",
};

// ========================================
// VALIDACIÓN DE ACTIVIDADES OPENAPI
// ========================================

function validarActividadOpenAPI(cuerpo) {
  if (
    !cuerpo ||
    typeof cuerpo !== "object" ||
    Array.isArray(cuerpo)
  ) {
    return {
      error: "Datos inválidos",
    };
  }

  const deporteInterno =
    equivalenciasDeportes[cuerpo.deporte];

  if (!deporteInterno) {
    return {
      error: "Deporte no válido",
    };
  }

  if (
    typeof cuerpo.fecha !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(cuerpo.fecha)
  ) {
    return {
      error: "Fecha inválida",
    };
  }

  const [anio, mes, dia] = cuerpo.fecha
    .split("-")
    .map(Number);

  const fecha = new Date(
    Date.UTC(anio, mes - 1, dia)
  );

  if (
    fecha.getUTCFullYear() !== anio ||
    fecha.getUTCMonth() !== mes - 1 ||
    fecha.getUTCDate() !== dia ||
    fecha.getTime() > Date.now()
  ) {
    return {
      error: "Fecha inválida o futura",
    };
  }

  if (
    !Number.isInteger(cuerpo.duracion) ||
    cuerpo.duracion < 1
  ) {
    return {
      error: "La duración debe ser mayor que cero",
    };
  }

  const distancia =
    cuerpo.distancia === undefined
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
    return {
      error: "Observación inválida",
    };
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

// ========================================
// LOGIN OPENAPI
// ========================================

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
        nombre:
          usuario.nombre || "Deportista PUKAY",
        correo: usuario.correo,
      },
    },
  };
}

// ========================================
// REGISTRAR ACTIVIDAD OPENAPI
// ========================================

function registrarActividadOpenAPI(
  almacen,
  usuarioId,
  cuerpo
) {
  const validacion =
    validarActividadOpenAPI(cuerpo);

  if (validacion.error) {
    return errorOpenAPI(
      400,
      validacion.error
    );
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
      mensaje:
        "Actividad registrada correctamente",
      id_actividad: resultado.cuerpo.id,
    },
  };
}

// ========================================
// LISTAR ACTIVIDADES OPENAPI
// ========================================

function listarActividadesOpenAPI(
  almacen,
  usuarioId
) {
  const equivalenciasInversas =
    Object.fromEntries(
      Object.entries(
        equivalenciasDeportes
      ).map(([oficial, interno]) => [
        interno,
        oficial,
      ])
    );

  const actividades = almacen.actividades
    .filter(
      (actividad) =>
        actividad.usuarioId === usuarioId
    )
    .sort(
      (a, b) =>
        b.fecha.localeCompare(a.fecha) ||
        b.id - a.id
    )
    .map((actividad) => ({
      id: actividad.id,
      deporte:
        equivalenciasInversas[
          actividad.deporte
        ] || actividad.deporte,
      fecha: actividad.fecha,
      duracion: actividad.duracion,
      distancia:
        actividad.distancia ?? 0,
      observacion:
        actividad.comentario ?? "",
    }));

  return {
    estado: 200,
    cuerpo: {
      estado: "ok",
      mensaje:
        "Actividades obtenidas correctamente",
      actividades,
    },
  };
}

// ========================================
// ACTUALIZAR ACTIVIDAD OPENAPI
// ========================================

function actualizarActividadOpenAPI(
  almacen,
  usuarioId,
  cuerpo
) {
  if (
    !cuerpo ||
    !Number.isInteger(
      cuerpo.id_actividad
    ) ||
    cuerpo.id_actividad < 1
  ) {
    return errorOpenAPI(
      400,
      "Identificador de actividad inválido"
    );
  }

  // Solo se puede actualizar una actividad propia.
  const actividad =
    almacen.actividades.find(
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

  const validacion =
    validarActividadOpenAPI(cuerpo);

  if (validacion.error) {
    return errorOpenAPI(
      400,
      validacion.error
    );
  }

  actividad.deporte =
    validacion.datos.deporte;

  actividad.fecha =
    validacion.datos.fecha;

  actividad.duracion =
    validacion.datos.duracion;

  actividad.distancia =
    validacion.datos.distancia;

  actividad.comentario =
    validacion.datos.comentario;

  return {
    estado: 200,
    cuerpo: {
      estado: "ok",
      mensaje:
        "Actividad actualizada correctamente",
    },
  };
}

// ========================================
// ELIMINAR ACTIVIDAD OPENAPI
// ========================================

function eliminarActividadOpenAPI(
  almacen,
  usuarioId,
  cuerpo
) {
  if (
    !cuerpo ||
    !Number.isInteger(
      cuerpo.id_actividad
    ) ||
    cuerpo.id_actividad < 1
  ) {
    return errorOpenAPI(
      400,
      "Identificador de actividad inválido"
    );
  }

  // Buscar solo una actividad del usuario autenticado.
  const indice =
    almacen.actividades.findIndex(
      (actividad) =>
        actividad.id ===
          cuerpo.id_actividad &&
        actividad.usuarioId ===
          usuarioId
    );

  if (indice === -1) {
    return errorOpenAPI(
      404,
      "Actividad no encontrada"
    );
  }

  // Eliminar la actividad del almacén.
  almacen.actividades.splice(
    indice,
    1
  );

  return {
    estado: 200,
    cuerpo: {
      estado: "ok",
      mensaje:
        "Actividad eliminada correctamente",
    },
  };
}

// ========================================
// EXPORTAR TODAS LAS FUNCIONES
// ========================================

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
