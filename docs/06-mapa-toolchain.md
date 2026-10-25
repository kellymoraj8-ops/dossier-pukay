# 06. Mapa de Toolchain CASE — PUKAY

## 1. Introducción

Este documento presenta el mapa de herramientas CASE (Computer-Aided Software Engineering) del proyecto PUKAY, una aplicación Android para registrar actividades deportivas, gestionar metas personales y consultar el progreso del deportista. Identifica tareas repetitivas, prioriza oportunidades de automatización y documenta pruebas prácticas de herramientas.

La arquitectura principal de PUKAY utiliza Android Studio con Java y XML, una API REST en PHP y MySQL. Para las actividades de automatización de la Semana 2 se dispone además de un prototipo ejecutable Node.js, utilizado para las pruebas Cucumber y la comprobación de operaciones del contrato OpenAPI. Este prototipo no sustituye al backend PHP/MySQL.

## 2. Objetivos

**Objetivo general:** Organizar y priorizar tareas del proceso de desarrollo de PUKAY, asociando fases, artefactos, responsables y herramientas CASE, y documentar los resultados de su evaluación práctica.

**Objetivos específicos:**

- Identificar fases del ciclo de vida, artefactos y responsables.
- Identificar diez tareas de alto volumen susceptibles de automatización.
- Priorizar tareas con la fórmula frecuencia × esfuerzo × riesgo.
- Clasificar herramientas candidatas como Upper CASE, Lower CASE o I-CASE según su función en la cadena.
- Probar las herramientas de las tres tareas prioritarias, incluyendo una herramienta de IA.
- Registrar resultados, defectos, correcciones, evidencias y limitaciones.
- Mantener trazabilidad entre requisitos, contrato, implementación y pruebas.

## 3. Proceso de desarrollo y mapa de toolchain

| Fase | Actividades principales | Artefactos | Responsable | Herramienta candidata | Categoría CASE |
|---|---|---|---|---|---|
| 1. Análisis de requisitos | Identificar necesidades, redactar historias y criterios | Historias de usuario, escenarios, Gherkin | Equipo de análisis | ChatGPT | Upper CASE |
| 2. Diseño arquitectónico | Definir componentes, relaciones y decisiones | Diagramas C4 y ADR | Equipo de arquitectura | Mermaid | Upper CASE |
| 3. Diseño de API | Especificar operaciones, esquemas y respuestas | `api/openapi.yaml` | Equipo backend | Swagger Editor | Upper CASE |
| 4. Implementación | Desarrollar aplicación, servicios y prototipo | Código Java, XML, PHP y JavaScript | Equipo de desarrollo | Android Studio y VS Code | Lower CASE |
| 5. Integración | Comprobar interfaces y comunicación | Endpoints y evidencias de integración | Equipo de desarrollo | Postman | I-CASE (función de integración) |
| 6. Pruebas | Ejecutar criterios de aceptación y revisar contrato | Escenarios Gherkin, resultados y reporte de lint | Equipo de pruebas | Cucumber y Spectral | Lower CASE |
| 7. Documentación | Mantener documentación técnica y de API | Markdown, documentación OpenAPI | Equipo de documentación | GitHub y Swagger UI | I-CASE (función de integración) |
| 8. Control de versiones | Registrar cambios, ramas y versiones | Commits, historial, etiquetas | Equipo de desarrollo | Git y GitHub | I-CASE (función de integración) |

**Criterio de clasificación:** Upper CASE apoya análisis y diseño; Lower CASE apoya construcción, validación y pruebas; I-CASE integra artefactos y actividades. La categoría indica el papel propuesto en la cadena: Postman, GitHub y Swagger UI no son, por sí solos, plataformas I-CASE completas.

## 4. Identificación de diez tareas de alto volumen

### 4.1. Método de priorización

**Puntaje = Frecuencia × Esfuerzo × Riesgo**

Cada factor se califica de 1 a 5. El mínimo es 1 y el máximo es 125.

| Valor | Frecuencia | Esfuerzo | Riesgo |
|---|---|---|---|
| 1 | Muy baja | Muy bajo | Muy bajo |
| 2 | Baja | Bajo | Bajo |
| 3 | Media | Medio | Medio |
| 4 | Alta | Alto | Alto |
| 5 | Muy alta | Muy alto | Muy alto |

Las puntuaciones son estimaciones razonadas del equipo y no mediciones estadísticas de productividad.

### 4.2. Matriz de priorización

| ID | Tarea | Frecuencia | Esfuerzo | Riesgo | Puntaje |
|---|---|---:|---:|---:|---:|
| T-01 | Elaborar y actualizar historias de usuario y criterios de aceptación | 5 | 5 | 5 | 125 |
| T-02 | Diseñar y mantener el contrato OpenAPI de los servicios REST | 5 | 5 | 4 | 100 |
| T-03 | Ejecutar y verificar pruebas automatizadas de la API | 5 | 4 | 5 | 100 |
| T-04 | Generar documentación técnica de los endpoints | 4 | 4 | 4 | 64 |
| T-05 | Validar solicitudes y respuestas JSON | 4 | 4 | 4 | 64 |
| T-06 | Implementar operaciones CRUD de actividades deportivas | 4 | 4 | 3 | 48 |
| T-07 | Actualizar diagramas arquitectónicos C4 | 3 | 4 | 3 | 36 |
| T-08 | Registrar y verificar el uso de herramientas de IA | 3 | 3 | 4 | 36 |
| T-09 | Mantener trazabilidad entre requisitos y pruebas | 3 | 3 | 3 | 27 |
| T-10 | Organizar documentación y control de versiones | 4 | 2 | 3 | 24 |

### 4.3. Justificación de las puntuaciones

**T-01 (5 × 5 × 5 = 125).** Frecuencia muy alta porque cada funcionalidad necesita criterios verificables; esfuerzo muy alto por redacción, revisión y ajustes; riesgo muy alto porque las ambigüedades se trasladan al diseño, código y pruebas.

**T-02 (5 × 5 × 4 = 100).** Frecuencia muy alta porque el contrato debe mantenerse alineado con los servicios; esfuerzo muy alto por rutas, esquemas y respuestas; riesgo alto por posibles fallos de integración entre Android y PHP.

**T-03 (5 × 4 × 5 = 100).** Frecuencia muy alta porque las pruebas se repiten tras cambios; esfuerzo alto por preparación de escenarios y datos; riesgo muy alto porque defectos de autenticación o propiedad de actividades podrían pasar inadvertidos.

**T-04 (4 × 4 × 4 = 64).** La documentación cambia con los endpoints; requiere revisar ejemplos y esquemas; las inconsistencias perjudican integración y mantenimiento.

**T-05 (4 × 4 × 4 = 64).** Las solicitudes y respuestas JSON requieren verificaciones recurrentes; comprobar tipos, campos y formatos demanda trabajo y los errores afectan la comunicación.

**T-06 (4 × 4 × 3 = 48).** Las operaciones CRUD exigen implementación y validaciones repetidas; el riesgo es medio porque existen controles y pruebas que pueden detectar parte de los defectos.

**T-07 (3 × 4 × 3 = 36).** Los diagramas se actualizan cuando cambia la arquitectura; revisarlos requiere esfuerzo alto y el riesgo de desactualización es medio.

**T-08 (3 × 3 × 4 = 36).** El registro de IA se actualiza al utilizarla; requiere revisión moderada; el riesgo es alto si se aceptan resultados sin comprobarlos.

**T-09 (3 × 3 × 3 = 27).** La trazabilidad se revisa periódicamente; enlazar identificadores y pruebas exige esfuerzo medio y su ausencia genera riesgo medio.

**T-10 (4 × 2 × 3 = 24).** Los cambios de documentación y Git son frecuentes, pero las herramientas reducen el esfuerzo; una organización incorrecta puede afectar la entrega.

## 5. Selección de las tres tareas prioritarias

| Prioridad | Tarea | Puntaje | Herramienta evaluada |
|---|---|---:|---|
| 1 | T-01: Historias y criterios | 125 | ChatGPT (IA) |
| 2 | T-02: Contrato OpenAPI | 100 | Swagger Editor, complementado por Spectral |
| 3 | T-03: Pruebas automatizadas | 100 | Cucumber para JavaScript |

Se emplea **Cucumber**, en lugar de PHPUnit, porque la evidencia ejecutada de la cadena CASE corresponde al prototipo Node.js y sus escenarios Gherkin. Esto no implica que el backend PHP haya sido probado con PHPUnit.

## 6. Pruebas prácticas de herramientas CASE

### 6.1. Prueba P-01: ChatGPT

**Tarea asociada:** T-01 — Elaborar y actualizar historias y criterios de aceptación.

**Herramienta:** ChatGPT (GPT-6). **Categoría:** Upper CASE, por su función de apoyo al análisis.

**Objetivo:** Evaluar la asistencia de IA para redactar historias y criterios de aceptación verificables en Gherkin.

**Prompt utilizado:**

> Genera una historia de usuario para PUKAY, una aplicación Android de seguimiento deportivo, sobre el registro de actividades. Incluye criterios de aceptación en formato Gherkin para un registro exitoso y para el rechazo de datos inválidos.

**Procedimiento:**

1. Seleccionar el registro de actividades deportivas como funcionalidad de prueba.
2. Solicitar una historia y criterios Gherkin a ChatGPT.
3. Revisar la propuesta frente a los requisitos del proyecto.
4. Modificar la historia HU-001 y ampliar sus criterios.
5. Documentar el resultado en `docs/07-historias-y-criterios.md`.

**Resultado:** Se elaboró HU-001, Registro de Actividades Deportivas, con CA-01 (registro exitoso), CA-02 (rechazo de datos inválidos) y CA-03 (campos obligatorios).

**Defectos identificados:** La propuesta inicial no contemplaba todos los campos ni un escenario independiente para campos obligatorios; tampoco precisaba suficientemente la relación entre usuario autenticado, API REST y persistencia.

**Corrección y decisión:** Se amplió la historia, se incorporó un tercer criterio y se propusieron reglas de negocio. **Decisión: modificado.**

**Verificación:** Revisión documental de la historia y los criterios. Sigue pendiente confirmar la correspondencia exacta de CA-01, CA-02 y CA-03 con las pruebas ejecutadas.

**Evidencia:** `docs/07-historias-y-criterios.md`, HU-001 y criterios CA-01 a CA-03; historial de revisión de la propuesta.

**Estado:** Prueba documental realizada; trazabilidad funcional por verificar.

### 6.2. Prueba P-02: Swagger Editor y Spectral

**Tarea asociada:** T-02 — Diseñar y mantener el contrato OpenAPI.

**Herramientas:** Swagger Editor y Spectral. **Categoría:** Upper CASE para el diseño y Lower CASE para la validación automatizada.

**Objetivo:** Comprobar la visualización del contrato OpenAPI de PUKAY y validarlo sin errores de severidad `error`.

**Procedimiento realizado:**

1. Abrir Swagger Editor e importar `api/openapi.yaml`.
2. Comprobar que aparecen las cinco operaciones definidas.
3. Ejecutar Spectral desde la terminal de VS Code.
4. Identificar el problema de configuración de reglas.
5. Crear `.spectral.yaml` con `extends: ["spectral:oas"]`.
6. Repetir la ejecución de Spectral y registrar el resultado.

**Operaciones visibles en Swagger Editor:**

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/login.php` | Iniciar sesión |
| POST | `/registrar_actividad.php` | Registrar actividad deportiva |
| GET | `/listar_actividades.php` | Consultar historial deportivo |
| POST | `/actualizar_actividad.php` | Actualizar actividad deportiva |
| POST | `/eliminar_actividad.php` | Eliminar actividad deportiva |

**Comando ejecutado:**

```powershell
npx.cmd @stoplight/spectral-cli lint api/openapi.yaml
```

**Defecto identificado:** En la primera ejecución apareció `No ruleset has been found.`. Era un problema de configuración de Spectral, no una prueba de que el contrato estuviera incorrecto.

**Corrección aplicada:** Se creó el archivo `.spectral.yaml` en la raíz del repositorio con este contenido:

```yaml
extends: ["spectral:oas"]
```

**Resultado obtenido:** Swagger Editor mostró las cinco operaciones. Tras configurar las reglas, Spectral devolvió:

```text
No results with a severity of 'error' found!
```

**Decisión:** Aceptado con modificaciones (configuración de ruleset).

**Verificación:** Visualización de las cinco operaciones y ejecución del linter sin errores de severidad `error`.

**Evidencias:** `api/openapi.yaml`, `.spectral.yaml`, captura de Swagger Editor y salida de Spectral en la terminal.

**Limitaciones:** El mensaje confirma ausencia de errores de esa severidad, pero no necesariamente ausencia de advertencias. La validación estática no demuestra que el servidor PHP/MySQL responda correctamente.

**Estado:** Prueba práctica ejecutada satisfactoriamente.

### 6.3. Prueba P-03: Cucumber

**Tarea asociada:** T-03 — Ejecutar y verificar pruebas automatizadas de la API.

**Herramienta:** Cucumber para JavaScript. **Categoría:** Lower CASE.

**Objetivo:** Automatizar escenarios Gherkin para comprobar reglas de negocio del prototipo ejecutable de PUKAY.

**Procedimiento realizado:**

1. Preparar el entorno Node.js con Cucumber.
2. Redactar escenarios de aceptación Gherkin.
3. Implementar las definiciones de pasos en JavaScript.
4. Crear servicios ejecutables del prototipo.
5. Incorporar cuatro escenarios de actualización, eliminación y propiedad de actividades.
6. Ejecutar `npm.cmd test` y revisar los resultados.
7. Ejecutar `npm.cmd run lint` para verificar el código con ESLint.

**Resultado:** Se confirmaron **16 escenarios aprobados** en Cucumber. Entre ellos:

- **CP13:** Actualización de una actividad propia.
- **CP14:** Rechazo de actualización de una actividad ajena.
- **CP15:** Eliminación de una actividad propia.
- **CP16:** Rechazo de eliminación de una actividad ajena.

**Defectos identificados durante la implementación:** Definición duplicada de un paso de Cucumber, falta de correspondencia de un paso Gherkin y problema con la disponibilidad/exportación de `eliminarActividadOpenAPI`.

**Corrección aplicada:** Se diferenciaron las definiciones de pasos, se ajustó la correspondencia Gherkin–JavaScript y se corrigió la exportación de la función; después se repitieron las pruebas.

**Comandos de verificación:**

```powershell
npm.cmd test
npm.cmd run lint
```

**Resultados confirmados:** 16 escenarios aprobados; ESLint sin errores.

**Decisión:** Aceptado con modificaciones.

**Evidencias:**

- `tests/features/hu6-gestion-actividades-openapi.feature`
- `tests/steps/gestion-actividades-openapi.steps.js`
- `src/servicios.js`
- `src/servidor.js`
- Salida de Cucumber y ESLint en terminal.

**Limitaciones:** Los cuatro escenarios adicionales comprueban funciones del servicio Node.js directamente; no equivalen a pruebas de integración HTTP ni a pruebas del backend PHP/MySQL.

**Estado:** Prueba ejecutada satisfactoriamente.

## 7. Relación entre artefactos de la cadena CASE

**Escenarios del dossier → Historias de usuario → Criterios Gherkin → Contrato OpenAPI → Documentación y mock → Stubs → Prototipo ejecutable → Pruebas automatizadas → Evidencias**

| Etapa | Artefacto o evidencia | Relación |
|---|---|---|
| Requisitos | `docs/07-historias-y-criterios.md` | Historias HU y criterios CA |
| Contrato | `api/openapi.yaml` | Operaciones que materializan requisitos |
| Validación | `.spectral.yaml` y ejecución de Spectral | Comprobación estática del contrato |
| Implementación de prueba | `src/` | Prototipo Node.js para la cadena CASE |
| Pruebas | `tests/features/` y `tests/steps/` | Escenarios Gherkin y pasos ejecutables |
| Calidad | Cucumber y ESLint | Resultados reproducibles |
| Documentación y mock | Swagger UI / mock, si se generan | Evidencia complementaria pendiente de verificar |

Los identificadores HU, CA, T, E y ADR deben conservarse de manera consistente. La correspondencia exacta entre todos los criterios, rutas y pruebas queda sujeta a revisión final.

## 8. Riesgos y tratamiento

| ID | Riesgo | Tratamiento |
|---|---|---|
| R-01 | Historias generadas por IA no alineadas con los requisitos | Revisión humana frente al dossier |
| R-02 | Diferencias entre contrato OpenAPI y servicios PHP | Validación del contrato y pruebas de integración |
| R-03 | Pruebas que no representan criterios de aceptación | Trazabilidad explícita HU–CA–escenario |
| R-04 | Dependencia excesiva de IA | Verificación de cada resultado antes de aceptarlo |
| R-05 | Documentación desactualizada | Revisiones y control de versiones |
| R-06 | Confundir prototipo Node.js con backend PHP/MySQL | Documentar alcance y límites de cada prueba |
| R-07 | Falta de evidencia reproducible | Conservar comandos, capturas y resultados |
| R-08 | Advertencias no atendidas en el contrato | Revisar salida completa de Spectral y corregir lo necesario |

## 9. Estado de verificación

| Elemento | Estado |
|---|---|
| Mapa de fases, artefactos, responsables y herramientas | Documentado |
| Diez tareas de alto volumen | Documentadas |
| Cálculo y justificación de puntuaciones | Documentados |
| T-01 / P-01: ChatGPT | Prueba documental realizada; trazabilidad funcional pendiente |
| T-02 / P-02: Swagger Editor | Cinco operaciones visibles en la captura |
| Validación Spectral | Ejecutada sin errores de severidad `error` |
| T-03 / P-03: Cucumber | 16 escenarios aprobados |
| ESLint | Ejecutado sin errores |
| Evidencias disponibles | Contrato, configuración, código, pruebas y capturas/salidas observadas |
| Documentación de API, mock y stubs | Verificación de entregables pendiente |
| Matriz comparativa y selección definitiva | Pendiente de revisión en el informe correspondiente |
| Trazabilidad completa HU–CA–pruebas | Pendiente de revisión final |

## 10. Conclusión

El mapa de toolchain de PUKAY identifica ocho fases y diez tareas de alto volumen, priorizadas mediante frecuencia, esfuerzo y riesgo. Las tres tareas con mayor puntuación son la elaboración de historias y criterios (T-01), el mantenimiento del contrato OpenAPI (T-02) y la automatización de pruebas (T-03).

La prueba de ChatGPT produjo una historia y criterios que requirieron revisión y modificación. Swagger Editor permitió visualizar las cinco operaciones de PUKAY y Spectral confirmó que no se encontraron errores de severidad `error` después de configurar su conjunto de reglas. Cucumber ejecutó satisfactoriamente 16 escenarios, mientras que ESLint no reportó errores.

Estas pruebas respaldan el uso de las herramientas evaluadas dentro de la cadena CASE. Para cerrar completamente la entrega todavía es necesario verificar la documentación generada, el mock y los stubs, revisar la trazabilidad y completar la matriz de evaluación y selección. Los resultados del prototipo Node.js no deben presentarse como pruebas del backend PHP/MySQL de producción.
