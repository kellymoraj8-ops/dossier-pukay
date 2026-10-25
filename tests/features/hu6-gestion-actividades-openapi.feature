
# language: es

@HU6 @OpenAPI
Característica: Actualizar y eliminar actividades deportivas
  Como deportista autenticado de PUKAY
  Quiero actualizar y eliminar mis actividades deportivas
  Para mantener mi historial de entrenamientos correcto

  @CP13
  Escenario: Actualizar correctamente una actividad propia
    Dado que existe una actividad de Ana registrada mediante OpenAPI
    Cuando Ana actualiza su actividad mediante OpenAPI
    Entonces la respuesta OpenAPI tiene el código 200
    Y la actividad de Ana aparece actualizada en OpenAPI

  @CP14
  Escenario: Rechazar actualización de una actividad ajena
    Dado que existe una actividad de Ana registrada mediante OpenAPI
    Cuando Luis intenta actualizar la actividad de Ana mediante OpenAPI
    Entonces la respuesta OpenAPI tiene el código 404

  @CP15
  Escenario: Eliminar correctamente una actividad propia
    Dado que existe una actividad de Ana registrada mediante OpenAPI
    Cuando Ana elimina su actividad mediante OpenAPI
    Entonces la respuesta OpenAPI tiene el código 200
    Y la actividad eliminada no aparece en el historial OpenAPI

  @CP16
  Escenario: Rechazar eliminación de una actividad ajena
    Dado que existe una actividad de Ana registrada mediante OpenAPI
    Cuando Luis intenta eliminar la actividad de Ana mediante OpenAPI
    Entonces la respuesta OpenAPI tiene el código 404
