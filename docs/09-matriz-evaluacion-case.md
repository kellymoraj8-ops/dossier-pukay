
# 09. Matriz de evaluación y selección de herramientas CASE — PUKAY

## 1. Introducción

El presente documento desarrolla la matriz de evaluación y selección de herramientas CASE para PUKAY, una aplicación Android orientada al registro de actividades deportivas, seguimiento de metas personales y consulta del progreso del deportista.

La evaluación considera las tres tareas de mayor prioridad identificadas en `docs/06-mapa-toolchain.md` y las herramientas utilizadas para apoyarlas: ChatGPT, Swagger Editor y Cucumber.

La selección se fundamenta en criterios ponderados, resultados observables, limitaciones y riesgos identificados durante las pruebas.

## 2. Objetivo

Evaluar y seleccionar herramientas CASE para automatizar actividades prioritarias del desarrollo de PUKAY, considerando su adecuación funcional, facilidad de uso, integración, capacidad de verificación y control de riesgos.

### 2.1. Objetivos específicos

- Comparar al menos tres herramientas, incluyendo una de inteligencia artificial.
- Establecer criterios de evaluación cuyos pesos sumen 100 %.
- Aplicar una escala de calificación uniforme.
- Justificar las calificaciones mediante resultados observables.
- Identificar defectos, limitaciones y riesgos.
- Seleccionar las herramientas apropiadas para la cadena CASE de PUKAY.

## 3. Herramientas evaluadas

| ID | Herramienta | Tarea prioritaria | Categoría CASE | Uso en PUKAY |
|---|---|---|---|---|
| H-01 | ChatGPT | T-01: Historias y criterios | Upper CASE | Apoyo en la redacción de historias y criterios Gherkin |
| H-02 | Swagger Editor | T-02: Contrato OpenAPI | Upper CASE | Visualización y revisión del contrato de la API |
| H-03 | Cucumber | T-03: Pruebas automatizadas | Lower CASE | Ejecución de escenarios de aceptación |

Las herramientas cumplen funciones diferentes y complementarias. La matriz compara su desempeño en la tarea asignada, no su capacidad para sustituirse entre sí.

## 4. Criterios de evaluación

| ID | Criterio | Descripción | Peso |
|---|---|---|---:|
| C-01 | Adecuación funcional | Capacidad para apoyar la tarea prioritaria asignada | 30 % |
| C-02 | Facilidad de uso | Facilidad de aprendizaje, configuración y utilización | 15 % |
| C-03 | Integración con la cadena CASE | Relación de los resultados con otros artefactos del proyecto | 20 % |
| C-04 | Verificación de resultados | Posibilidad de comprobar los resultados mediante revisión o ejecución | 25 % |
| C-05 | Riesgo y control | Facilidad para identificar, corregir y controlar defectos | 10 % |
| | **Total** | | **100 %** |

### 4.1. Escala de calificación

| Valor | Interpretación |
|---|---|
| 1 | Muy deficiente |
| 2 | Deficiente |
| 3 | Aceptable |
| 4 | Bueno |
| 5 | Muy bueno |

### 4.2. Fórmula de evaluación

Se utiliza una suma ponderada:

**Puntaje final = Σ (calificación × peso / 100)**

La calificación máxima posible es 5 puntos.

Para expresar el resultado sobre 100:

**Resultado porcentual = (puntaje final / 5) × 100**

Las calificaciones son valoraciones técnicas del uso observado en PUKAY, no certificaciones independientes de calidad.

## 5. Matriz comparativa de evaluación

| Criterio | Peso | ChatGPT | Swagger Editor | Cucumber |
|---|---:|---:|---:|---:|
| C-01: Adecuación funcional | 30 % | 4 | 5 | 5 |
| C-02: Facilidad de uso | 15 % | 5 | 4 | 3 |
| C-03: Integración con la cadena CASE | 20 % | 3 | 5 | 5 |
| C-04: Verificación de resultados | 25 % | 3 | 4 | 5 |
| C-05: Riesgo y control | 10 % | 3 | 4 | 4 |
| **Puntaje ponderado / 5** | **100 %** | **3,60** | **4,50** | **4,60** |
| **Resultado porcentual** | | **72 %** | **90 %** | **92 %** |

### 5.1. Cálculo de ChatGPT

(4 × 0,30) + (5 × 0,15) + (3 × 0,20) + (3 × 0,25) + (3 × 0,10)

= 1,20 + 0,75 + 0,60 + 0,75 + 0,30

**Resultado: 3,60 / 5 = 72 %**

### 5.2. Cálculo de Swagger Editor

(5 × 0,30) + (4 × 0,15) + (5 × 0,20) + (4 × 0,25) + (4 × 0,10)

= 1,50 + 0,60 + 1,00 + 1,00 + 0,40

**Resultado: 4,50 / 5 = 90 %**

### 5.3. Cálculo de Cucumber

(5 × 0,30) + (3 × 0,15) + (5 × 0,20) + (5 × 0,25) + (4 × 0,10)

= 1,50 + 0,45 + 1,00 + 1,25 + 0,40

**Resultado: 4,60 / 5 = 92 %**

## 6. Justificación observable de las calificaciones

### 6.1. H-01: ChatGPT

**C-01. Adecuación funcional: 4/5.**

ChatGPT permitió elaborar una propuesta de historia de usuario para el registro de actividades deportivas y criterios de aceptación en formato Gherkin. La propuesta necesitó modificaciones para representar correctamente los campos y reglas de PUKAY.

**C-02. Facilidad de uso: 5/5.**

La herramienta permitió generar una propuesta a partir de una instrucción en lenguaje natural, sin configurar un entorno de programación.

**C-03. Integración: 3/5.**

El contenido generado pudo incorporarse a `docs/07-historias-y-criterios.md`, pero requirió revisión y adaptación manual para mantener consistencia con los identificadores y escenarios del proyecto.

**C-04. Verificación: 3/5.**

La historia generada fue revisada documentalmente. Todavía debe comprobarse la correspondencia exacta entre todos sus criterios de aceptación y los escenarios automatizados.

**C-05. Riesgo y control: 3/5.**

Se identificaron omisiones en campos y validaciones. La herramienta es útil como apoyo, pero sus resultados requieren revisión humana.

**Evidencias:**

- `docs/06-mapa-toolchain.md`, prueba P-01.
- `docs/07-historias-y-criterios.md`.
- `docs/04-registro-ia.md`.

**Decisión:** Seleccionada como herramienta de apoyo, con revisión humana obligatoria.

### 6.2. H-02: Swagger Editor

**C-01. Adecuación funcional: 5/5.**

Swagger Editor permitió visualizar correctamente las cinco operaciones definidas en el contrato OpenAPI de PUKAY.

**C-02. Facilidad de uso: 4/5.**

El archivo `api/openapi.yaml` pudo importarse y sus operaciones se visualizaron de forma organizada.

**C-03. Integración: 5/5.**

El contrato OpenAPI constituye un artefacto compartido que puede relacionarse con la documentación, el mock, los stubs y las pruebas de la API.

**C-04. Verificación: 4/5.**

Se comprobó la visualización del contrato y se ejecutó Spectral, obteniendo el mensaje:

`No results with a severity of 'error' found!`

La validación con Spectral constituye una comprobación adicional del contrato, aunque no demuestra por sí sola el funcionamiento de los endpoints.

**C-05. Riesgo y control: 4/5.**

Durante la validación se identificó un problema de configuración de Spectral: no se había definido un conjunto de reglas.

Se creó `.spectral.yaml` con:

`extends: ["spectral:oas"]`

Después se repitió la ejecución y no se encontraron errores de severidad `error`.

**Evidencias:**

- `api/openapi.yaml`.
- `.spectral.yaml`.
- `docs/06-mapa-toolchain.md`, prueba P-02.
- Captura de Swagger Editor.
- Resultado de Spectral.

**Decisión:** Seleccionada para el diseño y visualización del contrato OpenAPI, complementada con Spectral para validación automatizada.

### 6.3. H-03: Cucumber

**C-01. Adecuación funcional: 5/5.**

Cucumber permitió automatizar escenarios de aceptación para funcionalidades del prototipo PUKAY.

**C-02. Facilidad de uso: 3/5.**

La herramienta requirió preparar el entorno Node.js, escribir escenarios Gherkin e implementar definiciones de pasos en JavaScript.

**C-03. Integración: 5/5.**

Los escenarios Gherkin se relacionan con las historias de usuario, las reglas de negocio y las funciones implementadas en `src/`.

**C-04. Verificación: 5/5.**

Se ejecutó `npm.cmd test` y se confirmó la aprobación de 16 escenarios.

Adicionalmente, `npm.cmd run lint` finalizó sin errores.

**C-05. Riesgo y control: 4/5.**

Durante la implementación se identificaron problemas con definiciones duplicadas de pasos y funciones no disponibles correctamente.

Los problemas se corrigieron y las pruebas volvieron a ejecutarse satisfactoriamente.

**Evidencias:**

- `tests/features/`.
- `tests/steps/`.
- `src/servicios.js`.
- `src/servidor.js`.
- `docs/06-mapa-toolchain.md`, prueba P-03.
- Resultados de Cucumber y ESLint.

**Limitación:**

Los escenarios incorporados para actualización y eliminación verifican funciones de servicio del prototipo Node.js. No sustituyen las pruebas de integración HTTP ni las pruebas del backend PHP/MySQL.

**Decisión:** Seleccionada para automatización de pruebas de aceptación.

## 7. Selección de herramientas

Las tres herramientas se seleccionan para funciones complementarias dentro de la cadena CASE.

| Herramienta | Resultado | Selección | Condición de uso |
|---|---:|---|---|
| ChatGPT | 72 % | Seleccionada como apoyo | Revisar y corregir el contenido generado |
| Swagger Editor | 90 % | Seleccionada | Validar adicionalmente con Spectral |
| Cucumber | 92 % | Seleccionada | Mantener escenarios vinculados a criterios de aceptación |

Cucumber presenta el mayor puntaje debido a la ejecución satisfactoria de las pruebas automatizadas.

Swagger Editor obtiene una valoración alta por su utilidad para revisar el contrato OpenAPI y relacionarlo con otros artefactos.

ChatGPT obtiene una valoración menor porque sus resultados requieren intervención humana y verificación adicional.

La comparación no establece que una herramienta pueda sustituir a las demás, sino que identifica su adecuación para la función asignada.

## 8. Riesgos de la selección

| ID | Herramienta | Riesgo | Tratamiento |
|---|---|---|---|
| R-01 | ChatGPT | Generación de requisitos incompletos o ambiguos | Revisión humana contra el dossier |
| R-02 | ChatGPT | Criterios Gherkin que no coincidan con la implementación | Comprobar trazabilidad y ejecutar pruebas |
| R-03 | Swagger Editor | Contrato válido pero diferente del comportamiento real del servidor | Incorporar pruebas de integración |
| R-04 | Swagger Editor | Cambios en el contrato sin actualización de documentación | Mantener una fuente OpenAPI versionada |
| R-05 | Cucumber | Escenarios que no cubran todas las reglas de negocio | Revisar cobertura por historia y criterio |
| R-06 | Cucumber | Pruebas del prototipo confundidas con pruebas del backend real | Documentar el alcance de cada entorno |
| R-07 | Cadena CASE | Evidencias no incorporadas al repositorio | Conservar capturas, salidas y registros de ejecución |

## 9. Relación con los artefactos del proyecto

| Artefacto | Herramienta relacionada | Finalidad |
|---|---|---|
| `docs/06-mapa-toolchain.md` | ChatGPT, Swagger Editor y Cucumber | Documentar prioridades y pruebas |
| `docs/07-historias-y-criterios.md` | ChatGPT | Documentar requisitos y criterios |
| `api/openapi.yaml` | Swagger Editor | Definir el contrato de la API |
| `.spectral.yaml` | Spectral | Configurar reglas de validación |
| `src/` | Node.js | Implementar el prototipo ejecutable |
| `tests/features/` | Cucumber | Definir escenarios Gherkin |
| `tests/steps/` | Cucumber | Implementar pasos de prueba |
| `docs/04-registro-ia.md` | ChatGPT | Registrar el uso y la revisión crítica de IA |
| `docs/09-matriz-evaluacion-case.md` | Todas | Documentar evaluación y selección |

## 10. Conclusiones

La evaluación permitió comparar tres herramientas CASE vinculadas a las tareas de mayor prioridad del proyecto PUKAY.

La matriz utiliza cinco criterios con pesos que suman 100 % y justifica las calificaciones mediante resultados observables.

ChatGPT facilitó la elaboración inicial de requisitos, pero necesitó revisión y modificaciones.

Swagger Editor permitió visualizar cinco operaciones del contrato OpenAPI. La ejecución complementaria de Spectral no identificó errores de severidad `error`.

Cucumber permitió ejecutar satisfactoriamente 16 escenarios de aceptación del prototipo Node.js.

Los resultados ponderados fueron:

- ChatGPT: 72 %.
- Swagger Editor: 90 %.
- Cucumber: 92 %.

Se seleccionan las tres herramientas por su contribución a distintas fases de la cadena CASE, manteniendo controles para los riesgos identificados.

La evaluación debe complementarse con la revisión final de trazabilidad, evidencias y artefactos de integración antes de cerrar la entrega.
