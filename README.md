
# PUKAY — Documentación de Arquitectura de Software

## Descripción del proyecto

**PUKAY** es una aplicación móvil nativa para Android que permite registrar actividades deportivas, consultar el historial de entrenamientos y dar seguimiento al progreso de metas personales.

El sistema utiliza una arquitectura **cliente-servidor**, compuesta por:

- **Cliente Android:** Desarrollado en Java y XML, organizado mediante MVVM y Repository.
- **API REST:** Implementada en PHP y ejecutada sobre Apache mediante XAMPP.
- **Base de datos:** MySQL, utilizada para almacenar usuarios, actividades deportivas y metas.

Esta documentación presenta el análisis, la representación y la justificación de la arquitectura de PUKAY.

---

## Organización de la documentación

La documentación se divide en tres partes principales.

### Parte I. Levantar los Drivers

Identifica el contexto del sistema, los stakeholders, las restricciones, los drivers arquitectónicos y los escenarios de calidad.

**[Consultar Contexto y Drivers](01-contexto-y-drivers/README.md)**

### Parte II. Representar la Arquitectura

Presenta las vistas arquitectónicas mediante el modelo C4 y los registros de decisiones arquitectónicas (ADR).

**Vistas C4:**

- [C4 Nivel 1 — Contexto del Sistema](02-vistas-c4/c4-nivel1.md)
- [C4 Nivel 2 — Contenedores](02-vistas-c4/c4-nivel2.md)

**Decisiones arquitectónicas:**

- [ADR-001 — Persistencia con MySQL](03-adr/ADR-001-persistencia-mysql.md)
- [ADR-002 — Autenticación con Hash y Token](03-adr/ADR-002-autenticacion-hash-token.md)
- [ADR-003 — Arquitectura Cliente-Servidor y API REST](03-adr/ADR-003-cliente-servidor-api-rest.md)

### Parte III. Decidir el Estilo Arquitectónico

Comprende la comparación de alternativas arquitectónicas, la evaluación de escenarios de calidad y la justificación del estilo seleccionado.

Su documentación se integrará progresivamente en las vistas C4, los ADR y los documentos de evaluación arquitectónica.

---

## Tecnologías utilizadas

| Componente | Tecnología |
|---|---|
| Aplicación móvil | Android Studio |
| Lenguaje del cliente | Java |
| Interfaz gráfica | XML |
| Organización del cliente | MVVM y Repository |
| Backend | PHP |
| Comunicación | API REST y JSON |
| Servidor | Apache (XAMPP) |
| Base de datos | MySQL |
| Acceso a datos del backend | PDO |
| Control de versiones | Git y GitHub |

---

## Objetivo de la documentación

Mantener una descripción clara, organizada y trazable de la arquitectura del sistema PUKAY.

La documentación permite:

1. Identificar las necesidades de los stakeholders.
2. Registrar las restricciones del proyecto.
3. Priorizar los drivers arquitectónicos.
4. Definir escenarios de calidad verificables.
5. Representar la arquitectura mediante diagramas C4.
6. Justificar las decisiones técnicas mediante ADR.
7. Comparar alternativas y documentar el estilo seleccionado.

---

## Trazabilidad arquitectónica

Los elementos del proyecto se identifican mediante códigos que permiten relacionar necesidades, decisiones y evidencias.

| Identificador | Descripción |
|---|---|
| S1–S5 | Stakeholders |
| R1–R6 | Restricciones |
| D1–D5 | Drivers arquitectónicos |
| E1–E6 | Escenarios de calidad |
| A1–A3 | Alternativas arquitectónicas |
| ADR-001 a ADR-003 | Decisiones arquitectónicas |

---

## Proyecto académico

**Proyecto:** PUKAY

**Asignatura:** Automatización de Procesos de Software

**Institución:** Universidad Politécnica Estatal del Carchi

**Año:** 2026

---

*Documentación elaborada como parte del proceso de análisis, representación y evaluación de la arquitectura de software de PUKAY.*
