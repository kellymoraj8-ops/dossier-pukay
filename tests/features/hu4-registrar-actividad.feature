# language: es
@HU4 @E5
Característica: Registrar una actividad deportiva
  Como deportista aficionado
  Quiero registrar una actividad con pocos campos
  Para ver mi progreso sin hacer cálculos

  @CA9 @CP09
  Escenario: Registro de una actividad válida y consulta en el historial
    Dado que "ana@ejemplo.com" inició sesión
    Cuando registra una actividad de "ciclismo" el "2026-10-05" de 45 minutos y 12 km
    Entonces el servicio responde con el código 201
    Y el historial de "ana@ejemplo.com" contiene 1 actividad de "ciclismo"

  @CA10 @CP10
  Escenario: Registro de una actividad sin duración
    Dado que "ana@ejemplo.com" inició sesión
    Cuando registra una actividad de "ciclismo" el "2026-10-05" sin duración
    Entonces el servicio responde con el código 400
    Y el historial de "ana@ejemplo.com" contiene 0 actividades
