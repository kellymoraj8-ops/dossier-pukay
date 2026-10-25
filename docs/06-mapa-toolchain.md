
# 06. Mapa de Toolchain CASE — PUKAY

## 1. Introducción

El presente documento describe el mapa de herramientas CASE (Computer-Aided Software Engineering) del proyecto PUKAY, una aplicación Android orientada al registro de actividades deportivas, seguimiento de metas personales y consulta del progreso del deportista.

El propósito es identificar las actividades del ciclo de vida del software que pueden beneficiarse de la automatización, priorizar las tareas de mayor volumen y seleccionar herramientas que contribuyan a mejorar la eficiencia, trazabilidad y calidad de los artefactos.

La cadena CASE considera la arquitectura definida para PUKAY: aplicación Android desarrollada en Java y XML, comunicación mediante API REST implementada en PHP y persistencia centralizada en MySQL.

Para las actividades de automatización y pruebas de la Semana 2 también se utiliza un prototipo ejecutable desarrollado en Node.js. Este prototipo permite comprobar criterios de aceptación y operaciones del contrato OpenAPI, pero no sustituye al backend PHP/MySQL de la aplicación.

## 2. Objetivo del mapa de toolchain

Identificar, organizar y priorizar las tareas del proceso de desarrollo de PUKAY, relacionando cada fase con sus artefactos, responsables y herramientas CASE candidatas.

### 2.1. Objetivos específicos

- Identificar las fases del ciclo de vida del proyecto.
- Establecer los artefactos producidos en cada fase.
- Determinar diez tareas susceptibles de automatización.
- Priorizar las tareas mediante frecuencia, esfuerzo y riesgo.
- Clasificar las herramientas en Upper CASE, Lower CASE o I-CASE.
- Seleccionar las tres tareas con mayor prioridad para realizar pruebas de herramientas.
- Registrar resultados observables y limitaciones de las herramientas evaluadas.
- Mantener trazabilidad entre historias, criterios Gherkin, contrato OpenAPI, implementación y pruebas.

## 3. Proceso de desarrollo y mapa de toolchain

| Fase | Actividades principales | Artefactos | Responsable | Herramienta candidata | Categoría CASE |
|---|---|---|---|---|---|
| 1. Análisis de requisitos | Identificación de necesidades, historias y criterios de aceptación | Historias de usuario, escenarios, criterios Gherkin | Equipo de análisis | ChatGPT | Upper CASE |
| 2. Diseño arquitectónico | Definición de componentes, relaciones y decisiones arquitectónicas | Diagramas C4, ADR | Equipo de arquitectura | Mermaid | Upper CASE |
| 3. Diseño de API | Definición de operaciones, solicitudes y respuestas | Contrato OpenAPI | Equipo backend | Swagger Editor | Upper CASE |
| 4. Implementación | Desarrollo de funcionalidades Android, servicios PHP y prototipo de pruebas | Código Java, XML, PHP y JavaScript | Equipo de desarrollo | Android Studio y VS Code | Lower CASE |
| 5. Integración | Comunicación entre componentes y verificación de interfaces | Endpoints integrados y evidencias | Equipo de desarrollo | Postman | I-CASE |
| 6. Pruebas | Verificación de criterios de aceptación, funcionalidades y contratos | Escenarios Gherkin, pruebas automatizadas y reportes | Equipo de pruebas | Cucumber y Spectral | Lower CASE |
| 7. Documentación | Organización y actualización de artefactos | Archivos Markdown y documentación de API | Equipo de documentación | GitHub y Swagger UI | I-CASE |
| 8. Control de versiones | Seguimiento de cambios y versiones | Commits, historial y etiquetas | Equipo de desarrollo | Git y GitHub | I-CASE |

**Nota:** Las categorías corresponden al papel propuesto para cada herramienta dentro de la cadena CASE. Algunas herramientas ofrecen funciones que abarcan más de una categoría.

La clasificación de GitHub, Postman y Swagger UI como herramientas de integración CASE es funcional dentro de esta propuesta y no implica que cada una constituya por sí sola una plataforma I-CASE completa.

## 4. Identificación de diez tareas de alto volumen

Para identificar oportunidades de automatización se consideran tareas repetitivas, actividades que requieren esfuerzo manual y operaciones cuyos errores pueden afectar la calidad del sistema.

### 4.1. Criterios de priorización

Se utiliza la siguiente fórmula:

**Puntaje = Frecuencia × Esfuerzo × Riesgo**

Cada factor se valora en una escala de 1 a 5.

| Valor | Frecuencia | Esfuerzo | Riesgo |
|---|---|---|---|
| 1 | Muy baja | Muy bajo | Muy bajo |
| 2 | Baja | Bajo | Bajo |
| 3 | Media | Medio | Medio |
| 4 | Alta | Alto | Alto |
| 5 | Muy alta | Muy alto | Muy alto |

El puntaje mínimo posible es 1 y el máximo es 125.

Las valoraciones siguientes son estimaciones iniciales del equipo para orientar la selección de herramientas. Deben contrastarse con la experiencia y las pruebas realizadas durante el proyecto.

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

**T-01. Historias de usuario y criterios de aceptación (125 puntos).**

La frecuencia es muy alta porque las funcionalidades requieren criterios verificables. El esfuerzo es elevado al redactar y revisar escenarios. El riesgo es muy alto porque una interpretación incorrecta de los requisitos puede trasladarse al diseño, implementación y pruebas.

**T-02. Contrato OpenAPI (100 puntos).**

La frecuencia es muy alta por la necesidad de mantener sincronizadas las operaciones de la API. El esfuerzo es elevado debido a la definición de rutas, parámetros, esquemas y respuestas. El riesgo es alto porque los errores contractuales afectan la integración entre Android y PHP.

**T-03. Pruebas automatizadas (100 puntos).**

La frecuencia es muy alta porque las pruebas deben repetirse después de cambios funcionales. El esfuerzo es alto por la preparación de casos y datos de prueba. El riesgo es muy alto porque los defectos no detectados pueden afectar la autenticación, el registro de actividades y la integridad de los datos.

**T-04. Documentación de endpoints (64 puntos).**

La documentación necesita actualizarse ante cambios en los servicios. El esfuerzo y el riesgo son altos porque las inconsistencias dificultan el uso y mantenimiento de la API.

**T-05. Validación de JSON (64 puntos).**

Las solicitudes y respuestas deben verificarse continuamente. Los errores en formatos, campos y tipos de datos pueden provocar fallos de comunicación.

**T-06. Implementación CRUD (48 puntos).**

Las operaciones de registro, consulta, actualización y eliminación requieren trabajo de desarrollo y validaciones para conservar la integridad de la información.

**T-07. Actualización de diagramas C4 (36 puntos).**

Los diagramas deben reflejar cambios arquitectónicos. La frecuencia es media, pero su actualización exige revisar componentes y relaciones.

**T-08. Registro de uso de IA (36 puntos).**

La utilización de IA requiere documentar las solicitudes, resultados, defectos y decisiones. El riesgo es alto cuando los resultados generados se aceptan sin verificación.

**T-09. Trazabilidad entre requisitos y pruebas (27 puntos).**

La trazabilidad permite comprobar que los requisitos poseen criterios y pruebas correspondientes. Su mantenimiento implica revisar identificadores y relaciones.

**T-10. Documentación y versionamiento (24 puntos).**

El repositorio requiere actualizaciones frecuentes. El esfuerzo es relativamente bajo por el apoyo de Git y GitHub, aunque los errores de organización pueden afectar la entrega.

## 5. Selección de las tres tareas prioritarias

De acuerdo con la matriz, las tres tareas con mayor puntaje son:

| Prioridad | Tarea | Puntaje | Herramienta candidata |
|---|---|---:|---|
| 1 | T-01: Historias y criterios | 125 | ChatGPT |
| 2 | T-02: Contrato OpenAPI | 100 | Swagger Editor |
| 3 | T-03: Pruebas automatizadas | 100 | Cucumber |

Estas herramientas se seleccionan como candidatas para su utilización y evaluación práctica.

ChatGPT se considera la herramienta de inteligencia artificial requerida por la actividad.

Cucumber sustituye a PHPUnit en la prueba P-03 porque la evidencia ejecutable disponible corresponde a escenarios Gherkin implementados en JavaScript.

Esta sustitución no significa que se hayan realizado pruebas unitarias del backend PHP mediante PHPUnit.

## 6. Pruebas de herramientas CASE

### 6.1. Prueba P-01: ChatGPT

**Tarea asociada:** T-01 — Elaborar y actualizar historias de usuario y criterios de aceptación.

**Herramienta:** ChatGPT (GPT-6).

**Categoría:** Upper CASE.

**Objetivo:** Evaluar el uso de inteligencia artificial como apoyo para generar historias de usuario y criterios de aceptación en formato Gherkin, utilizando como referencia el proyecto PUKAY.

**Prompt utilizado:**

> Genera una historia de usuario para PUKAY, una aplicación Android de seguimiento deportivo, sobre el registro de actividades. Incluye criterios de aceptación en formato Gherkin para un registro exitoso y para el rechazo de datos inválidos.

**Procedimiento realizado:**

1. Se seleccionó la funcionalidad de registro de actividades deportivas de PUKAY.
2. Se solicitó a ChatGPT generar una historia de usuario y criterios de aceptación.
3. Se revisó la propuesta generada.
4. Se desarrolló la historia HU-001 incorporando tres criterios de aceptación.
5. Se documentó la historia en `docs/07-historias-y-criterios.md`.

**Resultado obtenido:**

Se elaboró la historia HU-001: Registro de Actividades Deportivas, con los siguientes criterios:

- CA-01: Registro exitoso de una actividad.
- CA-02: Rechazo de datos inválidos.
- CA-03: Validación de campos obligatorios.

**Defectos identificados:**

La propuesta inicial no contemplaba todos los campos de la actividad deportiva ni la validación de campos obligatorios como un escenario independiente.

Además, no especificaba completamente la relación entre el usuario autenticado, la API REST y la persistencia en MySQL.

**Decisión:** Modificado.

Se amplió la historia para incluir los campos utilizados en PUKAY, un tercer criterio de aceptación y seis reglas de negocio propuestas.

**Verificación realizada:**

Se revisó la estructura documental de HU-001 y sus criterios Gherkin.

Posteriormente, el proyecto incorporó pruebas automatizadas con Cucumber. Sin embargo, todavía debe comprobarse la correspondencia exacta entre los criterios CA-01, CA-02 y CA-03 y los escenarios ejecutados.

**Evidencia:**

- Historia HU-001 documentada en `docs/07-historias-y-criterios.md`.
- Criterios de aceptación CA-01, CA-02 y CA-03.
- Registro de las modificaciones realizadas sobre la propuesta inicial.
- Archivo de escenarios Gherkin del proyecto.

**Estado:** Prueba documental realizada; verificación de trazabilidad funcional pendiente.

### 6.2. Prueba P-02: Swagger Editor

**Tarea asociada:** T-02 — Diseñar y mantener el contrato OpenAPI.

**Herramienta:** Swagger Editor.

**Categoría:** Upper CASE.

**Objetivo:** Comprobar la utilidad de Swagger Editor para elaborar y revisar el contrato OpenAPI de PUKAY.

**Contrato disponible:**

El proyecto cuenta con el archivo `api/openapi.yaml`, que define cinco operaciones:

1. `POST /login.php`
2. `POST /registrar_actividad.php`
3. `GET /listar_actividades.php`
4. `POST /actualizar_actividad.php`
5. `POST /eliminar_actividad.php`

Estas operaciones representan el inicio de sesión y la gestión de actividades deportivas.

**Procedimiento de verificación:**

1. Abrir Swagger Editor.
2. Cargar el archivo `api/openapi.yaml`.
3. Comprobar que se reconocen las cinco operaciones.
4. Revisar los parámetros, esquemas de solicitud y respuestas.
5. Identificar advertencias o errores de validación.
6. Ejecutar Spectral para verificar el contrato.
7. Registrar los resultados observables y las correcciones necesarias.

**Resultado:**

El contrato OpenAPI está desarrollado y se han implementado las cinco operaciones en el prototipo Node.js.

No se dispone todavía de evidencia confirmada de la validación mediante Swagger Editor ni de una ejecución de Spectral sin errores.

**Defectos identificados:**

Pendientes de documentar después de ejecutar la prueba.

**Decisión:** Pendiente de verificación práctica.

**Evidencia disponible:**

- `api/openapi.yaml`
- `src/servidor.js`
- `src/servicios.js`

**Evidencia pendiente:**

- Resultado de Swagger Editor.
- Resultado de Spectral.
- Registro de advertencias o correcciones, si las hubiera.

**Estado:** Contrato implementado; prueba de herramienta pendiente de confirmar.

### 6.3. Prueba P-03: Cucumber

**Tarea asociada:** T-03 — Ejecutar y verificar pruebas automatizadas de la API.

**Herramienta:** Cucumber para JavaScript.

**Categoría:** Lower CASE.

**Objetivo:** Evaluar la automatización de pruebas de aceptación mediante escenarios Gherkin, verificando las funcionalidades y reglas de negocio del prototipo de PUKAY.

**Procedimiento realizado:**

1. Se preparó el entorno de pruebas con Node.js y Cucumber.
2. Se definieron escenarios de aceptación mediante Gherkin.
3. Se implementaron las definiciones de pasos en JavaScript.
4. Se desarrolló un esqueleto ejecutable de servicios para comprobar el comportamiento esperado.
5. Se incorporaron cuatro escenarios adicionales para verificar la actualización y eliminación de actividades.
6. Se ejecutaron las pruebas mediante el comando `npm.cmd test`.
7. Se ejecutó ESLint mediante `npm.cmd run lint`.

**Resultado obtenido:**

Se ejecutaron satisfactoriamente 16 escenarios de Cucumber, incluidos cuatro escenarios relacionados con la actualización y eliminación de actividades deportivas.

Los escenarios adicionales verificaron:

- CP13: Actualización correcta de una actividad propia.
- CP14: Rechazo de actualización de una actividad ajena.
- CP15: Eliminación correcta de una actividad propia.
- CP16: Rechazo de eliminación de una actividad ajena.

La ejecución confirmó que las funciones del prototipo permiten modificar y eliminar actividades propias, y rechazan estas operaciones cuando la actividad pertenece a otro usuario.

**Defectos identificados:**

Durante la incorporación de los escenarios se identificaron:

1. Una definición duplicada de un paso de Cucumber, que producía un error de coincidencia múltiple.
2. Una función de eliminación que no estaba disponible correctamente mediante las exportaciones del módulo de servicios.
3. Un paso Gherkin sin definición correspondiente.

**Tratamiento aplicado:**

- Se sustituyó el paso duplicado por una definición específica para las respuestas OpenAPI.
- Se verificó la declaración y exportación de `eliminarActividadOpenAPI`.
- Se corrigió la correspondencia entre los escenarios Gherkin y sus definiciones JavaScript.
- Se repitió la ejecución de las pruebas.

**Decisión:** Aceptado con modificaciones.

**Verificación realizada:**

- Comando: `npm.cmd test`.
- Resultado confirmado: 16 escenarios aprobados.
- Comando: `npm.cmd run lint`.
- Resultado confirmado: sin errores.

**Evidencias:**

- `tests/features/hu6-gestion-actividades-openapi.feature`
- `tests/steps/gestion-actividades-openapi.steps.js`
- `src/servicios.js`
- `src/servidor.js`
- Salida de la ejecución de Cucumber.
- Salida de ESLint.

**Limitaciones:**

Las pruebas incorporadas verifican directamente las funciones de servicio del prototipo Node.js.

No sustituyen las pruebas de integración HTTP ni las pruebas del backend PHP/MySQL de la aplicación Android.

**Estado:** Prueba ejecutada satisfactoriamente.

## 7. Relación entre artefactos de la cadena CASE

La cadena de trabajo propuesta sigue esta secuencia:

**Escenarios del dossier → Historias de usuario → Criterios Gherkin → Contrato OpenAPI → Documentación y mock → Stubs → Prototipo ejecutable → Pruebas automatizadas → Evidencias**

En el proyecto PUKAY, esta cadena relaciona:

- Historias de usuario y criterios de aceptación.
- Contrato `api/openapi.yaml`.
- Documentación técnica de la API.
- Mock y stubs previstos por la actividad.
- Prototipo ejecutable en `src/`.
- Escenarios Gherkin y definiciones de pasos en `tests/`.
- Resultados de Cucumber y ESLint.

El prototipo Node.js constituye una evidencia de automatización de la cadena CASE. La implementación de la aplicación Android y su backend PHP/MySQL mantiene su arquitectura propia.

Cada artefacto debe mantener relación con el anterior para facilitar la trazabilidad.

Los identificadores HU, CA, T, E y ADR se utilizarán de acuerdo con las convenciones documentadas en el repositorio.

La correspondencia completa entre criterios, operaciones y pruebas debe verificarse durante la revisión final.

## 8. Riesgos iniciales

| ID | Riesgo | Tratamiento propuesto |
|---|---|---|
| R-01 | Historias generadas por IA que no coincidan con los requisitos | Revisión contra escenarios del dossier |
| R-02 | Inconsistencias entre OpenAPI y servicios PHP | Validación del contrato y pruebas |
| R-03 | Pruebas que no representen los criterios de aceptación | Vinculación explícita entre CA y pruebas |
| R-04 | Dependencia excesiva de herramientas de IA | Revisión humana y ejecución de verificaciones |
| R-05 | Documentación desactualizada | Control de versiones y revisión de artefactos |
| R-06 | Diferencias entre el prototipo Node.js y el backend PHP/MySQL | Mantener separado el alcance de las pruebas y verificar los contratos |
| R-07 | Falta de evidencia de ejecución de herramientas CASE | Registrar comandos, resultados y archivos generados |
| R-08 | Aceptación de un contrato OpenAPI sin validación suficiente | Ejecutar Swagger Editor y Spectral antes de cerrar la entrega |

## 9. Estado de verificación

| Elemento | Estado |
|---|---|
| Mapa de fases y herramientas candidatas | Documentado |
| Diez tareas priorizadas | Documentado |
| Justificación de puntuaciones | Documentada |
| Prueba práctica de ChatGPT | Realizada; verificación funcional parcial |
| Prueba práctica de Swagger Editor | Pendiente de confirmar |
| Prueba práctica de Cucumber | Ejecutada: 16 escenarios aprobados |
| Evidencias de ejecución | Cucumber y ESLint confirmados; restantes pendientes |
| Selección definitiva de herramientas | Pendiente de matriz comparativa |
| Verificación de trazabilidad HU–CA–pruebas | Pendiente de revisión completa |
| Validación Spectral | Pendiente de confirmar |

## 10. Conclusión

El mapa de toolchain identifica las principales oportunidades de automatización en el desarrollo de PUKAY y establece una priorización de diez tareas mediante frecuencia, esfuerzo y riesgo.

Las actividades relacionadas con requisitos, contratos de API y pruebas automatizadas presentan los mayores puntajes, por lo que se consideran prioritarias para la evaluación práctica.

La utilización de ChatGPT permitió apoyar la elaboración de historias y criterios de aceptación, mientras que Cucumber permitió ejecutar pruebas automatizadas derivadas de escenarios Gherkin.

La ejecución confirmada de 16 escenarios aprobados demuestra el funcionamiento de las pruebas de aceptación implementadas en el prototipo Node.js.

La evaluación de Swagger Editor y la validación mediante Spectral todavía requieren evidencia de ejecución para completar la verificación de las tres herramientas prioritarias.

La selección definitiva dependerá de los resultados observables y de la matriz de evaluación y selección, evitando asumir que una herramienta es adecuada únicamente por sus características declaradas.
