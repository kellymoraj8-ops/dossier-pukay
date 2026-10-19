
## Tabla 16

### ADR-002: Protección de Credenciales con Hash de Contraseña y Token de Autenticación (protege E1 y E2)

| Campo | Contenido |
|---|---|
| **Título** | Protección de credenciales con hash de contraseña y token de autenticación |
| **Estado** | Aceptada. |
| **Contexto** | D1 y D2 exigen que las contraseñas no se guarden en texto plano, que cada usuario solo acceda a su información y que la comunicación sea por HTTPS (RNF02 y RNF03 del informe). El servidor es sin estado: cada petición debe traer su credencial. El certificado HTTPS es de desarrollo (R6). |
| **Decisión** | Guardar únicamente el hash con sal de la contraseña. Al iniciar sesión, la API compara la contraseña con el hash y devuelve un token que la aplicación envía en la cabecera de autorización. Cada endpoint protegido valida el token y filtra los datos por el usuario autenticado. Toda la comunicación usa HTTPS. |
| **Alternativas** | (a) Contraseña en texto plano: riesgo alto si se filtra la base. (b) Cifrado reversible: permite recuperar la contraseña original. (c) Autenticación delegada en un servicio externo: introduce dependencia de un proveedor y se aparta del backend propio exigido por R1. |
| **Consecuencias** | **A favor:** contraseñas no legibles; endpoints protegidos; un usuario no accede a los datos de otro. **En contra:** más lógica en registro e inicio de sesión; hay que gestionar la vigencia de los tokens; se recomienda evolucionar a bcrypt o Argon2 y a un certificado válido en producción. |
| **Vínculo** | Drivers D1 y D2; escenarios E1 y E2; restricciones R1 y R6; C4 nivel 2: relación Aplicación móvil → API REST. Evidencia: Tablas 13 y 19 del informe; CP04 a CP07 y CP12. |

*Nota. Elaboración propia a partir de Arévalo et al. (2026) y del formato de Nygard (2011).*

