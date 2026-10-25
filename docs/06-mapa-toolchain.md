# 06. Mapa de Toolchain CASE — PUKAY

## 1. Introducción

El presente documento describe el mapa de herramientas CASE (Computer-Aided Software Engineering) del proyecto PUKAY, una aplicación Android orientada al registro de actividades deportivas, seguimiento de metas personales y consulta del progreso del deportista.

El propósito es identificar las actividades del ciclo de vida del software que pueden beneficiarse de la automatización, priorizar las tareas de mayor volumen y seleccionar herramientas que contribuyan a mejorar la eficiencia, trazabilidad y calidad de los artefactos.

La cadena CASE considera la arquitectura definida para PUKAY: aplicación Android desarrollada en Java y XML, comunicación mediante API REST implementada en PHP y persistencia centralizada en MySQL.

## 2. Objetivo del mapa de toolchain

Identificar, organizar y priorizar las tareas del proceso de desarrollo de PUKAY, relacionando cada fase con sus artefactos, responsables y herramientas CASE candidatas.

### 2.1 Objetivos específicos

- Identificar las fases del ciclo de vida del proyecto.
- Establecer los artefactos producidos en cada fase.
- Determinar diez tareas susceptibles de automatización.
- Priorizar las tareas mediante frecuencia, esfuerzo y riesgo.
- Clasificar las herramientas en Upper CASE, Lower CASE o I-CASE.
- Seleccionar las tres tareas con mayor prioridad para realizar pruebas de herramientas.
- Registrar resultados observables y limitaciones de las herramientas evaluadas.

## 3. Proceso de desarrollo y mapa de toolchain

| Fase | Actividades principales | Artefactos | Responsable | Herramienta candidata | Categoría CASE |
|---|---|---|---|---|---|
| 1. Análisis de requisitos | Identificación de necesidades, historias y criterios de aceptación | Historias de usuario, escenarios, criterios Gherkin | Equipo de análisis | ChatGPT | Upper CASE |
| 2. Diseño arquitectónico | Definición de componentes, relaciones y decisiones arquitectónicas | Diagramas C4, ADR | Equipo de arquitectura | Mermaid | Upper CASE |
| 3. Diseño de API | Definición de operaciones, solicitudes y respuestas | Contrato OpenAPI | Equipo backend | Swagger Editor | Upper CASE |
| 4. Implementación | Desarrollo de funcionalidades Android y servicios PHP | Código Java, XML y PHP | Equipo de desarrollo | Android Studio y VS Code | Lower CASE |
| 5. Integración | Comunicación entre Android, API REST y MySQL | Endpoints integrados y evidencias | Equipo de desarrollo | Postman | I-CASE |
| 6. Pruebas | Verificación de funcionalidades y contratos | Casos de prueba, reportes y resultados | Equipo de pruebas | PHPUnit y Spectral | Lower CASE |
| 7. Documentación | Organización y actualización de artefactos | Archivos Markdown y documentación de API | Equipo de documentación | GitHub y Swagger UI | I-CASE |
| 8. Control de versiones | Seguimiento de cambios y versiones | Commits, historial y etiquetas | Equipo de desarrollo | Git y GitHub | I-CASE |

**Nota:** Las categorías corresponden al papel propuesto para cada herramienta dentro de la cadena CASE. Algunas herramientas ofrecen funciones que abarcan más de una categoría.

## 4. Identificación de diez tareas de alto volumen

Para identificar oportunidades de automatización se consideran tareas repetitivas, actividades que requieren esfuerzo manual y operaciones cuyos errores pueden afectar la calidad del sistema.

### 4.1 Criterios de priorización

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

### 4.2 Matriz de priorización

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

### 4.3 Justificación de las puntuaciones

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
| 3 | T-03: Pruebas automatizadas | 100 | PHPUnit |

Estas herramientas se seleccionan como candidatas para su instalación o utilización y evaluación práctica.

ChatGPT se considera la herramienta de IA requerida por la actividad.

## 6. Plan de pruebas de herramientas CASE

### 6.1. Prueba P-01: ChatGPT

**Tarea asociada:** T-01 — Elaborar y actualizar historias de usuario y criterios de aceptación.

**Herramienta:** ChatGPT (GPT-6).

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

La propuesta inicial no contemplaba todos los campos de la actividad deportiva ni la validación de campos obligatorios como un escenario independiente. Además, no especificaba completamente la relación entre el usuario autenticado, la API REST y la persistencia en MySQL.

**Decisión:** Modificado.

Se amplió la historia para incluir los campos utilizados en PUKAY, un tercer criterio de aceptación y seis reglas de negocio propuestas.

**Verificación realizada:**

Se revisó la estructura documental de HU-001 y sus criterios Gherkin. La verificación funcional contra el código de PUKAY y las pruebas automatizadas continúa pendiente.

**Evidencia:**

- Historia HU-001 documentada en `docs/07-historias-y-criterios.md`.
- Criterios de aceptación CA-01, CA-02 y CA-03.
- Registro de las modificaciones realizadas sobre la propuesta inicial.

**Estado:** Prueba documental realizada; validación funcional pendiente.
### 6.2 Prueba P-02: Swagger Editor

**Tarea asociada:** T-02.

**Objetivo:** Comprobar la utilidad de Swagger Editor para elaborar y revisar el contrato OpenAPI de PUKAY.

**Procedimiento propuesto:**

1. Elaborar el archivo `api/openapi.yaml`.
2. Definir al menos cuatro endpoints.
3. Incorporar parámetros, solicitudes, respuestas y esquemas.
4. Revisar el contrato en Swagger Editor.
5. Ejecutar adicionalmente Spectral para comprobar que no existan errores de lint.

**Resultado:** Pendiente de ejecución.

**Evidencia:** Pendiente.

### 6.3 Prueba P-03: PHPUnit

**Tarea asociada:** T-03.

**Objetivo:** Evaluar la ejecución automatizada de pruebas sobre los servicios PHP de PUKAY.

**Procedimiento propuesto:**

1. Preparar un entorno de pruebas PHP.
2. Seleccionar criterios de aceptación verificables.
3. Implementar pruebas derivadas de dichos criterios.
4. Ejecutar PHPUnit.
5. Registrar pruebas aprobadas, fallidas y errores encontrados.

**Resultado:** Pendiente de ejecución.

**Evidencia:** Pendiente.

## 7. Relación entre artefactos de la cadena CASE

La cadena de trabajo propuesta sigue esta secuencia:

**Escenarios del dossier → Historias de usuario → Criterios Gherkin → Contrato OpenAPI → Documentación y mock → Stubs → Implementación PHP → Pruebas automatizadas → Evidencias**

Cada artefacto debe mantener relación con el anterior para facilitar la trazabilidad.

Los identificadores HU, CA, T, E y ADR se utilizarán de acuerdo con las convenciones documentadas en el repositorio.

## 8. Riesgos iniciales

| ID | Riesgo | Tratamiento propuesto |
|---|---|---|
| R-01 | Historias generadas por IA que no coincidan con los requisitos | Revisión contra escenarios del dossier |
| R-02 | Inconsistencias entre OpenAPI y servicios PHP | Validación del contrato y pruebas |
| R-03 | Pruebas que no representen los criterios de aceptación | Vinculación explícita entre CA y pruebas |
| R-04 | Dependencia excesiva de herramientas de IA | Revisión humana y ejecución de verificaciones |
| R-05 | Documentación desactualizada | Control de versiones y revisión de artefactos |

## 9. Estado de verificación

| Elemento | Estado |
|---|---|
| Mapa de fases y herramientas candidatas | Propuesto |
| Diez tareas priorizadas | Propuesto |
| Justificación de puntuaciones | Documentada |
| Prueba práctica de ChatGPT | Pendiente |
| Prueba práctica de Swagger Editor | Pendiente |
| Prueba práctica de PHPUnit | Pendiente |
| Evidencias de ejecución | Pendiente |
| Selección definitiva de herramientas | Pendiente de evaluación |

## 10. Conclusión preliminar

El mapa de toolchain identifica las principales oportunidades de automatización en el desarrollo de PUKAY y establece una priorización inicial de diez tareas.

Las actividades relacionadas con requisitos, contratos de API y pruebas automatizadas presentan los mayores puntajes, por lo que se consideran prioritarias para la evaluación práctica.

La selección definitiva de herramientas dependerá de los resultados observables de las pruebas y de la matriz de evaluación y selección, evitando asumir que una herramienta es adecuada únicamente por sus características declaradas.
