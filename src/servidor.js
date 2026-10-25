
"use strict";

// Servidor HTTP de PUKAY.
// Conserva las rutas originales del prototipo Node.js
// y conecta las rutas del contrato OpenAPI de PHP.

const http = require("http");
const { crearAlmacen } = require("./almacen");
const servicios = require("./servicios");

// Leer el cuerpo JSON de una solicitud HTTP.
function leerJson(req) {
  return new Promise((resolve) => {
    let datos = "";

    req.on("data", (trozo) => {
      datos += trozo;
    });

    req.on("end", () => {
      try {
        resolve(datos ? JSON.parse(datos) : {});
      } catch {
        resolve(null);
      }
    });
  });
}

// Identificar al usuario mediante el token Bearer.
function usuarioDelToken(almacen, req) {
  const cabecera = req.headers.authorization || "";
  const [esquema, token] = cabecera.split(" ");

  if (esquema !== "Bearer" || !token) {
    return null;
  }

  return almacen.sesiones.get(token) ?? null;
}

// Crear servidor HTTP.
function crearServidor(almacen = crearAlmacen()) {
  const servidor = http.createServer(async (req, res) => {

    // Enviar una respuesta HTTP en formato JSON.
    const responder = ({ estado, cuerpo }) => {
      res.writeHead(estado, {
        "Content-Type": "application/json; charset=utf-8",
      });

      res.end(JSON.stringify(cuerpo));
    };

    // Obtener método HTTP y ruta solicitada.
    const ruta = req.url.split("?")[0];
    const clave = `${req.method} ${ruta}`;

    // ------------------------------------------------
    // RUTAS PÚBLICAS
    // ------------------------------------------------

    const rutasPublicas = {

      // Ruta original del prototipo Node.js.
      "POST /api/auth/registro": (c) =>
        servicios.registrarUsuario(almacen, c),

      // Ruta original del prototipo Node.js.
      "POST /api/auth/login": (c) =>
        servicios.iniciarSesion(almacen, c),

      // Ruta compatible con el contrato OpenAPI.
      "POST /login.php": (c) =>
        servicios.iniciarSesionOpenAPI(almacen, c),
    };

    // ------------------------------------------------
    // RUTAS PROTEGIDAS
    // ------------------------------------------------

    const rutasProtegidas = {

      // Consultar deportes: ruta original.
      "GET /api/deportes": () =>
        servicios.listarDeportes(almacen),

      // Registrar actividad: ruta original.
      "POST /api/actividades": (c, uid) =>
        servicios.registrarActividad(almacen, uid, c),

      // Consultar historial: ruta original.
      "GET /api/actividades": (_c, uid) =>
        servicios.listarActividades(almacen, uid),

      // Registrar actividad: ruta OpenAPI.
      "POST /registrar_actividad.php": (c, uid) =>
        servicios.registrarActividadOpenAPI(
          almacen,
          uid,
          c
        ),

      // Consultar historial: ruta OpenAPI.
      "GET /listar_actividades.php": (_c, uid) =>
        servicios.listarActividadesOpenAPI(
          almacen,
          uid
        ),
    };

    // ------------------------------------------------
    // PROCESAR RUTAS PÚBLICAS
    // ------------------------------------------------

    if (rutasPublicas[clave]) {
      const cuerpo = await leerJson(req);

      if (cuerpo === null) {
        return responder({
          estado: 400,
          cuerpo: {
            mensaje: "JSON inválido",
          },
        });
      }

      return responder(
        rutasPublicas[clave](cuerpo)
      );
    }

    // ------------------------------------------------
    // PROCESAR RUTAS PROTEGIDAS
    // ------------------------------------------------

    if (rutasProtegidas[clave]) {
      const usuarioId = usuarioDelToken(
        almacen,
        req
      );

      if (usuarioId === null) {
        return responder({
          estado: 401,
          cuerpo: {
            mensaje: "No autorizado",
          },
        });
      }

      const cuerpo = await leerJson(req);

      if (cuerpo === null) {
        return responder({
          estado: 400,
          cuerpo: {
            mensaje: "JSON inválido",
          },
        });
      }

      return responder(
        rutasProtegidas[clave](
          cuerpo,
          usuarioId
        )
      );
    }

    // ------------------------------------------------
    // RUTA NO ENCONTRADA
    // ------------------------------------------------

    return responder({
      estado: 404,
      cuerpo: {
        mensaje: "Recurso inexistente",
      },
    });
  });

  // Permite que Cucumber consulte el almacén
  // durante las pruebas automatizadas.
  servidor.almacen = almacen;

  return servidor;
}

module.exports = {
  crearServidor,
};
