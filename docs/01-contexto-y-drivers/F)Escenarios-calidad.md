
# Parte I. Levantar los Drivers (Sesión 1)

## Paso 4. Escenarios de Calidad

### Objetivo

Definir escenarios de calidad verificables para los cinco drivers arquitectónicos del sistema PUKAY.

Cada escenario se estructura mediante seis elementos: fuente, estímulo, entorno, artefacto, respuesta y medida (Bass et al., 2021).

La Tabla 7 resume los escenarios E1 a E5. Las Tablas 8 a 12 presentan su descripción detallada.

---

## Tabla 7. Escenarios de Calidad de la Parte I

| ID | Atributo | Driver | Escenario | Medida (propuesta) |
|---|---|---|---|---|
| **E1** | Seguridad | D1 | Una persona con acceso de lectura a MySQL consulta la tabla usuario y no puede obtener las contraseñas. | 0 usuarios con contraseña en texto plano; 100 % con hash y sal. |
| **E2** | Seguridad | D2 | Un usuario autenticado solicita su historial y sus metas y solo recibe los suyos. | 0 registros ajenos en el 100 % de las consultas; 100 % de peticiones sin token reciben 401. |
| **E3** | Mantenibilidad | D3 | Un integrante cambia la ruta o el formato de un recurso REST y lo hace sin tocar las pantallas. | 0 archivos de interfaz modificados; 4 horas-persona o menos. |
| **E4** | Interoperabilidad | D4 | Un desarrollador de un nuevo cliente consume la API sin cambios en el backend. | 9 de 9 recursos utilizables; 0 líneas de lógica de negocio cambiadas. |
| **E5** | Capacidad de interacción | D5 | Un deportista registra una actividad recién realizada y la ve en su historial. | 3 pantallas o menos y 60 s o menos; 0 campos de progreso editables a mano. |

*Nota. Elaboración propia. Las evidencias CP se toman de la Tabla 24 de Arévalo et al. (2026).*

---

## Tabla 8. Escenario E1: Protección de Contraseñas Almacenadas

| Parte | Descripción |
|---|---|
| **Atributo y driver** | Seguridad (D1) |
| **Fuente** | Una persona con acceso de lectura a la base de datos MySQL. |
| **Estímulo** | Consulta la tabla usuario. |
| **Entorno** | Operación normal, con usuarios ya registrados. |
| **Artefacto** | Tabla usuario de la base de datos MySQL. |
| **Respuesta** | Las contraseñas no se pueden leer ni recuperar en su forma original. |
| **Medida** | 0 de los usuarios registrados tiene la contraseña en texto plano; el 100 % está almacenado como hash con sal. |
| **Evidencia** | CP06 (inspección de la tabla usuario); ADR-002. |

*Nota. Elaboración propia. Las evidencias CP corresponden a la Tabla 24 de Arévalo et al. (2026).*

---

## Tabla 9. Escenario E2: Aislamiento de los Datos por Usuario

| Parte | Descripción |
|---|---|
| **Atributo y driver** | Seguridad (D2) |
| **Fuente** | Un usuario autenticado. |
| **Estímulo** | Solicita su historial de actividades y sus metas mientras existen datos de otros usuarios. |
| **Entorno** | Operación normal, con al menos dos usuarios con datos registrados. |
| **Artefacto** | Endpoints protegidos de la API REST. |
| **Respuesta** | La API valida el token y filtra la información por el identificador del usuario autenticado. |
| **Medida** | 0 registros de otros usuarios en el 100 % de las consultas; el 100 % de las peticiones sin token recibe el código 401. |
| **Evidencia** | CP07 y CP12; ADR-002. |

*Nota. Elaboración propia. Las evidencias CP corresponden a la Tabla 24 de Arévalo et al. (2026).*

---

## Tabla 10. Escenario E3: Cambio Localizado en el Acceso Remoto

| Parte | Descripción |
|---|---|
| **Atributo y driver** | Mantenibilidad (D3) |
| **Fuente** | Un integrante del equipo de desarrollo. |
| **Estímulo** | Debe cambiar la ruta o el formato de un recurso REST consumido por la aplicación. |
| **Entorno** | Desarrollo, antes de generar una nueva versión. |
| **Artefacto** | Capas de acceso remoto y Repository del cliente Android. |
| **Respuesta** | El cambio se hace solo en la capa de acceso remoto y en el Repository, y se prueba sin tocar las pantallas. |
| **Medida** | 0 archivos de interfaz (Activities y XML) modificados y cambio terminado en 4 horas-persona o menos. |
| **Evidencia** | Organización del código fuente (Arévalo et al., 2026, Tabla 7); ADR-003. |

*Nota. Elaboración propia. Las evidencias CP corresponden a la Tabla 24 de Arévalo et al. (2026).*

---

## Tabla 11. Escenario E4: Reutilización del Backend por Otro Cliente

| Parte | Descripción |
|---|---|
| **Atributo y driver** | Interoperabilidad (D4) |
| **Fuente** | Un desarrollador de un nuevo cliente (web o iOS). |
| **Estímulo** | Necesita consumir los recursos de PUKAY. |
| **Entorno** | Evolución futura, con el backend en operación. |
| **Artefacto** | API REST de PUKAY. |
| **Respuesta** | El nuevo cliente consume la API con HTTPS, JSON y token, sin cambios en la lógica de negocio. |
| **Medida** | 9 de 9 recursos de la API utilizables sin modificar el backend (0 líneas de lógica de negocio cambiadas). |
| **Evidencia** | Recursos de la API (Arévalo et al., 2026, Tabla 10), probados con una herramienta cliente REST; ADR-003. |

*Nota. Elaboración propia. Las evidencias CP corresponden a la Tabla 24 de Arévalo et al. (2026).*

---

## Tabla 12. Escenario E5: Registro Rápido de una Actividad

| Parte | Descripción |
|---|---|
| **Atributo y driver** | Capacidad de interacción (D5) |
| **Fuente** | Un deportista autenticado. |
| **Estímulo** | Quiere registrar una actividad que acaba de realizar. |
| **Entorno** | Operación normal, con el servidor disponible. |
| **Artefacto** | Flujo de pantallas Inicio, Deportes y Registrar actividad de la aplicación móvil. |
| **Respuesta** | Selecciona el deporte, completa fecha, duración y observación opcional, y la actividad aparece en el historial. |
| **Medida** | 3 pantallas o menos y 60 segundos o menos desde Inicio hasta ver la actividad en el historial; 0 campos de progreso editables a mano. |
| **Evidencia** | CP09 y CP14; cálculo automático del progreso (DA-06 del informe); ADR-001. |

*Nota. Elaboración propia. Las evidencias CP corresponden a la Tabla 24 de Arévalo et al. (2026).*

---

## Conclusión

Los escenarios E1 a E5 permiten evaluar los principales atributos de calidad de PUKAY mediante medidas concretas.

Estos escenarios servirán como referencia para justificar las decisiones arquitectónicas, analizar las alternativas de estilo y verificar el cumplimiento de los objetivos del sistema.
