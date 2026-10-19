Tabla 34

Uso de IA en la Elaboración del Borrador del Dossier

N.°	Actividad	Verificación realizada	Aceptado, modificado o rechazado

1	Contexto, stakeholders, restricciones y drivers (Parte I)	Cada stakeholder, requisito y restricción se contrastó con las Tablas 1, 2, 3 y 21 del informe.	Aceptado: stakeholders y requisitos. Modificado: se agregó S5 derivado de RNF08. El origen y la negociabilidad de las restricciones son interpretaciones de la IA.

2	Escenarios de calidad E1 a E6	Se comprobó que cada uno tiene las seis partes, una medida numérica y un driver; las evidencias CP se contrastaron con la Tabla 24.	Aceptado: estructura. Las medidas son objetivos propuestos por la IA, no mediciones.

3	Código Mermaid de las vistas C4	Se renderizó con Mermaid CLI y se comprobó que no hubiera relaciones sin etiquetar.	Modificado: la primera versión con sintaxis C4 nativa tenía etiquetas encimadas y se reescribió como flowchart. Rechazado: la tabla sesiones y el nombre PUKAY2 de los diagramas del informe, porque el modelo de datos (Tabla 11) no los incluye.

4	ADR y matriz ponderada	Los totales y la sensibilidad se recalcularon con un script; cada ADR se contrastó con las Tablas 15 a 20 del informe.	Modificado: se agruparon las decisiones DA-01 a DA-06 en tres ADR. Rechazado: la mención de Room y DAO de la Tabla 18, que contradice la persistencia en MySQL. Las calificaciones son criterio de la IA.

5	Formato APA 7 y referencias	Se abrió el enlace de Nygard (2011) y se comprobaron los datos de Brown (s. f.) y de las normas ISO en fuentes públicas.	Aceptado: referencias de la bibliografía del módulo.

Nota. Elaboración propia.



Tabla 35

Registro del Contraste con IA (S1, S2 y S3)

Sesión y uso	Qué se pidió	Hallazgo de la IA	Decisión	Cómo se verificó

S1 · Revisión crítica	Revisión del análisis completo de la Parte I (Pasos 1 a 4)	Identifico que todos los pasos que deberíamos seguir en un supuesto, indicando ciertas cosas que estaban mal dirigidas o encaminadas.	Se acepto las correcciones porque se encontró más lógica de cómo se podría mejorar la propuesta que hicimos.	Leyendo toda la parte de la sesión 1 y dialogando entre el equipo.

S2 · Borrador de diagrama	Código Mermaid de C4 niveles 1 y 2 a partir de la descripción del sistema	Las etiquetas del C4 nativo se encimaban; el informe incluye elementos ausentes del modelo de datos.	Modificar: usar flowchart y quitar PUKAY2 y sesiones.	Renderizado con Mermaid CLI. Y luego renderizado en gittHub



S3 · Abogado del diablo	Objeciones a la decisión A2 con E1 a E6, alternativas, matriz y ADR-003	Menciono que ciertos elementos tenían prioridad alta.	Rechazamos la idea puesto que cada matriz presenta diferentes grados de importancia y dentro de estas los componentes igual.	Por ejemplo en el caso E6, las objeciones sobre E6 se verifican apagando el servidor.

Nota. Elaboración propia a partir del formato de registro del modelo de la cátedra. Debe guardarse en docs/04-registro-ia.md, con herramienta y versión.




