
# Registro del Uso y Contraste de Inteligencia Artificial

## Introducción

Durante la elaboración del dossier de arquitectura de software y de la cadena CASE de PUKAY, se utilizó inteligencia artificial como herramienta de apoyo para la revisión, organización y mejora de la documentación, así como para la elaboración y corrección de determinados artefactos técnicos.

Las propuestas generadas por la IA fueron sometidas a un proceso de revisión y contraste con el informe original del proyecto, las decisiones arquitectónicas, los criterios establecidos por el equipo de desarrollo y los resultados de las verificaciones realizadas.

El propósito de este registro es documentar las actividades realizadas con apoyo de IA, las herramientas utilizadas, las salidas obtenidas, los defectos identificados, las verificaciones correspondientes y las decisiones de aceptación, modificación o rechazo.

La responsabilidad de aprobar e incorporar los resultados corresponde al equipo de desarrollo de PUKAY.

---

## Tabla 34. Uso de IA en la Elaboración del Borrador del Dossier

| N.° | Actividad | Verificación realizada | Aceptado, modificado o rechazado |
|---|---|---|---|
| 1 | **Contexto, stakeholders, restricciones y drivers (Parte I)** | Se contrastaron los stakeholders, requisitos y restricciones propuestos con las Tablas 1, 2, 3 y 21 del informe original, verificando su relación con las necesidades del sistema. | **Aceptado:** identificación de stakeholders y requisitos. **Modificado:** incorporación del stakeholder S5, derivado de RNF08. Se revisaron las interpretaciones propuestas por la IA sobre el origen y la negociabilidad de las restricciones. |
| 2 | **Escenarios de calidad E1 a E6** | Se revisó que cada escenario incluyera los seis elementos correspondientes, una medida verificable y su relación con un driver arquitectónico. Las evidencias CP se contrastaron con la Tabla 24 del informe. | **Aceptado:** estructura de los escenarios. **Modificado:** formulación de medidas cuantitativas como objetivos de evaluación. Estas medidas fueron propuestas con apoyo de IA y no representan resultados obtenidos mediante pruebas. |
| 3 | **Código Mermaid de las vistas C4** | Se comprobó la representación de los diagramas mediante Mermaid CLI, revisando la legibilidad, las relaciones y las etiquetas de conexión. | **Modificado:** la representación inicial con sintaxis C4 nativa se sustituyó por diagramas flowchart debido a problemas de superposición de etiquetas. **Rechazado:** inclusión de elementos como la tabla de sesiones y la denominación PUKAY2, por no corresponder con el modelo de datos utilizado como referencia. |
| 4 | **ADR y matriz de evaluación ponderada** | Se revisaron los cálculos de la matriz y su análisis de sensibilidad mediante un script. Las decisiones arquitectónicas se contrastaron con las Tablas 15 a 20 del informe. | **Modificado:** las decisiones DA-01 a DA-06 se organizaron en tres registros ADR. **Rechazado:** referencias a Room y DAO de la Tabla 18, por su inconsistencia con la arquitectura basada en MySQL. Las calificaciones de la matriz se consideran valoraciones propuestas con apoyo de IA. |
| 5 | **Formato APA 7 y referencias bibliográficas** | Se revisaron las referencias utilizadas, incluyendo el enlace de Nygard (2011), los datos bibliográficos de Brown (s. f.) y las normas ISO citadas en el dossier. | **Aceptado:** organización y presentación de las referencias bibliográficas utilizadas en el módulo, después de su revisión. |

*Nota. Elaboración propia.*

---

## Tabla 35. Registro del Contraste con IA (S1, S2 y S3)

| Sesión y uso | Qué se pidió | Hallazgo de la IA | Decisión | Cómo se verificó |
|---|---|---|---|---|
| **S1 · Revisión crítica** | Analizar el contenido de la Parte I (Pasos 1 a 4), identificando posibles inconsistencias en el contexto, stakeholders, restricciones, drivers y escenarios de calidad. | La IA identificó aspectos que requerían mayor claridad y coherencia, especialmente en la relación entre las necesidades del sistema, las restricciones y los drivers arquitectónicos. También propuso ajustes en la organización de algunos elementos. | **Aceptar y modificar:** el equipo consideró pertinentes varias observaciones y realizó ajustes para mejorar la claridad, coherencia y justificación de la propuesta arquitectónica. | Se realizó una revisión conjunta de la Parte I, contrastando las sugerencias con el informe original y discutiendo su pertinencia entre los integrantes del equipo. |
| **S2 · Borrador de diagramas** | Generar código Mermaid para representar las vistas C4 de niveles 1 y 2 a partir de la descripción de la arquitectura de PUKAY. | Se identificaron problemas de superposición de etiquetas en la representación C4 nativa, además de elementos que no correspondían con el modelo de datos utilizado como referencia. | **Modificar y rechazar:** se reemplazó la representación inicial por diagramas flowchart para mejorar su legibilidad y se descartaron elementos no pertinentes, como la denominación PUKAY2 y la tabla de sesiones. | Se revisó la representación gráfica mediante Mermaid CLI y posteriormente se comprobó su visualización en GitHub. |
| **S3 · Abogado del diablo** | Solicitar una evaluación crítica de la alternativa A2, considerando los escenarios E1 a E6, las alternativas arquitectónicas, la matriz ponderada y el ADR-003. | La IA planteó objeciones relacionadas con la prioridad asignada a determinados criterios y los posibles riesgos de la arquitectura cliente-servidor, especialmente ante la falta de disponibilidad del servidor. | **Rechazar parcialmente:** el equipo decidió mantener la ponderación establecida en la matriz, considerando que cada criterio posee un nivel de importancia definido según las necesidades y restricciones del proyecto. Sin embargo, se conservaron las observaciones como elementos de análisis. | Se contrastaron las objeciones con los criterios y pesos establecidos en la matriz. Para el escenario E6, se consideró la comprobación del comportamiento de la aplicación cuando el servidor deja de responder. |

*Nota. Elaboración propia a partir del formato de registro del modelo de la cátedra.*

---

## Herramienta de Inteligencia Artificial Utilizada

| Elemento | Descripción |
|---|---|
| **Herramienta** | ChatGPT, desarrollado por OpenAI. |
| **Modelo o versión** | GPT-6 para las actividades documentadas de la Semana 2. Las versiones utilizadas en las sesiones anteriores del dossier no están documentadas. |
| **Finalidad** | Apoyo en la redacción, revisión crítica, organización documental, elaboración de criterios Gherkin, corrección de artefactos técnicos y generación de borradores de diagramas y decisiones arquitectónicas. |
| **Aplicación** | Partes I, II y III del dossier de arquitectura de software y artefactos de la cadena CASE de PUKAY. |
| **Responsabilidad** | El equipo de desarrollo es responsable de revisar, validar y aprobar el contenido incorporado al proyecto. |
| **Control de resultados** | Revisión documental, contraste con requisitos y ejecución de herramientas de verificación cuando corresponde. |

---

## Registro adicional de IA — Actividad Autónoma Semana 2

Esta sección documenta el uso de inteligencia artificial durante la elaboración y verificación de los artefactos correspondientes a la cadena CASE.

Los resultados se contrastaron mediante revisión documental, validación del contrato OpenAPI y ejecución de pruebas automatizadas.

### Tabla 36. Uso y Verificación de IA en la Cadena CASE

| ID | Herramienta y versión | Prompt resumido | Salida obtenida | Defectos o limitaciones | Decisión | Verificación |
|---|---|---|---|---|---|---|
| IA-S2-01 | ChatGPT (GPT-6) | Generar una historia de usuario para el registro de actividades deportivas de PUKAY, con criterios Gherkin para registro exitoso y datos inválidos. | Propuesta de historia de usuario y criterios de aceptación. | No contemplaba todos los campos, validaciones obligatorias ni la relación completa con la arquitectura. | **Modificado** | Revisión de HU-001 y CA-01 a CA-03 en `docs/07-historias-y-criterios.md`. Correspondencia funcional completa pendiente de comprobar. |
| IA-S2-02 | ChatGPT (GPT-6) | Apoyar la revisión y corrección de escenarios Gherkin y definiciones de pasos para operaciones de actualización y eliminación de actividades. | Propuestas de ajustes para escenarios y funciones del prototipo Node.js. | Se identificaron definiciones duplicadas y problemas de correspondencia entre pasos y funciones. | **Modificado** | Ejecución de `npm.cmd test`: 16 escenarios aprobados. |
| IA-S2-03 | ChatGPT (GPT-6) | Revisar el mapa de toolchain y documentar las pruebas de ChatGPT, Swagger Editor y Cucumber. | Actualización de `docs/06-mapa-toolchain.md`. | Fue necesario distinguir las pruebas realmente ejecutadas de las que estaban pendientes. | **Modificado** | Revisión del mapa; comprobación de cinco operaciones en Swagger Editor y ejecución de Cucumber. |
| IA-S2-04 | ChatGPT (GPT-6) | Identificar y corregir el problema de configuración presentado durante la validación del contrato OpenAPI con Spectral. | Propuesta de configuración de `.spectral.yaml`. | La primera ejecución de Spectral no encontró un conjunto de reglas. | **Aceptado después de verificar** | Ejecución de Spectral con resultado `No results with a severity of 'error' found!`. |
| IA-S2-05 | ChatGPT (GPT-6) | Elaborar una matriz de evaluación y selección de herramientas CASE con criterios ponderados y resultados observables. | Matriz de ChatGPT, Swagger Editor y Cucumber. | Se detectó una inconsistencia inicial en el cálculo ponderado de Cucumber. | **Modificado** | Revisión aritmética: ChatGPT 72 %, Swagger Editor 90 % y Cucumber 92 %. |

*Nota. Los resultados de ejecución corresponden a verificaciones del prototipo Node.js y del contrato OpenAPI. No deben interpretarse como pruebas completas del backend PHP/MySQL.*

### Tabla 37. Evidencias de Verificación de Artefactos

| Artefacto | Método de verificación | Resultado |
|---|---|---|
| `docs/07-historias-y-criterios.md` | Revisión documental de historias y criterios Gherkin | HU-001 y criterios documentados; trazabilidad completa pendiente |
| `api/openapi.yaml` | Visualización mediante Swagger Editor | Cinco operaciones visibles |
| `api/openapi.yaml` | Validación mediante Spectral | Sin errores de severidad `error` |
| `src/` y `tests/` | Ejecución de Cucumber | 16 escenarios aprobados |
| Código JavaScript del prototipo | Ejecución de ESLint | Sin errores |
| `docs/06-mapa-toolchain.md` | Contraste con los requisitos de la rúbrica | Mapa, priorización y tres pruebas documentadas |
| `docs/09-matriz-evaluacion-case.md` | Comprobación de pesos y operaciones aritméticas | Pesos: 100 %; resultados: 72 %, 90 % y 92 % |

### Evaluación crítica de los resultados generados

El uso de ChatGPT contribuyó a organizar y corregir los artefactos de la cadena CASE de PUKAY. Sin embargo, sus propuestas no fueron aceptadas automáticamente.

Durante el trabajo se identificaron omisiones en criterios de aceptación, problemas de correspondencia entre pasos Gherkin y funciones, y una inconsistencia en el cálculo de la matriz de evaluación.

Estas situaciones evidencian la necesidad de aplicar revisión humana y comprobaciones independientes.

Las verificaciones con Spectral, Cucumber y ESLint proporcionaron evidencia técnica sobre los artefactos evaluados, dentro del alcance específico de cada herramienta.

El equipo mantiene la responsabilidad de aceptar, modificar o rechazar las propuestas generadas por inteligencia artificial.

---

## Conclusión

El uso de inteligencia artificial permitió apoyar la elaboración y revisión de la documentación arquitectónica y de los artefactos de la cadena CASE de PUKAY.

En el dossier arquitectónico, la IA contribuyó a identificar inconsistencias, organizar información y formular propuestas de mejora.

Durante la Semana 2, también se utilizó como apoyo para elaborar criterios de aceptación, corregir artefactos de pruebas, actualizar el mapa de toolchain y construir la matriz de evaluación y selección de herramientas CASE.

Las respuestas generadas por la IA no fueron consideradas automáticamente definitivas. El equipo contrastó las propuestas con el informe original, los requisitos del proyecto y los resultados de las verificaciones disponibles.

La ejecución de Cucumber permitió comprobar 16 escenarios de aceptación del prototipo Node.js. Spectral permitió validar el contrato OpenAPI sin errores de severidad `error`, mientras que ESLint permitió revisar el código JavaScript sin errores.

Estas verificaciones aportan evidencia de calidad dentro de su alcance, pero no sustituyen las pruebas completas de integración HTTP ni las verificaciones del backend PHP/MySQL de PUKAY.

De esta manera, la inteligencia artificial se utilizó como herramienta complementaria de apoyo académico y técnico, manteniendo la responsabilidad de las decisiones arquitectónicas y de desarrollo en el equipo.

---

## Navegación

[Volver al índice general](README.md)

[Consultar Contexto y Drivers](01-contexto-y-drivers/README.md)

[Consultar las vistas C4](02-vistas-c4/c4-nivel1.md)

[Consultar las decisiones arquitectónicas](03-adr/ADR-001-persistencia-mysql.md)

[Consultar el mapa de toolchain CASE](06-mapa-toolchain.md)

[Consultar historias y criterios de aceptación](07-historias-y-criterios.md)

[Consultar la matriz de evaluación CASE](09-matriz-evaluacion-case.md)
