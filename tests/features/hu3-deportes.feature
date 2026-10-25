
# language: es
@HU3 @E5
Característica: Consultar los deportes disponibles
  Como deportista aficionado
  Quiero ver los deportes disponibles
  Para elegir la actividad que voy a registrar

  @CA7 @CP08
  Escenario: El catálogo incluye los seis deportes definidos en OpenAPI
    Dado que "ana@ejemplo.com" inició sesión
    Cuando se consultan los deportes
    Entonces el servicio responde con el código 200
    Y el catálogo contiene "running, caminata, ciclismo, fútbol, gimnasio, natación"

  @CA8 @CP07 @E2
  Escenario: Consulta de deportes sin token
    Cuando se consultan los deportes sin token
    Entonces el servicio responde con el código 401
