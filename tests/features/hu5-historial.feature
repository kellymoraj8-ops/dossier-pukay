# language: es
@HU5 @E2
Característica: Consultar mi historial de actividades
  Como deportista aficionado
  Quiero consultar mi historial
  Para ver solo mis propias actividades

  @CA11 @CP12
  Escenario: Cada usuario ve solo sus actividades
    Dado que "ana@ejemplo.com" inició sesión y registró 2 actividades
    Y que "luis@ejemplo.com" inició sesión y registró 1 actividad
    Cuando "ana@ejemplo.com" consulta su historial
    Entonces el servicio responde con el código 200
    Y el historial tiene 2 actividades
    Y 0 actividades pertenecen a otro usuario

  @CA12 @CP07
  Escenario: Consulta del historial sin token
    Cuando se consulta el historial sin token
    Entonces el servicio responde con el código 401
