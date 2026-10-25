"use strict";
// Almacén en memoria del esqueleto. En PUKAY la persistencia real es MySQL (ADR-001).

const DEPORTES = ["running", "caminata", "ciclismo", "fútbol", "gimnasio"];

function crearAlmacen() {
  return {
    usuarios: [], // { id, correo, sal, hash }
    sesiones: new Map(), // token -> id de usuario
    actividades: [], // { id, usuarioId, deporte, fecha, duracion, distancia, comentario }
    deportes: DEPORTES.map((nombre, i) => ({ id: i + 1, nombre })),
    siguienteUsuario: 1,
    siguienteActividad: 1,
  };
}

module.exports = { crearAlmacen };
