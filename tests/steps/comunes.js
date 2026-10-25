
"use strict";

const { Before, After, Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { crearServidor } = require("../../src/servidor");

Before(async function () {
  this.servidor = crearServidor();

  await new Promise((ok) => this.servidor.listen(0, ok));

  this.base = `http://localhost:${this.servidor.address().port}`;
  this.tokens = {};
  this.respuesta = null;
});

After(async function () {
  await new Promise((ok) => this.servidor.close(ok));
});

async function llamar(mundo, metodo, ruta, cuerpo, token) {
  const cabeceras = {
    "Content-Type": "application/json",
  };

  if (token) {
    cabeceras.Authorization = `Bearer ${token}`;
  }

  const r = await fetch(`${mundo.base}${ruta}`, {
    method: metodo,
    headers: cabeceras,
    body: cuerpo === undefined
      ? undefined
      : JSON.stringify(cuerpo),
  });

  mundo.respuesta = {
    estado: r.status,
    cuerpo: await r.json(),
  };

  return mundo.respuesta;
}

async function registrar(mundo, correo, password) {
  return llamar(
    mundo,
    "POST",
    "/api/auth/registro",
    { correo, password }
  );
}

async function iniciarSesion(
  mundo,
  correo,
  password = "ClaveDePrueba"
) {
  await registrar(mundo, correo, password);

  const r = await llamar(
    mundo,
    "POST",
    "/api/auth/login",
    { correo, password }
  );

  mundo.tokens[correo] = r.cuerpo.token;
}

// ----------------------------------------------------
// REGISTRO DE USUARIOS
// ----------------------------------------------------

Given(
  "que el correo {string} no está registrado",
  function (correo) {
    assert.ok(
      !this.servidor.almacen.usuarios.some(
        (u) => u.correo === correo
      )
    );
  }
);

Given(
  "que el correo {string} ya está registrado",
  async function (correo) {
    await registrar(this, correo, "ClaveDePrueba");
  }
);

Given(
  "que el correo {string} ya está registrado con la contraseña {string}",
  async function (correo, password) {
    await registrar(this, correo, password);
  }
);

Given(
  "que {string} inició sesión",
  async function (correo) {
    await iniciarSesion(this, correo);
  }
);

// ----------------------------------------------------
// INICIO DE SESIÓN
// ----------------------------------------------------

When(
  "se solicita el registro con correo {string} y contraseña {string}",
  async function (correo, password) {
    await registrar(this, correo, password);
  }
);

When(
  "se solicita el inicio de sesión con correo {string} y contraseña {string}",
  async function (correo, password) {
    await llamar(
      this,
      "POST",
      "/api/auth/login",
      { correo, password }
    );
  }
);

When(
  "se inspeccionan los usuarios almacenados",
  function () {
    this.usuarios = this.servidor.almacen.usuarios;
  }
);

// ----------------------------------------------------
// CONSULTA DE DEPORTES
// ----------------------------------------------------

When(
  "se consultan los deportes",
  async function () {
    await llamar(
      this,
      "GET",
      "/api/deportes",
      undefined,
      Object.values(this.tokens)[0]
    );
  }
);

When(
  "se consultan los deportes sin token",
  async function () {
    await llamar(
      this,
      "GET",
      "/api/deportes"
    );
  }
);

// ----------------------------------------------------
// CONSULTA DE HISTORIAL SIN TOKEN
// ----------------------------------------------------

When(
  "se consulta el historial sin token",
  async function () {
    await llamar(
      this,
      "GET",
      "/api/actividades"
    );
  }
);

// ----------------------------------------------------
// REGISTRO DE ACTIVIDADES
// ----------------------------------------------------

When(
  "registra una actividad de {string} el {string} de {int} minutos y {int} km",
  async function (deporte, fecha, duracion, distancia) {
    await llamar(
      this,
      "POST",
      "/api/actividades",
      {
        deporte,
        fecha,
        duracion,
        distancia,
      },
      Object.values(this.tokens)[0]
    );
  }
);

When(
  "registra una actividad de {string} el {string} sin duración",
  async function (deporte, fecha) {
    await llamar(
      this,
      "POST",
      "/api/actividades",
      {
        deporte,
        fecha,
      },
      Object.values(this.tokens)[0]
    );
  }
);

// Permite comprobar valores negativos.
When(
  "registra una actividad de {string} el {string} con duración {int} minutos y distancia {int} km",
  async function (deporte, fecha, duracion, distancia) {
    await llamar(
      this,
      "POST",
      "/api/actividades",
      {
        deporte,
        fecha,
        duracion,
        distancia,
      },
      Object.values(this.tokens)[0]
    );
  }
);

// ----------------------------------------------------
// PREPARACIÓN DE ACTIVIDADES PARA EL HISTORIAL
// ----------------------------------------------------

Given(
  "que {string} inició sesión y registró {int} actividades",
  async function (correo, n) {
    await iniciarSesion(this, correo);

    for (let i = 0; i < n; i++) {
      await llamar(
        this,
        "POST",
        "/api/actividades",
        {
          deporte: "running",
          fecha: "2026-10-05",
          duracion: 30 + i,
        },
        this.tokens[correo]
      );
    }
  }
);

Given(
  "que {string} inició sesión y registró {int} actividad",
  async function (correo, n) {
    await iniciarSesion(this, correo);

    for (let i = 0; i < n; i++) {
      await llamar(
        this,
        "POST",
        "/api/actividades",
        {
          deporte: "caminata",
          fecha: "2026-10-06",
          duracion: 20,
        },
        this.tokens[correo]
      );
    }
  }
);

When(
  "{string} consulta su historial",
  async function (correo) {
    await llamar(
      this,
      "GET",
      "/api/actividades",
      undefined,
      this.tokens[correo]
    );
  }
);

// ----------------------------------------------------
// VALIDACIÓN DE RESPUESTAS HTTP
// ----------------------------------------------------

Then(
  "el servicio responde con el código {int}",
  function (codigo) {
    assert.strictEqual(this.respuesta.estado, codigo);
  }
);

Then(
  "la respuesta contiene el correo {string}",
  function (correo) {
    assert.strictEqual(
      this.respuesta.cuerpo.correo,
      correo
    );
  }
);

Then(
  "la respuesta no contiene la contraseña",
  function () {
    const texto = JSON.stringify(this.respuesta.cuerpo);

    assert.ok(
      !/password|hash|sal/i.test(texto),
      `La respuesta expone datos de contraseña: ${texto}`
    );
  }
);

Then(
  "la respuesta incluye un token",
  function () {
    assert.ok(
      typeof this.respuesta.cuerpo.token === "string" &&
      this.respuesta.cuerpo.token.length > 0
    );
  }
);

Then(
  "la respuesta no incluye un token",
  function () {
    assert.strictEqual(
      this.respuesta.cuerpo.token,
      undefined
    );
  }
);

// ----------------------------------------------------
// VALIDACIÓN DE SEGURIDAD DE CONTRASEÑAS
// ----------------------------------------------------

Then(
  "0 usuarios tienen la contraseña en texto plano",
  function () {
    const enTextoPlano = this.usuarios.filter(
      (u) =>
        Object.values(u).includes("ClaveDePrueba")
    );

    assert.strictEqual(enTextoPlano.length, 0);
  }
);

Then(
  "el 100 % de los usuarios tiene hash y sal",
  function () {
    assert.ok(this.usuarios.length > 0);

    assert.ok(
      this.usuarios.every(
        (u) => u.hash && u.sal
      )
    );
  }
);

// ----------------------------------------------------
// VALIDACIÓN DEL CATÁLOGO DE DEPORTES
// ----------------------------------------------------

Then(
  "el catálogo contiene {string}",
  function (lista) {
    const esperados = lista
      .split(",")
      .map((s) => s.trim());

    const nombres = this.respuesta.cuerpo.map(
      (d) => d.nombre
    );

    assert.deepStrictEqual(nombres, esperados);
  }
);

// ----------------------------------------------------
// VALIDACIÓN DEL HISTORIAL POR DEPORTE
// ----------------------------------------------------

Then(
  "el historial de {string} contiene {int} actividad(es) de {string}",
  async function (correo, n, deporte) {
    const r = await llamar(
      this,
      "GET",
      "/api/actividades",
      undefined,
      this.tokens[correo]
    );

    const de = r.cuerpo.filter(
      (a) => a.deporte === deporte
    );

    assert.strictEqual(de.length, n);
  }
);

Then(
  "el historial de {string} contiene {int} actividad(es)",
  async function (correo, n) {
    const r = await llamar(
      this,
      "GET",
      "/api/actividades",
      undefined,
      this.tokens[correo]
    );

    assert.strictEqual(r.cuerpo.length, n);
  }
);

Then(
  "el historial tiene {int} actividades",
  function (n) {
    assert.strictEqual(
      this.respuesta.cuerpo.length,
      n
    );
  }
);

// ----------------------------------------------------
// VALIDACIÓN DE AISLAMIENTO ENTRE USUARIOS
// ----------------------------------------------------

Then(
  "{int} actividades pertenecen a otro usuario",
  function (n) {
    // Obtener la sesión de Ana.
    const sesionAna = this.servidor.almacen.sesiones.get(
      this.tokens["ana@ejemplo.com"]
    );

    // Comprobar que la sesión exista.
    assert.ok(
      sesionAna,
      "No se encontró la sesión de Ana"
    );

    // Obtener el identificador de Ana.
    const usuarioIdAna = sesionAna.usuarioId;

    // Identificar actividades de otros usuarios.
    const ajenas = this.servidor.almacen.actividades.filter(
      (a) => a.usuarioId !== usuarioIdAna
    );

    // Identificadores de las actividades ajenas.
    const idsAjenos = new Set(
      ajenas.map((a) => a.id)
    );

    // Comprobar si aparecen en el historial de Ana.
    const filtradas = this.respuesta.cuerpo.filter(
      (a) => idsAjenos.has(a.id)
    );

    assert.strictEqual(filtradas.length, n);
  }
);
