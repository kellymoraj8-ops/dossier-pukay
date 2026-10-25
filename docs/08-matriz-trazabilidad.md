# Matriz de Trazabilidad – PUKAY

## 1. Objetivo

Relacionar los requisitos funcionales de PUKAY con las historias de usuario, criterios de aceptación, servicios de la API REST y pruebas de verificación, garantizando la trazabilidad de la cadena CASE.

## 2. Matriz de trazabilidad

| ID | Historia de usuario | Criterio de aceptación | Servicio o componente | Prueba asociada | Estado |
|---|---|---|---|---|---|
| HU-001 | Registrar actividad deportiva | CA-01: Registro exitoso | POST /registrar_actividad.php | Registro con datos válidos | Pendiente de vincular evidencia individual |
| HU-001 | Registrar actividad deportiva | CA-02: Rechazo de datos inválidos | POST /registrar_actividad.php | Duración y distancia negativas | Pendiente de vincular evidencia individual |
| HU-001 | Registrar actividad deportiva | CA-03: Campos obligatorios | POST /registrar_actividad.php | Duración vacía | Pendiente de vincular evidencia individual |
| HU-002 | Registro de usuario | Por verificar en archivo Gherkin | registro.php | hu1-registro.feature | Evidencia general de Cucumber disponible |
| HU-003 | Inicio de sesión | Por verificar en archivo Gherkin | POST /login.php | hu2-inicio-sesion.feature | Evidencia general de Cucumber disponible |
| HU-004 | Consulta de deportes | Por verificar en archivo Gherkin | Por confirmar | hu3-deportes.feature | Evidencia general de Cucumber disponible |
| HU-005 | Consulta del historial | Por verificar en archivo Gherkin | GET /listar_actividades.php | hu5-historial.feature | Evidencia general de Cucumber disponible |

**Nota:** Los identificadores HU-002 a HU-005 son provisionales. Los archivos Gherkin del esqueleto Node.js utilizan otra numeración. Debe unificarse antes de la entrega.

## 3. Herramientas de verificación

| Herramienta | Propósito | Evidencia |
|---|---|---|
| Swagger / OpenAPI | Documentar el contrato de la API REST | api/openapi.yaml |
| Spectral | Analizar la calidad del contrato OpenAPI | evidencias/validacion-spectral-openapi.png |
| Redocly | Generar documentación HTML de la API | Archivo HTML generado localmente |
| Cucumber | Ejecutar escenarios Gherkin sobre el esqueleto Node.js | evidencias/cucumbertest.txt |
| ESLint | Realizar análisis estático del código JavaScript | evidencias/eslint.txt |

## 4. Resultados registrados

### Validación OpenAPI

Se ejecutó Spectral sobre el contrato OpenAPI de PUKAY. La comprobación con severidad de error no encontró errores.

### Pruebas automatizadas Cucumber

Según la evidencia proporcionada por el equipo:

- Escenarios ejecutados: 12.
- Escenarios aprobados: 12.
- Pasos ejecutados: 68.
- Pasos aprobados: 68.

Estos resultados corresponden al esqueleto ejecutable Node.js utilizado por el equipo. No constituyen, por sí solos, evidencia de pruebas contra el backend PHP/MySQL ni contra la aplicación Android.

### Análisis estático ESLint

Se ejecutó el comando `npm run lint` sobre el proyecto JavaScript. La evidencia compartida muestra su ejecución sin errores visibles.

## 5. Pendientes de verificación

- Confirmar la correspondencia entre los identificadores de historias de usuario y los archivos Gherkin.
- Revisar los escenarios exactos incluidos en cada archivo `.feature`.
- Vincular cada criterio de aceptación con su escenario automatizado.
- Confirmar las diferencias entre las rutas del esqueleto Node.js y los endpoints PHP.
- Incorporar las evidencias pendientes de las pruebas de integración y ejecución.

## 6. Conclusión

La matriz permite identificar la relación entre requisitos, implementación y pruebas. Las evidencias disponibles muestran avances en documentación de API, validación del contrato, análisis estático y pruebas automatizadas del esqueleto Node.js.

La trazabilidad completa quedará establecida cuando se verifiquen los escenarios individuales y se vinculen sus resultados con los criterios de aceptación correspondientes.
