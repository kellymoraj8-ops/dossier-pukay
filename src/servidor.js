"use strict";
// Servidor HTTP mínimo (sin dependencias) que expone las rutas del contrato.
const http = require("http");
const { crearAlmacen } = require("./almacen");
const servicios = require("./servicios");

function leerJson(req) {
  return new Promise((resolve) => {
    let datos = "";
    req.on("data", (trozo) => (datos += trozo));
    req.on("end", () => {
      try {
        resolve(datos ? JSON.parse(datos) : {});
      } catch {
        resolve(null);
      }
    });
  });
}

function usuarioDelToken(almacen, req) {
  const cabecera = req.headers.authorization || "";
  const [esquema, token] = cabecera.split(" ");
  if (esquema !== "Bearer" || !token) return null;
  return almacen.sesiones.get(token) ?? null;
}

function crearServidor(almacen = crearAlmacen()) {
  const servidor = http.createServer(async (req, res) => {
    const responder = ({ estado, cuerpo }) => {
      res.writeHead(estado, { "Content-Type": "application/json" });
      res.end(JSON.stringify(cuerpo));
    };
    const ruta = req.url.split("?")[0];
    const clave = `${req.method} ${ruta}`;

    const rutasPublicas = {
      "POST /api/auth/registro": (c) => servicios.registrarUsuario(almacen, c),
      "POST /api/auth/login": (c) => servicios.iniciarSesion(almacen, c),
    };
    const rutasProtegidas = {
      "GET /api/deportes": () => servicios.listarDeportes(almacen),
      "POST /api/actividades": (c, uid) => servicios.registrarActividad(almacen, uid, c),
      "GET /api/actividades": (_c, uid) => servicios.listarActividades(almacen, uid),
    };

    if (rutasPublicas[clave]) {
      const cuerpo = await leerJson(req);
      if (cuerpo === null) return responder({ estado: 400, cuerpo: { mensaje: "JSON inválido" } });
      return responder(rutasPublicas[clave](cuerpo));
    }
    if (rutasProtegidas[clave]) {
      const usuarioId = usuarioDelToken(almacen, req);
      if (usuarioId === null) return responder({ estado: 401, cuerpo: { mensaje: "No autorizado" } });
      const cuerpo = await leerJson(req);
      if (cuerpo === null) return responder({ estado: 400, cuerpo: { mensaje: "JSON inválido" } });
      return responder(rutasProtegidas[clave](cuerpo, usuarioId));
    }
    return responder({ estado: 404, cuerpo: { mensaje: "Recurso inexistente" } });
  });
  servidor.almacen = almacen;
  return servidor;
}

module.exports = { crearServidor };
