## Tabla 47

### ADR-004: Stack Node.js para el Esqueleto de la Cadena CASE

| Campo | Contenido |
|---|---|
| **Título** | ADR-004: Stack Node.js para el esqueleto de la cadena CASE |
| **Estado** | Aceptada. 🟨 Confirmar en equipo. |
| **Contexto** | El backend real de PUKAY es PHP con PDO sobre XAMPP y MySQL (R1, ADR-001, ADR-003). Las herramientas de la cadena (Spectral, Prism, OpenAPI Generator, Cucumber.js y ESLint) se instalan con Node.js. El equipo dispone de pocos días para esta entrega (R3). |
| **Decisión** | El esqueleto de `src/` y las pruebas de `tests/` se escriben en Node.js (18 o superior), sin base de datos (almacén en memoria) y sin frameworks de servidor. Cubre cinco recursos de la Tabla 10 del informe (procesos 1 a 3). No sustituye al backend PHP: es un artefacto para ejercitar la cadena sobre el contrato de PUKAY. |
| **Alternativas descartadas** | PHP con PHPUnit: requiere instalar Composer y no reutiliza el resto de herramientas. Python con pytest: agrega un segundo entorno de ejecución. |
| **Consecuencias a favor** | Un solo entorno para todas las herramientas; pruebas en español con Gherkin ejecutable; sin dependencias del servidor. |
| **Consecuencias en contra** | El esqueleto no prueba el código PHP real; el contrato debe contrastarse con la API en PHP antes de considerarlo definitivo. |
| **Vínculo** | R1, R3 y R4; D3 y D4; escenarios E1, E2, E4 y E5; ADR-002 y ADR-003; tareas T4, T6, T7 y T8. |

*Nota. Elaboración propia a partir del formato de Nygard (2011).*
