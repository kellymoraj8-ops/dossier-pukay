# language: es
@HU2 @E2
Característica: Iniciar sesión en PUKAY
  Como deportista aficionado
  Quiero iniciar sesión con mi correo y mi contraseña
  Para acceder solo a mis propios datos

  @CA5 @CP04
  Escenario: Inicio de sesión con credenciales correctas
    Dado que el correo "ana@ejemplo.com" ya está registrado con la contraseña "ClaveDePrueba"
    Cuando se solicita el inicio de sesión con correo "ana@ejemplo.com" y contraseña "ClaveDePrueba"
    Entonces el servicio responde con el código 200
    Y la respuesta incluye un token

  @CA6 @CP05
  Escenario: Inicio de sesión con credenciales no válidas
    Dado que el correo "ana@ejemplo.com" ya está registrado con la contraseña "ClaveDePrueba"
    Cuando se solicita el inicio de sesión con correo "ana@ejemplo.com" y contraseña "ClaveIncorrecta"
    Entonces el servicio responde con el código 401
    Y la respuesta no incluye un token
