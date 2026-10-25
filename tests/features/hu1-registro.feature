# language: es
@HU1 @E1
Característica: Registrarse en PUKAY
  Como deportista aficionado
  Quiero registrarme con mi correo y una contraseña
  Para usar la aplicación con mis datos protegidos

  @CA1 @CP01
  Escenario: Registro con datos válidos
    Dado que el correo "ana@ejemplo.com" no está registrado
    Cuando se solicita el registro con correo "ana@ejemplo.com" y contraseña "ClaveDePrueba"
    Entonces el servicio responde con el código 201
    Y la respuesta contiene el correo "ana@ejemplo.com"
    Y la respuesta no contiene la contraseña

  @CA2 @CP02
  Escenario: Registro con un correo que ya existe
    Dado que el correo "ana@ejemplo.com" ya está registrado
    Cuando se solicita el registro con correo "ana@ejemplo.com" y contraseña "OtraClave"
    Entonces el servicio responde con el código 409

  @CA3 @CP03
  Escenario: Registro con campos vacíos
    Cuando se solicita el registro con correo "" y contraseña ""
    Entonces el servicio responde con el código 400

  @CA4 @CP06
  Escenario: La contraseña no se almacena en texto plano
    Dado que el correo "ana@ejemplo.com" ya está registrado con la contraseña "ClaveDePrueba"
    Cuando se inspeccionan los usuarios almacenados
    Entonces 0 usuarios tienen la contraseña en texto plano
    Y el 100 % de los usuarios tiene hash y sal
