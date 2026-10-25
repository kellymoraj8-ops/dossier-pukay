"use strict";
const { crearServidor } = require("./servidor");

const puerto = process.env.PUERTO || 3000;
crearServidor().listen(puerto, () => {
  console.log(`Esqueleto PUKAY escuchando en http://localhost:${puerto}`);
});
