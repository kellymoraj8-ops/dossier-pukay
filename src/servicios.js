"use strict";
// Lógica de los endpoints del contrato api/openapi.yaml.
// Cada función devuelve { estado, cuerpo } con los códigos que declara el contrato.
const { generarHash, verificarPassword, generarToken } = require("./seguridad");

const error = (estado, mensaje) => ({ estado, cuerpo: { mensaje } });
const aPublica = (a) => ({
  id: a.id,
  deporte: a.deporte,
  fecha: a.fecha,
  duracion: a.duracion,
  distancia: a.distancia,
  comentario: a.comentario,
});
const textoVacio = (v) => typeof v !== "string" || v.trim() === "";

function registrarUsuario(almacen, cuerpo) {
  if (textoVacio(cuerpo.correo) || textoVacio(cuerpo.password)) {
    return error(400, "Correo y contraseña son obligatorios");
  }
  if (almacen.usuarios.some((u) => u.correo === cuerpo.correo)) {
    return error(409, "El correo ya está registrado");
  }
  const { sal, hash } = generarHash(cuerpo.password);
  const usuario = { id: almacen.siguienteUsuario++, correo: cuerpo.correo, sal, hash };
  almacen.usuarios.push(usuario);
  return { estado: 201, cuerpo: { id: usuario.id, correo: usuario.correo } };
}

function iniciarSesion(almacen, cuerpo) {
  if (textoVacio(cuerpo.correo) || textoVacio(cuerpo.password)) {
    return error(400, "Correo y contraseña son obligatorios");
  }
  const usuario = almacen.usuarios.find((u) => u.correo === cuerpo.correo);
  if (!usuario || !verificarPassword(cuerpo.password, usuario.sal, usuario.hash)) {
    return error(401, "Credenciales no válidas");
  }
  const token = generarToken();
  almacen.sesiones.set(token, usuario.id);
  return { estado: 200, cuerpo: { token } };
}

function listarDeportes(almacen) {
  return { estado: 200, cuerpo: almacen.deportes };
}

function registrarActividad(almacen, usuarioId, cuerpo) {
  const deportes = almacen.deportes.map((d) => d.nombre);
  if (!deportes.includes(cuerpo.deporte)) {
    return error(400, "Deporte no válido");
  }
  if (textoVacio(cuerpo.fecha) || !/^\d{4}-\d{2}-\d{2}$/.test(cuerpo.fecha)) {
    return error(400, "La fecha es obligatoria (AAAA-MM-DD)");
  }
  if (!Number.isInteger(cuerpo.duracion) || cuerpo.duracion < 1) {
    return error(400, "La duración en minutos es obligatoria");
  }
  if (cuerpo.distancia !== undefined && (typeof cuerpo.distancia !== "number" || cuerpo.distancia < 0)) {
    return error(400, "La distancia debe ser un número mayor o igual a 0");
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
  return { estado: 201, cuerpo: aPublica(actividad) };
}

function listarActividades(almacen, usuarioId) {
  const propias = almacen.actividades
    .filter((a) => a.usuarioId === usuarioId)
    .map(aPublica);
  return { estado: 200, cuerpo: propias };
}

module.exports = {
  registrarUsuario,
  iniciarSesion,
  listarDeportes,
  registrarActividad,
  listarActividades,
};
