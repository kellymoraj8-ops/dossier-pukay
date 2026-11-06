"use strict";

// Servidor HTTP del prototipo Node.js de PUKAY.
// Conserva las rutas originales de Cucumber
// y las cinco operaciones del contrato OpenAPI.

const http = require("http");
const { crearAlmacen } = require("./almacen");
const servicios = require("./servicios");

// Leer los datos JSON enviados al servidor.
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

// Comprobar autenticación y expiración del token.
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

  // Los tokens vencen después de 24 horas.
  if (Date.now() >= sesion.expiraEn) {
    almacen.sesiones.delete(token);
    return null;
  }

  return sesion.usuarioId;
}

// Crear servidor HTTP.
function crearServidor(almacen = crearAlmacen()) {
  const servidor = http.createServer(async (req, res) => {
    const responder = ({ estado, cuerpo }) => {
      res.writeHead(estado, {
        "Content-Type": "application/json; charset=utf-8",
      });

      res.end(JSON.stringify(cuerpo));
    };

    const ruta = req.url.split("?")[0];
    const clave = ${req.method} ${ruta};

    // --------------------------------------------
    // RUTA DE SALUD Y BIENVENIDA (RENDER)
    // --------------------------------------------
    
    // Ruta de salud para Render
    if (req.method === "GET" && ruta === "/salud") {
      return responder({ estado: 200, cuerpo: { estado: "ok", version: "0.2.0" } });
    }

    // Ruta raíz: Página de bienvenida visual
    if (req.method === "GET" && ruta === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>PUKAY - API REST</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f9; text-align: center; padding: 50px; }
                h1 { color: #2c3e50; }
                .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: inline-block; }
                .status { color: #27ae60; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>🏃‍♂️ PUKAY - Cadena CASE</h1>
                <p>Bienvenido al esqueleto ejecutable del proyecto.</p>
                <p>Estado del servidor: <span class="status">OPERATIVO ✅</span></p>
                <p><small>Versión 0.2.0 - Desplegado en Render</small></p>
                <p><a href="/salud">Ver estado en JSON</a> | <a href="/api/deportes">Ver deportes (API)</a></p>
            </div>
        </body>
        </html>
      `);
    }

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
        servicios.registrarActividadOpenAPI(
          almacen,
          uid,
          c
        ),

      "GET /listar_actividades.php": (_c, uid) =>
        servicios.listarActividadesOpenAPI(
          almacen,
          uid
        ),

      "POST /actualizar_actividad.php": (c, uid) =>
        servicios.actualizarActividadOpenAPI(
          almacen,
          uid,
          c
        ),

      // Última operación del contrato OpenAPI.
      "POST /eliminar_actividad.php": (c, uid) =>
        servicios.eliminarActividadOpenAPI(
          almacen,
          uid,
          c
        ),
    };

    // --------------------------------------------
    // IDENTIFICAR RUTAS OPENAPI
    // --------------------------------------------

    const rutasOpenAPI = [
      "/login.php",
      "/registrar_actividad.php",
      "/listar_actividades.php",
      "/actualizar_actividad.php",
      "/eliminar_actividad.php",
    ];

    const esRutaOpenAPI = rutasOpenAPI.includes(ruta);

    // Respuestas de error según el tipo de ruta.
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
    // VALIDAR MÉTODOS HTTP DE OPENAPI
    // --------------------------------------------

    if (esRutaOpenAPI) {
      const metodoPermitido =
        ruta === "/listar_actividades.php"
          ? "GET"
          : "POST";

      if (req.method !== metodoPermitido) {
        return responderError(
          405,
          "Método no permitido"
        );
      }
    }

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
    // RUTAS NO ENCONTRADAS
    // --------------------------------------------

    return responderError(
      404,
      "Recurso inexistente"
    );
  });

  // Permite consultar el almacén desde Cucumber.
  servidor.almacen = almacen;

  return servidor;
}

module.exports = {
  crearServidor,
};
