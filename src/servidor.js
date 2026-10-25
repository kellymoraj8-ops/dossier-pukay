
"use strict";

// Servidor HTTP del prototipo Node.js de PUKAY.
// Conserva las rutas originales de Cucumber
// y las rutas compatibles con OpenAPI.

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

// Verificar que el token exista y no haya expirado.
function usuarioDelToken(almacen, req) {
  const cabecera = req.headers.authorization || "";
  const [esquema, token] = cabecera.split(" ");

  if (esquema !== "Bearer" || !token) {
    return null;
  }

  const sesion = almacen.sesiones.get(token);

  if (!sesion) {
    return null;
  }

  // Eliminar las sesiones vencidas.
  if (Date.now() >= sesion.expiraEn) {
    almacen.sesiones.delete(token);
    return null;
  }

  return sesion.usuarioId;
}

// Crear el servidor HTTP de PUKAY.
function crearServidor(almacen = crearAlmacen()) {
  const servidor = http.createServer(async (req, res) => {
    // Enviar respuestas en formato JSON.
    const responder = ({ estado, cuerpo }) => {
      res.writeHead(estado, {
        "Content-Type": "application/json; charset=utf-8",
      });

      res.end(JSON.stringify(cuerpo));
    };

    const ruta = req.url.split("?")[0];
    const clave = `${req.method} ${ruta}`;

    // --------------------------------------------
    // RUTAS PÚBLICAS
    // --------------------------------------------

    const rutasPublicas = {
      "POST /api/auth/registro": (c) =>
        servicios.registrarUsuario(almacen, c),

      "POST /api/auth/login": (c) =>
        servicios.iniciarSesion(almacen, c),

      "POST /login.php": (c) =>
        servicios.iniciarSesionOpenAPI(almacen, c),
    };

    // --------------------------------------------
    // RUTAS PROTEGIDAS
    // --------------------------------------------

    const rutasProtegidas = {
      "GET /api/deportes": () =>
        servicios.listarDeportes(almacen),

      "POST /api/actividades": (c, uid) =>
        servicios.registrarActividad(almacen, uid, c),

      "GET /api/actividades": (_c, uid) =>
        servicios.listarActividades(almacen, uid),

      "POST /registrar_actividad.php": (c, uid) =>
        servicios.registrarActividadOpenAPI(almacen, uid, c),

      "GET /listar_actividades.php": (_c, uid) =>
        servicios.listarActividadesOpenAPI(almacen, uid),

      // Nueva ruta: actualizar actividad deportiva.
      "POST /actualizar_actividad.php": (c, uid) =>
        servicios.actualizarActividadOpenAPI(
          almacen,
          uid,
          c
        ),
    };

    // --------------------------------------------
    // IDENTIFICAR RUTAS DEL CONTRATO OPENAPI
    // --------------------------------------------

    const esRutaOpenAPI = [
      "/login.php",
      "/registrar_actividad.php",
      "/listar_actividades.php",
      "/actualizar_actividad.php",
      "/eliminar_actividad.php",
    ].includes(ruta);

    // Formato de errores según la interfaz.
    const responderError = (estado, mensaje) =>
      responder({
        estado,
        cuerpo: esRutaOpenAPI
          ? {
              estado: "error",
              mensaje,
            }
          : {
              mensaje,
            },
      });

    // --------------------------------------------
    // PROCESAR RUTAS PÚBLICAS
    // --------------------------------------------

    if (rutasPublicas[clave]) {
      const cuerpo = await leerJson(req);

      if (cuerpo === null) {
        return responderError(
          400,
          "JSON inválido"
        );
      }

      return responder(
        rutasPublicas[clave](cuerpo)
      );
    }

    // --------------------------------------------
    // PROCESAR RUTAS PROTEGIDAS
    // --------------------------------------------

    if (rutasProtegidas[clave]) {
      const usuarioId = usuarioDelToken(
        almacen,
        req
      );

      if (usuarioId === null) {
        return responderError(
          401,
          "Token ausente, inválido o vencido"
        );
      }

      const cuerpo = await leerJson(req);

      if (cuerpo === null) {
        return responderError(
          400,
          "JSON inválido"
        );
      }

      return responder(
        rutasProtegidas[clave](
          cuerpo,
          usuarioId
        )
      );
    }

    // --------------------------------------------
    // RUTA NO ENCONTRADA
    // --------------------------------------------

    return responderError(
      404,
      "Recurso inexistente"
    );
  });

  // Permite a Cucumber consultar el almacén.
  servidor.almacen = almacen;

  return servidor;
}

module.exports = {
  crearServidor,
};
