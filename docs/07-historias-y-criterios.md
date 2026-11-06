
# 07. Historias de Usuario y Criterios de Aceptación — PUKAY

## 1. Introducción

Este documento establece la trazabilidad de las seis historias de usuario de PUKAY con sus criterios de aceptación, escenarios Gherkin y casos de prueba implementados mediante Cucumber-JS.

Las historias funcionales se identifican como HU1 a HU6, los criterios de aceptación como CA1 a CA17 y los casos de prueba como CP01 a CP17.

Los escenarios de calidad arquitectónica E1, E2 y E5 se relacionan con las historias según las etiquetas presentes en los archivos `.feature`.

Las pruebas corresponden a la cadena CASE y deben distinguirse de las verificaciones de la aplicación Android y del backend PHP/MySQL.

---

## 2. HU1 — Registro de usuarios

**Como** deportista aficionado,

**Quiero** registrarme con mi correo y una contraseña,

**Para** utilizar la aplicación con mis datos protegidos.

**Escenario de calidad relacionado:** E1.

### Criterios de aceptación

| ID | Criterio | Caso de prueba | Resultado esperado |
|---|---|---|---|
| CA1 | Registro con datos válidos | CP01 | HTTP 201, correo incluido y contraseña ausente de la respuesta |
| CA2 | Registro con correo existente | CP02 | HTTP 409 |
| CA3 | Registro con campos vacíos | CP03 | HTTP 400 |
| CA4 | Protección de contraseñas | CP06 | Ninguna contraseña en texto plano; contraseñas almacenadas mediante hash y sal |

**Trazabilidad:** `@HU1`, `@E1`, `@CA1` a `@CA4`.

---

## 3. HU2 — Inicio de sesión

**Como** deportista aficionado,

**Quiero** iniciar sesión con mi correo y contraseña,

**Para** acceder únicamente a mis propios datos.

**Escenario de calidad relacionado:** E2.

### Criterios de aceptación

| ID | Criterio | Caso de prueba | Resultado esperado |
|---|---|---|---|
| CA5 | Inicio de sesión válido | CP04 | HTTP 200 y token de autenticación |
| CA6 | Credenciales incorrectas | CP05 | HTTP 401 sin token |

**Trazabilidad:** `@HU2`, `@E2`, `@CA5` y `@CA6`.

---

## 4. HU3 — Consulta de deportes disponibles

**Como** deportista aficionado,

**Quiero** consultar los deportes disponibles,

**Para** elegir la actividad que voy a registrar.

**Escenarios de calidad relacionados:** E5 y E2.

### Criterios de aceptación

| ID | Criterio | Caso de prueba | Resultado esperado |
|---|---|---|---|
| CA7 | Consultar catálogo autenticado | CP08 | HTTP 200 y catálogo con seis deportes |
| CA8 | Rechazar consulta sin token | CP07 | HTTP 401 |

Los deportes esperados son:

- Running.
- Caminata.
- Ciclismo.
- Fútbol.
- Gimnasio.
- Natación.

**Trazabilidad:** `@HU3`, `@E5`, `@E2`, `@CA7` y `@CA8`.

---

## 5. HU4 — Registro de actividades deportivas

**Como** deportista aficionado,

**Quiero** registrar una actividad con pocos campos,

**Para** consultar mi progreso sin realizar cálculos manuales.

**Escenario de calidad relacionado:** E5.

### Criterios de aceptación

| ID | Criterio | Caso de prueba | Resultado esperado |
|---|---|---|---|
| CA9 | Registrar actividad válida | CP09 | HTTP 201 y actividad disponible en el historial |
| CA10 | Rechazar actividad sin duración | CP10 | HTTP 400 y ninguna actividad registrada |
| CA11 | Rechazar duración y distancia negativas | CP17 | HTTP 400 y ninguna actividad registrada |

### Reglas de validación

- El usuario debe estar autenticado.
- El deporte debe ser válido.
- La fecha debe tener un formato aceptado por la API.
- La duración debe ser mayor que cero.
- La distancia no puede ser negativa.
- Los datos inválidos no deben generar registros.

**Trazabilidad:** `@HU4`, `@E5`, `@CA9`, `@CA10` y `@CA11`.

---

## 6. HU5 — Consulta del historial

**Como** deportista aficionado,

**Quiero** consultar mi historial de actividades,

**Para** visualizar únicamente mis propios entrenamientos.

**Escenario de calidad relacionado:** E2.

### Criterios de aceptación

| ID | Criterio | Caso de prueba | Resultado esperado |
|---|---|---|---|
| CA12 | Consultar únicamente actividades propias | CP12 | HTTP 200; dos actividades de Ana y ninguna de otro usuario |
| CA13 | Rechazar consulta sin token | CP07 | HTTP 401 |

### Regla de seguridad

Las consultas deben utilizar la identidad obtenida mediante autenticación para impedir el acceso a actividades de otros usuarios.

**Trazabilidad:** `@HU5`, `@E2`, `@CA12` y `@CA13`.

---

## 7. HU6 — Actualización y eliminación de actividades

**Como** deportista autenticado de PUKAY,

**Quiero** actualizar y eliminar mis actividades deportivas,

**Para** mantener correcto mi historial de entrenamientos.

**Relación técnica:** operaciones documentadas mediante OpenAPI.

### Criterios de aceptación

| ID | Criterio | Caso de prueba | Resultado esperado |
|---|---|---|---|
| CA14 | Actualizar una actividad propia | CP13 | HTTP 200 y actividad actualizada |
| CA15 | Rechazar actualización de actividad ajena | CP14 | HTTP 404 |
| CA16 | Eliminar una actividad propia | CP15 | HTTP 200 y actividad ausente del historial |
| CA17 | Rechazar eliminación de actividad ajena | CP16 | HTTP 404 |

### Reglas de autorización

- El usuario autenticado puede modificar sus propias actividades.
- No puede modificar actividades pertenecientes a otro usuario.
- Puede eliminar actividades propias.
- No puede eliminar actividades ajenas.

**Trazabilidad:** `@HU6`, `@OpenAPI`, `@CA14` a `@CA17`.

---

## 8. Matriz de trazabilidad HU–CA–CP

| Historia | Criterios de aceptación | Casos de prueba | Escenario de calidad |
|---|---|---|---|
| HU1 | CA1–CA4 | CP01, CP02, CP03, CP06 | E1 |
| HU2 | CA5–CA6 | CP04, CP05 | E2 |
| HU3 | CA7–CA8 | CP08, CP07 | E5, E2 |
| HU4 | CA9–CA11 | CP09, CP10, CP17 | E5 |
| HU5 | CA12–CA13 | CP12, CP07 | E2 |
| HU6 | CA14–CA17 | CP13, CP14, CP15, CP16 | OpenAPI |

**Nota:** CP07 se reutiliza como identificador de caso de prueba en HU3 y HU5. Cada historia mantiene un criterio de aceptación diferente.

La relación con los escenarios E1, E2 y E5 se fundamenta en las etiquetas documentadas en los archivos `.feature`. La relación `@OpenAPI` de HU6 identifica el contrato técnico, no un escenario de calidad arquitectónica.

---

## 9. Convención de identificadores

| Artefacto | Convención | Ejemplo |
|---|---|---|
| Historia de usuario | HU + número | HU1 |
| Criterio de aceptación | CA + número | CA11 |
| Caso de prueba | CP + dos dígitos | CP09 |
| Escenario de calidad | E + número | E2 |

Para resolver la duplicación de CA11:

- HU4 conserva CA11 para el rechazo de duración y distancia negativas.
- HU5 utiliza CA12 para la consulta de actividades propias.
- HU5 utiliza CA13 para la consulta sin token.
- HU6 incorpora CA14, CA15, CA16 y CA17 para sus cuatro escenarios.

Los identificadores deben coincidir entre este documento y las etiquetas de los archivos `.feature`.

---

## 10. Relación con la cadena CASE

La cadena de verificación del proyecto se representa mediante:

```text
Historia de usuario (HU)
        |
        v
Criterio de aceptación (CA)
        |
        v
Escenario Gherkin (.feature)
        |
        v
Caso de prueba (CP)
        |
        v
Definición de pasos
        |
        v
Ejecución Cucumber-JS
        |
        v
Resultado de prueba
```

### Artefactos relacionados

| Artefacto | Ubicación o referencia |
|---|---|
| Historias y criterios | `docs/07-historias-y-criterios.md` |
| Contrato OpenAPI | `api/openapi.yaml` |
| Escenarios de aceptación | Archivos `.feature` del repositorio |
| Definiciones de pasos | Implementación Cucumber-JS |
| Mapa de herramientas | `docs/06-mapa-toolchain.md` |
| Matriz de evaluación CASE | `docs/10-matriz-evaluacion-case.md` |

---

## 11. Cobertura documental

| Indicador | Resultado |
|---|---|
| Historias documentadas | 6 |
| Criterios de aceptación identificados | 17 |
| Escenarios Gherkin proporcionados | 17 |
| Historias con escenarios Gherkin | 6 de 6 |
| Criterios con caso de prueba asociado | 17 de 17 |
| Escenarios arquitectónicos referenciados | E1, E2 y E5 |
| Operaciones OpenAPI referenciadas | Actualización y eliminación de actividades |

La cobertura indicada es documental y corresponde a los escenarios Gherkin revisados.

La aprobación de pruebas automatizadas requiere evidencia de ejecución mediante Cucumber-JS. Los resultados del prototipo Node.js no deben presentarse como pruebas directas del backend PHP/MySQL.

---

## 12. Conclusión

PUKAY dispone de seis historias de usuario relacionadas con diecisiete criterios de aceptación y diecisiete escenarios Gherkin documentados.

La trazabilidad permite relacionar el registro de usuarios, autenticación, consulta de deportes, registro de actividades, consulta del historial y mantenimiento de actividades con sus respectivos casos de prueba.

La normalización de identificadores elimina la duplicación de CA11 y facilita la revisión de la cadena CASE.

El contrato OpenAPI y los escenarios Cucumber constituyen artefactos complementarios para verificar el comportamiento funcional del prototipo, mientras que las verificaciones de la aplicación Android y el backend PHP/MySQL mantienen su propio alcance.

---

## Navegación

[Volver al índice general](README.md)

[Consultar escenarios de calidad](01-contexto-y-drivers/f-escenarios-calidad.md)

[Consultar mapa de toolchain](06-mapa-toolchain.md)

[Consultar matriz de evaluación CASE](10-matriz-evaluacion-case.md)
