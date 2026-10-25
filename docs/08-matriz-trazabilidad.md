
# Matriz de Trazabilidad – PUKAY

## 1. Objetivo

Relacionar los requisitos funcionales de PUKAY con las historias de usuario, criterios de aceptación, servicios de la API REST, escenarios Gherkin y resultados de verificación.

La matriz permite identificar las relaciones comprobadas y aquellas que todavía requieren validación, contribuyendo a la trazabilidad de la cadena CASE.

## 2. Alcance

La trazabilidad comprende:

- Historias de usuario documentadas.
- Criterios de aceptación en formato Gherkin.
- Contrato OpenAPI de PUKAY.
- Esqueleto ejecutable desarrollado en Node.js.
- Escenarios automatizados mediante Cucumber.
- Verificaciones realizadas con Spectral y ESLint.

El esqueleto Node.js constituye un prototipo de apoyo para la actividad académica. No reemplaza la arquitectura principal de PUKAY, basada en Android, API REST PHP y MySQL.

## 3. Matriz de trazabilidad funcional

| ID de historia | Funcionalidad | Criterio de aceptación | Servicio relacionado | Escenario o archivo de prueba | Estado de trazabilidad |
|---|---|---|---|---|---|
| HU-001 | Registrar actividad deportiva | CA-01: Registro exitoso | POST /registrar_actividad.php | Escenario de registro con datos válidos; correspondencia exacta por verificar | Parcial |
| HU-001 | Registrar actividad deportiva | CA-02: Rechazo de datos inválidos | POST /registrar_actividad.php | Escenario de duración o distancia inválida; correspondencia exacta por verificar | Parcial |
| HU-001 | Registrar actividad deportiva | CA-03: Campos obligatorios | POST /registrar_actividad.php | Escenario de campos vacíos; correspondencia exacta por verificar | Parcial |
| HU-002 (provisional) | Registro de usuario | Por verificar en la historia correspondiente | Servicio de registro; ruta por confirmar | `hu1-registro.feature` | Parcial |
| HU-003 (provisional) | Inicio de sesión | Por verificar en la historia correspondiente | POST /login.php | `hu2-inicio-sesion.feature` | Parcial |
| HU-004 (provisional) | Consulta de deportes | Por verificar en la historia correspondiente | Componente o servicio por confirmar | `hu3-deportes.feature` | Parcial |
| HU-005 (provisional) | Consulta del historial | Por verificar en la historia correspondiente | GET /listar_actividades.php | `hu5-historial.feature` | Parcial |
| Por confirmar | Actualización de actividad | Por verificar en el archivo Gherkin | POST /actualizar_actividad.php | `hu6-gestion-actividades-openapi.feature` | Parcial |
| Por confirmar | Eliminación de actividad | Por verificar en el archivo Gherkin | POST /eliminar_actividad.php | `hu6-gestion-actividades-openapi.feature` | Parcial |

**Nota 1:** Los identificadores HU-002 a HU-005 se conservan provisionalmente porque la numeración documental todavía debe contrastarse con los archivos Gherkin.

**Nota 2:** La relación entre un servicio PHP y un escenario del prototipo Node.js representa una correspondencia funcional prevista. No demuestra que el escenario haya ejecutado una solicitud HTTP contra el backend PHP.

**Nota 3:** La presencia de un archivo `.feature` no garantiza que todos los criterios de aceptación estén cubiertos. La cobertura debe comprobarse revisando sus escenarios y definiciones de pasos.

## 4. Contrato OpenAPI y operaciones documentadas

El archivo `api/openapi.yaml` contiene cinco operaciones que fueron visualizadas mediante Swagger Editor.

| ID | Operación | Finalidad |
|---|---|---|
| API-01 | POST /login.php | Autenticación de usuario |
| API-02 | POST /registrar_actividad.php | Registro de actividad deportiva |
| API-03 | GET /listar_actividades.php | Consulta de actividades |
| API-04 | POST /actualizar_actividad.php | Actualización de actividad |
| API-05 | POST /eliminar_actividad.php | Eliminación de actividad |

Estas operaciones constituyen referencias del contrato OpenAPI. Su presencia en el contrato no equivale a una prueba de integración satisfactoria contra el servidor PHP/MySQL.

## 5. Herramientas de verificación

| Herramienta | Propósito | Artefacto o evidencia |
|---|---|---|
| Swagger Editor | Visualizar y revisar las operaciones del contrato OpenAPI | `api/openapi.yaml` |
| Spectral | Validar el contrato OpenAPI mediante reglas | `api/openapi.yaml` y `.spectral.yaml` |
| Redocly | Generar documentación HTML de la API | Documento HTML generado localmente; ubicación final por confirmar |
| Cucumber | Ejecutar escenarios Gherkin del prototipo Node.js | `tests/features/` y `tests/steps/` |
| ESLint | Analizar estáticamente el código JavaScript | Código del prototipo y resultado del comando de lint |

Los archivos de evidencia mencionados en versiones anteriores deben comprobarse en el repositorio antes de presentarlos como adjuntos disponibles.

## 6. Resultados de verificación

### 6.1. Validación OpenAPI

Se ejecutó Spectral sobre el contrato OpenAPI de PUKAY.

**Comando utilizado:**

`npx.cmd @stoplight/spectral-cli lint api/openapi.yaml`

Durante la primera ejecución se presentó un problema debido a la ausencia de un conjunto de reglas.

Para resolverlo, se configuró el archivo `.spectral.yaml` con el siguiente contenido:

`extends: ["spectral:oas"]`

Después de repetir la validación, se obtuvo el mensaje:

`No results with a severity of 'error' found!`

**Resultado:** no se encontraron problemas de severidad `error`.

Este resultado no implica necesariamente la ausencia de advertencias ni confirma el funcionamiento del backend.

### 6.2. Pruebas automatizadas Cucumber

Se ejecutaron pruebas automatizadas mediante Cucumber sobre el prototipo Node.js.

**Comando utilizado:**

`npm.cmd test`

**Resultado de la ejecución más reciente comunicada:**

- Escenarios ejecutados: 16.
- Escenarios aprobados: 16.
- Escenarios fallidos: 0.

El registro anterior documentaba 12 escenarios y 68 pasos aprobados. Posteriormente se amplió la suite a 16 escenarios.

Por este motivo, el número de 68 pasos no se presenta como resultado actualizado: debe confirmarse mediante la salida de la última ejecución.

Los escenarios de actualización y eliminación incorporados al prototipo verifican funciones de servicio. No constituyen, por sí mismos, pruebas de integración HTTP contra el backend PHP/MySQL.

### 6.3. Análisis estático ESLint

Se ejecutó el análisis estático del código JavaScript.

**Comando utilizado:**

`npm.cmd run lint`

**Resultado:** ejecución finalizada sin errores reportados.

Esta comprobación corresponde al código JavaScript del prototipo y no representa un análisis estático del código Java o PHP de PUKAY.

## 7. Relación con los artefactos de la cadena CASE

| Artefacto | Función dentro de la trazabilidad |
|---|---|
| `docs/06-mapa-toolchain.md` | Identificar fases, tareas prioritarias y herramientas CASE |
| `docs/07-historias-y-criterios.md` | Documentar historias de usuario y criterios de aceptación |
| `docs/08-matriz-trazabilidad.md` | Relacionar requisitos, servicios y pruebas |
| `docs/09-matriz-evaluacion-case.md` | Evaluar y seleccionar herramientas CASE |
| `docs/04-registro-ia.md` | Documentar uso, defectos y verificación de resultados de IA |
| `api/openapi.yaml` | Especificar las operaciones del contrato REST |
| `.spectral.yaml` | Configurar la validación del contrato |
| `src/` | Contener la implementación del prototipo Node.js |
| `tests/features/` | Contener escenarios de aceptación en Gherkin |
| `tests/steps/` | Contener las definiciones de pasos de Cucumber |

## 8. Pendientes de verificación

Para completar la trazabilidad se requiere:

1. Unificar los identificadores de historias de usuario entre la documentación y los archivos Gherkin.
2. Revisar el contenido exacto de cada archivo `.feature`.
3. Asociar cada criterio de aceptación con uno o varios escenarios identificables.
4. Confirmar las diferencias entre las rutas del prototipo Node.js y los endpoints PHP.
5. Registrar la salida actualizada de Cucumber, incluyendo el número de pasos.
6. Confirmar la existencia y ubicación de las evidencias finales.
7. Realizar pruebas de integración HTTP y del backend PHP/MySQL cuando corresponda al alcance de la implementación.

## 9. Conclusión

La matriz de trazabilidad permite relacionar los requisitos funcionales de PUKAY con el contrato OpenAPI y las pruebas del prototipo Node.js.

Las verificaciones realizadas muestran resultados satisfactorios en el alcance evaluado: cinco operaciones visualizadas en Swagger Editor, validación de Spectral sin errores de severidad `error`, 16 escenarios aprobados en Cucumber y análisis ESLint sin errores.

No obstante, todavía existen relaciones que deben confirmarse mediante la revisión de los archivos Gherkin y sus definiciones de pasos.

Por ello, la trazabilidad se considera parcialmente verificada. Esta distinción permite evitar afirmaciones no respaldadas por evidencias y facilita el cierre de los artefactos de la Semana 2.

---

## Navegación

[Volver al índice general](README.md)

[Consultar el mapa de toolchain](06-mapa-toolchain.md)

[Consultar historias y criterios de aceptación](07-historias-y-criterios.md)

[Consultar la matriz de evaluación CASE](09-matriz-evaluacion-case.md)

[Consultar el registro de IA](04-registro-ia.md)
