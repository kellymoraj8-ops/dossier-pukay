
# PUKAY — Documentación de Arquitectura de Software

## Descripción del Proyecto

PUKAY es una aplicación móvil nativa para Android, orientada al registro y seguimiento de actividades deportivas y metas personales.

El sistema permite a los usuarios registrarse, iniciar sesión, seleccionar disciplinas deportivas, registrar entrenamientos, consultar su historial y realizar un seguimiento de sus objetivos.

La aplicación utiliza una arquitectura cliente-servidor, donde el cliente Android se comunica con una API REST desarrollada en PHP, encargada de gestionar las operaciones y el acceso a una base de datos MySQL.

---

## Objetivo de la Documentación

Documentar la arquitectura de software de PUKAY mediante la identificación de stakeholders, restricciones, drivers arquitectónicos, escenarios de calidad, vistas C4 y decisiones arquitectónicas.

La documentación también incluye el análisis de alternativas arquitectónicas y un registro del uso de inteligencia artificial como herramienta de apoyo durante la elaboración del dossier.

---

## Tecnologías Utilizadas

| Componente | Tecnología |
|---|---|
| Aplicación móvil | Android nativo |
| Lenguaje del cliente | Java |
| Interfaces gráficas | XML |
| Organización del cliente | MVVM y Repository |
| Backend | PHP |
| Comunicación | API REST y JSON |
| Servidor de desarrollo | Apache mediante XAMPP |
| Base de datos | MySQL |
| Acceso a datos del servidor | PDO |
| Diagramas arquitectónicos | Mermaid |
| Control de versiones | Git y GitHub |
| Documentación | Markdown |

---

## Organización de la Documentación

### Parte I. Contexto y Drivers Arquitectónicos

Esta sección identifica las necesidades del sistema, los participantes involucrados, las restricciones y los atributos de calidad que orientan las decisiones arquitectónicas.

| Documento | Descripción |
|---|---|
| [Índice de la Parte I](docs/01-contexto-y-drivers/README.md) | Presentación y organización de la primera parte del dossier. |
| [El Caso PUKAY](docs/01-contexto-y-drivers/a-caso-pukay.md) | Contexto, problemática y descripción general del sistema. |
| [Convención de Identificadores](docs/01-contexto-y-drivers/b-convencion-identificadores.md) | Identificadores utilizados para mantener la trazabilidad documental. |
| [Stakeholders y Concerns](docs/01-contexto-y-drivers/c-stakeholders-concerns.md) | Participantes e intereses relacionados con el sistema. |
| [Restricciones y Supuestos](docs/01-contexto-y-drivers/d-restricciones-supuestos.md) | Condiciones técnicas y organizacionales del proyecto. |
| [Drivers Arquitectónicos](docs/01-contexto-y-drivers/e-drivers-arquitectonicos.md) | Factores que orientan las decisiones de arquitectura. |
| [Escenarios de Calidad](docs/01-contexto-y-drivers/f-escenarios-calidad.md) | Escenarios que permiten evaluar los atributos de calidad. |

---

### Parte II. Vistas Arquitectónicas C4

Esta sección representa la arquitectura del sistema mediante diagramas que permiten comprender sus elementos y relaciones.

| Documento | Descripción |
|---|---|
| [C4 Nivel 1 — Contexto](docs/02-vistas-c4/c4-nivel1.md) | Representa PUKAY y su relación con los usuarios y el entorno. |
| [C4 Nivel 2 — Contenedores](docs/02-vistas-c4/c4-nivel2.md) | Representa la aplicación Android, la API REST y la base de datos MySQL. |

Los diagramas permiten visualizar la separación de responsabilidades entre el cliente móvil, el servidor y el almacenamiento de información.

---

### Decisiones Arquitectónicas (ADR)

Los registros de decisiones arquitectónicas documentan las soluciones seleccionadas, sus motivos y sus consecuencias.

Se incluyen las siguientes decisiones:

- **ADR-001:** Persistencia de datos mediante MySQL.
- **ADR-002:** Protección de credenciales y autenticación.
- **ADR-003:** Arquitectura cliente-servidor mediante API REST.

**[Consultar la carpeta de decisiones arquitectónicas](docs/03-adr/)**

---

### Parte III. Evaluación Arquitectónica

Esta sección contempla la comparación de alternativas arquitectónicas para determinar qué estilo responde mejor a los drivers, escenarios de calidad y restricciones del proyecto.

Se consideran tres alternativas:

| ID | Alternativa |
|---|---|
| A1 | Aplicación autónoma con almacenamiento local. |
| A2 | Cliente-servidor con API REST. |
| A3 | Backend como servicio. |

Documentos disponibles:

- [Índice de Evaluación Arquitectónica](docs/05-evaluacion-arquitectonica/README.md)
- [Alternativas Arquitectónicas](docs/05-evaluacion-arquitectonica/01-alternativas-arquitectonicas.md)

**Estado:** En desarrollo. La evaluación ponderada y las actividades complementarias se mantienen pendientes, de acuerdo con el alcance actual del trabajo académico.

---

## Registro del Uso de Inteligencia Artificial

Durante la elaboración del dossier se utilizó ChatGPT como herramienta de apoyo para la revisión, organización y mejora de la documentación arquitectónica.

Las propuestas generadas por la IA fueron analizadas y contrastadas con el informe original del proyecto y las decisiones del equipo de desarrollo.

### Documentación del Registro

**[Consultar el Registro de Uso y Contraste de IA](docs/04-registro-ia.md)**

El documento incluye:

- **Tabla 34. Uso de IA en la Elaboración del Borrador del Dossier:** actividades, verificaciones y decisiones de aceptación, modificación o rechazo.
- **Tabla 35. Registro del Contraste con IA (S1, S2 y S3):** solicitudes realizadas, hallazgos, decisiones del equipo y mecanismos de verificación.
- Identificación de la herramienta utilizada.
- Conclusiones sobre el uso responsable de IA.

La inteligencia artificial se empleó como una herramienta complementaria. La revisión y aprobación de las decisiones arquitectónicas corresponde al equipo de desarrollo.

---

## Trazabilidad Arquitectónica

La documentación utiliza identificadores para mantener la relación entre las necesidades del sistema y las decisiones arquitectónicas.

| Identificador | Significado |
|---|---|
| S1–S5 | Stakeholders |
| R1–R6 | Restricciones |
| D1–D5 | Drivers arquitectónicos |
| E1–E6 | Escenarios de calidad |
| A1–A3 | Alternativas arquitectónicas |
| ADR-001–ADR-003 | Registros de decisiones arquitectónicas |

Estos identificadores facilitan el seguimiento de los elementos definidos en las distintas partes del dossier.

---

## Estado de la Documentación

| Sección | Estado |
|---|---|
| Parte I — Contexto y Drivers | Documentada |
| Parte II — Diagramas C4 | Documentada |
| Decisiones Arquitectónicas (ADR) | Documentación preparada |
| Parte III — Evaluación Arquitectónica | En desarrollo |
| Registro del Uso de IA | Documentación preparada |
| Revisión final de enlaces | Pendiente |

---

## Consideraciones Finales

La documentación arquitectónica de PUKAY permite comprender la estructura general del sistema, las necesidades que motivaron su desarrollo y las decisiones técnicas adoptadas.

La organización mediante archivos Markdown facilita la consulta, actualización y mantenimiento de la información dentro del repositorio GitHub.

El dossier conserva la trazabilidad entre stakeholders, restricciones, drivers, escenarios de calidad y decisiones arquitectónicas, proporcionando una base para la evaluación y evolución futura del sistema.

---

**Proyecto:** PUKAY  
**Área:** Arquitectura de Software  
**Año:** 2026
