
# Registro del Uso y Contraste de Inteligencia Artificial

## Introducción

Durante la elaboración del dossier de arquitectura de software de PUKAY, se utilizó inteligencia artificial como herramienta de apoyo para la revisión, organización y mejora de la documentación.

Las propuestas generadas por la IA fueron sometidas a un proceso de revisión y contraste con el informe original del proyecto, las decisiones arquitectónicas y los criterios establecidos por el equipo de desarrollo.

El propósito de este registro es documentar las actividades realizadas con apoyo de IA, las verificaciones correspondientes y las decisiones de aceptación, modificación o rechazo.

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
| **Modelo o versión** | Registrar el modelo utilizado durante la elaboración del trabajo. |
| **Finalidad** | Apoyo en la redacción, revisión crítica, organización documental y generación de borradores de diagramas y decisiones arquitectónicas. |
| **Aplicación** | Partes I, II y III del dossier de arquitectura de software de PUKAY. |
| **Responsabilidad** | El equipo de desarrollo es responsable de revisar, validar y aprobar el contenido incorporado al dossier. |

---

## Conclusión

El uso de inteligencia artificial permitió apoyar la elaboración y revisión de la documentación arquitectónica de PUKAY, especialmente en la identificación de inconsistencias, la organización de información y la formulación de propuestas de mejora.

Las respuestas generadas por la IA no fueron consideradas automáticamente como definitivas. El equipo realizó un proceso de contraste con el informe original y tomó decisiones sobre qué propuestas aceptar, modificar o rechazar.

De esta manera, la inteligencia artificial se utilizó como una herramienta complementaria de apoyo académico, manteniendo la responsabilidad de las decisiones arquitectónicas en el equipo de desarrollo.

---

## Navegación

[Volver al índice general](README.md)

[Consultar Contexto y Drivers](01-contexto-y-drivers/README.md)

[Consultar las vistas C4](02-vistas-c4/c4-nivel1.md)

[Consultar las decisiones arquitectónicas](03-adr/ADR-001-persistencia-mysql.md)




