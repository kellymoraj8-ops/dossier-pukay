
"use strict";

// Almacén en memoria del esqueleto Node.js.
// En PUKAY, la persistencia real utiliza MySQL (ADR-001).

const DEPORTES = [
  "running",
  "caminata",
  "ciclismo",
  "fútbol",
  "gimnasio",
  "natación",
];

function crearAlmacen() {
  return {
    // Usuarios registrados.
    usuarios: [],

    // Relación entre tokens y usuarios.
    sesiones: new Map(),

    // Actividades deportivas registradas.
    actividades: [],

    // Catálogo de deportes.
    deportes: DEPORTES.map((nombre, i) => ({
      id: i + 1,
      nombre,
    })),

    siguienteUsuario: 1,
    siguienteActividad: 1,
  };
}

module.exports = {
  crearAlmacen,
};

