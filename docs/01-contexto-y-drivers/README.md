
# Parte I — Contexto y Drivers Arquitectónicos

## Introducción

Esta sección documenta el contexto y los principales factores que condicionan la arquitectura del sistema **PUKAY**.

Su propósito es identificar las necesidades de los stakeholders, las restricciones técnicas y organizacionales, los drivers arquitectónicos y los escenarios de calidad que orientan las decisiones de diseño.

La documentación corresponde a la **Parte I: Levantar los Drivers (Sesión 1)** del dossier de Arquitectura de Software.

---

## Índice de contenidos

| N.º | Documento | Contenido | Tablas |
|---|---|---|---|
| 1 | [El Caso PUKAY](01-el-caso-pukay.md) | Descripción del proyecto, problemática, procesos y alcance. | Tabla 1 |
| 2 | [Convención de Identificadores](02-convencion-identificadores.md) | Identificadores arquitectónicos y continuidad del dossier. | Tablas 2 y 3 |
| 3 | [Stakeholders y Concerns](03-stakeholders-concerns.md) | Actores involucrados, intereses y nivel de influencia. | Tabla 4 |
| 4 | [Restricciones y Supuestos](04-restricciones-supuestos.md) | Condiciones técnicas, organizacionales y supuestos del proyecto. | Tabla 5 |
| 5 | [Drivers Arquitectónicos](05-drivers-arquitectonicos.md) | Priorización de los drivers D1 a D5. | Tabla 6 |
| 6 | [Escenarios de Calidad](06-escenarios-calidad.md) | Escenarios E1 a E5 y sus medidas de verificación. | Tablas 7 a 12 |

---

## Objetivo de la Parte I

Identificar los factores que condicionan el diseño arquitectónico de PUKAY y definir escenarios de calidad que permitan evaluar el cumplimiento de sus objetivos.

Este análisis considera:

- Stakeholders y concerns.
- Restricciones técnicas y organizacionales.
- Drivers arquitectónicos.
- Escenarios de calidad.
- Evidencias de verificación.

---

## Stakeholders identificados

| ID | Stakeholder |
|---|---|
| **S1** | Deportista aficionado |
| **S2** | Persona que inicia un hábito deportivo |
| **S3** | Equipo de desarrollo |
| **S4** | Docente evaluador |
| **S5** | Desarrolladores de futuros clientes |

---

## Drivers arquitectónicos

| ID | Driver | Atributo de calidad |
|---|---|---|
| **D1** | Proteger las credenciales del usuario y las comunicaciones. | Seguridad |
| **D2** | Aislar los datos de cada usuario. | Seguridad |
| **D3** | Localizar el impacto de los cambios en una sola capa. | Mantenibilidad |
| **D4** | Permitir que otros clientes reutilicen el backend. | Interoperabilidad |
| **D5** | Registrar actividades en pocos pasos y mostrar el progreso sin cálculos manuales. | Capacidad de interacción |

---

## Escenarios de calidad

Cada driver se relaciona con un escenario verificable.

| Escenario | Driver | Descripción |
|---|---|---|
| **E1** | D1 | Protección de contraseñas almacenadas. |
| **E2** | D2 | Aislamiento de los datos por usuario. |
| **E3** | D3 | Cambio localizado en el acceso remoto. |
| **E4** | D4 | Reutilización del backend por otro cliente. |
| **E5** | D5 | Registro rápido de una actividad. |

Los escenarios incluyen fuente, estímulo, entorno, artefacto, respuesta y medida.

**[Consultar los escenarios de calidad completos](06-escenarios-calidad.md)**

---

## Referencias arquitectónicas

La documentación utiliza como referencia:

- ISO/IEC/IEEE 42010:2022, para la descripción de arquitectura y la identificación de stakeholders y concerns.
- ISO/IEC 25010:2023, para la clasificación de atributos de calidad.
- Bass et al. (2021), para la definición de escenarios de calidad verificables.
- Documentación académica del proyecto PUKAY (Arévalo et al., 2026).

---

## Navegación

**[Volver al índice general de documentación](../README.md)**

**[Consultar las vistas C4](../02-vistas-c4/c4-nivel1.md)**

**[Consultar los registros ADR](../03-adr/ADR-001-persistencia-mysql.md)**

---

*PUKAY — Documentación de Arquitectura de Software, 2026.*
