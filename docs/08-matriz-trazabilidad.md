
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
| HU-001 / HU4 | Registro de actividades | CA-01 / CA9: registro exitoso | POST /registrar_actividad.php; equivalente funcional `/api/actividades` | CP09 en `hu4-registrar-actividad.feature` | Verificado en prototipo Node.js |
| HU-001 / HU4 | Registro de actividades | CA-02 / CA11: rechazo de duración y distancia negativas | POST /registrar_actividad.php; equivalente funcional `/api/actividades` | CP17 en `hu4-registrar-actividad.feature` | Verificado en prototipo Node.js |
| HU-001 / HU4 | Registro de actividades | CA-03 / CA10: duración obligatoria | POST /registrar_actividad.php; equivalente funcional `/api/actividades` | CP10 en `hu4-registrar-actividad.feature` | Verificado en prototipo Node.js |
| HU-002 (provisional) / HU1 | Registro de usuario | Por verificar en la historia correspondiente | Servicio de registro; ruta por confirmar | `hu1-registro.feature` | Parcial |
| HU-003 (provisional) / HU2 | Inicio de sesión | Por verificar en la historia correspondiente | POST /login.php | `hu2-inicio-sesion.feature` | Parcial |
| HU-004 (provisional) / HU3 | Consulta de deportes | Por verificar en la historia correspondiente | Componente o servicio por confirmar | `hu3-deportes.feature` | Parcial |
| HU-005 (provisional) / HU5 | Consulta del historial | Por verificar en la historia correspondiente | GET /listar_actividades.php | `hu5-historial.feature` | Parcial |
| HU6 | Actualización de actividad propia | CP13: actualización autorizada | POST /actualizar_actividad.php | CP13 en `hu6-gestion-actividades-openapi.feature` | Verificado en funciones del prototipo Node.js |
| HU6 | Rechazo de actualización ajena | CP14: protección de actividades de otros usuarios | POST /actualizar_actividad.php | CP14 en `hu6-gestion-actividades-openapi.feature` | Verificado en funciones del prototipo Node.js |
| HU6 | Eliminación de actividad propia | CP15: eliminación autorizada | POST /eliminar_actividad.php | CP15 en `hu6-gestion-actividades-openapi.feature` | Verificado en funciones del prototipo Node.js |
| HU6 | Rechazo de eliminación ajena | CP16: protección de actividades de otros usuarios | POST /eliminar_actividad.php | CP16 en `hu6-gestion-actividades-openapi.feature` | Verificado en funciones del prototipo Node.js |

**Nota 1:** HU-001 es el identificador utilizado en `docs/07-historias-y-criterios.md`, mientras que HU4 es la etiqueta utilizada en el archivo Gherkin de registro de actividades. Se documenta su equivalencia funcional sin renombrar los identificadores originales.

**Nota 2:** Los identificadores HU-002 a HU-005 se conservan provisionalmente hasta contrastarlos con las historias y criterios originales.

**Nota 3:** Las etiquetas CA9, CA10 y CA11 corresponden a los escenarios de `hu4-registrar-actividad.feature`. Las equivalencias con CA-01, CA-02 y CA-03 se establecen por su comportamiento funcional.

**Nota 4:** La relación entre un endpoint PHP y una prueba del prototipo Node.js no significa que dicha prueba haya ejecutado solicitudes contra el backend PHP/MySQL.

## 4. Contrato OpenAPI y operaciones documentadas

El archivo `api/openapi.yaml` contiene cinco operaciones visualizadas mediante Swagger Editor.

| ID | Operación | Finalidad | Relación funcional |
|---|---|---|---|
| API-01 | POST /login.php | Autenticación de usuario | HU2 |
| API-02 | POST /registrar_actividad.php | Registro de actividad deportiva | HU-001 / HU4 |
| API-03 | GET /listar_actividades.php | Consulta de actividades | HU5 |
| API-04 | POST /actualizar_actividad.php | Actualización de actividad | HU6 |
| API-05 | POST /eliminar_actividad.php | Eliminación de actividad | HU6 |

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

**Resultado de la ejecución más reciente:**

| Indicador | Resultado |
|---|---:|
| Escenarios ejecutados | 17 |
| Escenarios aprobados | 17 |
| Escenarios fallidos | 0 |
| Pasos ejecutados | 96 |
| Pasos aprobados | 96 |
| Pasos fallidos | 0 |
| Tiempo de ejecución | 1,284 segundos |

**Salida confirmada:**

```text
17 scenarios (17 passed)
96 steps (96 passed)
0m 1.284s (0m 1.205s executing your code)
```

La suite anterior contenía 16 escenarios aprobados. Se incorporó CP17 para comprobar el rechazo de una actividad con duración de -10 minutos y distancia de -5 kilómetros.

La ejecución actual confirma que CP17 y los demás escenarios finalizaron satisfactoriamente.

**Alcance de la prueba:**

Los escenarios de registro se ejecutan contra las rutas HTTP del servidor de prueba Node.js, como `/api/actividades`.

Los escenarios de actualización y eliminación comprueban funciones del prototipo. No constituyen, por sí mismos, pruebas de integración HTTP contra el backend PHP/MySQL.

### 6.3. Análisis estático ESLint

Se ejecutó el análisis estático del código JavaScript.

**Comando utilizado:**

`npm.cmd run lint`

**Resultado:** ejecución finalizada sin errores reportados en la verificación anterior.

Esta comprobación corresponde al código JavaScript del prototipo y no representa un análisis estático del código Java o PHP de PUKAY.

### 6.4. Cobertura confirmada del registro de actividades

| Criterio documental | Etiqueta Gherkin | Prueba | Comportamiento esperado | Resultado |
|---|---|---|---|---|
| CA-01: Registro exitoso | CA9 | CP09 | HTTP 201 y actividad visible en historial | Aprobado |
| CA-02: Rechazo de datos inválidos | CA11 | CP17 | HTTP 400 y ninguna actividad registrada | Aprobado |
| CA-03: Campos obligatorios | CA10 | CP10 | HTTP 400 y ninguna actividad registrada | Aprobado |

La cobertura indicada corresponde al comportamiento comprobado en el prototipo Node.js.

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

Para completar la trazabilidad general del proyecto se requiere:

1. Unificar o documentar las equivalencias entre los identificadores de historias de usuario del dossier y los archivos Gherkin.
2. Revisar los criterios de aceptación de HU1, HU2, HU3 y HU5.
3. Confirmar la correspondencia entre los servicios del prototipo Node.js y los endpoints PHP.
4. Incorporar al repositorio las evidencias de ejecución que correspondan.
5. Confirmar la existencia y ubicación del documento HTML generado mediante Redocly.
6. Realizar pruebas de integración contra el backend PHP/MySQL cuando corresponda al alcance de la implementación.

## 9. Conclusión

La matriz de trazabilidad relaciona los requisitos funcionales de PUKAY con el contrato OpenAPI y las pruebas del prototipo Node.js.

Se confirmó la correspondencia funcional de los tres criterios de aceptación del registro de actividades con los escenarios CP09, CP10 y CP17.

La última ejecución de Cucumber finalizó con **17 escenarios aprobados, 96 pasos aprobados y ningún fallo**.

Adicionalmente, se visualizaron cinco operaciones en Swagger Editor, se validó el contrato con Spectral sin errores de severidad `error` y se ejecutó ESLint sin errores en la verificación anterior.

Estos resultados constituyen evidencia del funcionamiento de la cadena CASE dentro del alcance evaluado. No sustituyen las pruebas de integración del backend PHP/MySQL ni de la aplicación Android.

La trazabilidad del registro de actividades se encuentra verificada en el prototipo Node.js. Las restantes relaciones documentales e integraciones requieren las comprobaciones señaladas en este documento.

---

## Navegación

[Volver al índice general](README.md)

[Consultar el mapa de toolchain](06-mapa-toolchain.md)

[Consultar historias y criterios de aceptación](07-historias-y-criterios.md)

[Consultar la matriz de evaluación CASE](09-matriz-evaluacion-case.md)

[Consultar el registro de IA](04-registro-ia.md)
