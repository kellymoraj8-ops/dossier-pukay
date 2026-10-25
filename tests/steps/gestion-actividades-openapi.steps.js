
"use strict";

const assert = require("node:assert/strict");

const {
  Given,
  When,
  Then,
} = require("@cucumber/cucumber");

const { crearAlmacen } = require("../../src/almacen");
const servicios = require("../../src/servicios");

const DATOS_ORIGINALES = {
  deporte: "Running",
  fecha: "2026-01-15",
  duracion: 30,
  distancia: 5,
  observacion: "Entrenamiento inicial",
};

const DATOS_ACTUALIZADOS = {
  deporte: "Ciclismo",
  fecha: "2026-01-16",
  duracion: 60,
  distancia: 15,
  observacion: "Entrenamiento actualizado",
};

Given(
  "que existe una actividad de Ana registrada mediante OpenAPI",
  function () {
    this.almacenOpenAPI = crearAlmacen();

    this.usuarioAnaOpenAPI = 1;
    this.usuarioLuisOpenAPI = 2;

    const resultado = servicios.registrarActividadOpenAPI(
      this.almacenOpenAPI,
      this.usuarioAnaOpenAPI,
      DATOS_ORIGINALES
    );

    assert.equal(resultado.estado, 201);

    this.idActividadOpenAPI =
      resultado.cuerpo.id_actividad;

    this.resultadoOpenAPI = resultado;
  }
);

When(
  "Ana actualiza su actividad mediante OpenAPI",
  function () {
    this.resultadoOpenAPI =
      servicios.actualizarActividadOpenAPI(
        this.almacenOpenAPI,
        this.usuarioAnaOpenAPI,
        {
          id_actividad: this.idActividadOpenAPI,
          ...DATOS_ACTUALIZADOS,
        }
      );
  }
);

When(
  "Luis intenta actualizar la actividad de Ana mediante OpenAPI",
  function () {
    this.resultadoOpenAPI =
      servicios.actualizarActividadOpenAPI(
        this.almacenOpenAPI,
        this.usuarioLuisOpenAPI,
        {
          id_actividad: this.idActividadOpenAPI,
          ...DATOS_ACTUALIZADOS,
        }
      );
  }
);

When(
  "Ana elimina su actividad mediante OpenAPI",
  function () {
    this.resultadoOpenAPI =
      servicios.eliminarActividadOpenAPI(
        this.almacenOpenAPI,
        this.usuarioAnaOpenAPI,
        {
          id_actividad: this.idActividadOpenAPI,
        }
      );
  }
);

When(
  "Luis intenta eliminar la actividad de Ana mediante OpenAPI",
  function () {
    this.resultadoOpenAPI =
      servicios.eliminarActividadOpenAPI(
        this.almacenOpenAPI,
        this.usuarioLuisOpenAPI,
        {
          id_actividad: this.idActividadOpenAPI,
        }
      );
  }
);



Then(
  "la actividad de Ana aparece actualizada en OpenAPI",
  function () {
    const resultado =
      servicios.listarActividadesOpenAPI(
        this.almacenOpenAPI,
        this.usuarioAnaOpenAPI
      );

    assert.equal(resultado.estado, 200);

    const actividad = resultado.cuerpo.actividades.find(
      (a) => a.id === this.idActividadOpenAPI
    );

    assert.ok(
      actividad,
      "La actividad actualizada debe existir"
    );

    assert.equal(actividad.deporte, "Ciclismo");
    assert.equal(actividad.duracion, 60);
    assert.equal(actividad.distancia, 15);

    assert.equal(
      actividad.observacion,
      "Entrenamiento actualizado"
    );
  }
);
Then(
  "la respuesta OpenAPI tiene el código {int}",
  function (codigoEsperado) {
    assert.equal(
      this.resultadoOpenAPI.estado,
      codigoEsperado
    );
  }
);
Then(
  "la actividad eliminada no aparece en el historial OpenAPI",
  function () {
    const resultado =
      servicios.listarActividadesOpenAPI(
        this.almacenOpenAPI,
        this.usuarioAnaOpenAPI
      );

    assert.equal(resultado.estado, 200);

    const actividad = resultado.cuerpo.actividades.find(
      (a) => a.id === this.idActividadOpenAPI
    );

    assert.equal(
      actividad,
      undefined,
      "La actividad eliminada no debe aparecer"
    );
  }
);
