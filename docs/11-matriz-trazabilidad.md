
# Matriz de Trazabilidad PUKAY

## 1. Objetivo y alcance

Enlazar, sin eslabones rotos, cada requisito funcional de PUKAY con el escenario de calidad que lo respalda, la decisión arquitectónica (ADR) que lo sostiene, el artefacto del repositorio que lo materializa, el commit o Pull Request que lo incorporó y el job del pipeline de integración continua que lo verifica.

**Alcance real de la verificación automática.** PUKAY es una aplicación Android nativa (Java y XML, MVVM con Repository) que consume una API REST en PHP con MySQL (ADR-001, ADR-003). El pipeline de este repositorio **no ejecuta ese código**: ejecuta el *esqueleto Node.js* de la cadena CASE (`src/` y `tests/`, ADR-005), que reproduce el contrato OpenAPI de PUKAY y sirve de banco de pruebas para los criterios de aceptación. Por ello:

- Una prueba aprobada en el pipeline demuestra que **el contrato y el prototipo cumplen el criterio**, no que el backend PHP/MySQL ni la app Android lo cumplan.
- Los escenarios de calidad que dependen del cliente Android (E3) o de la disponibilidad real del servidor (E6) no tienen una puerta automática; se indican como tales en la Tabla 1.

## 2. Convención de identificadores

| Prefijo | Significado | Valores | Dónde se define |
|---|---|---|---|
| HU | Historia de usuario | HU1 a HU6 | `tests/features/` (etiquetas Gherkin) |
| CA | Criterio de aceptación | CA1 a CA13 | `tests/features/` |
| CP | Caso de prueba | CP01 a CP17 | `tests/features/` e informe original de PUKAY |
| E | Escenario de calidad | E1 a E6 | [Escenarios de calidad](01-contexto-y-drivers/F%29Escenarios-calidad.md) |
| D | Driver arquitectónico | D1 a D5 | [Drivers arquitectónicos](01-contexto-y-drivers/E%29Drivers-arquitectonicos.md) |
| ADR | Decisión arquitectónica | ADR-001 a ADR-005 | [Carpeta de ADR](03-adr/) |
| API | Operación del contrato | API-01 a API-05 | [`api/openapi.yaml`](../api/openapi.yaml) |
| Job | Puerta del pipeline | `calidad`, `pruebas`, `seguridad`, `contrato`, `codeql` | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) |

### 2.1. Equivalencias entre los documentos y los archivos Gherkin

El documento [`07-historias-y-criterios.md`](07-historias-y-criterios.md) usa HU-001 y CA-01 a CA-03; los archivos `.feature` usan HU4 y CA9 a CA11. Se documenta la equivalencia sin renombrar ninguno de los dos:

| En `docs/07` | En `tests/features/` | Prueba | Comportamiento |
|---|---|---|---|
| HU-001 | HU4 | — | Registrar una actividad deportiva |
| CA-01 | CA9 | CP09 | Registro exitoso (HTTP 201 y actividad en el historial) |
| CA-02 | CA11 | CP17 | Rechazo de duración y distancia negativas (HTTP 400) |
| CA-03 | CA10 | CP10 | Duración obligatoria (HTTP 400) |

## 3. Matriz principal de trazabilidad

**Cómo leerla.** Cada fila recorre la cadena completa. La columna *Commit o PR* contiene marcadores que debes reemplazar con el enlace real (ver la guía al final). La columna *Pipeline* indica el job de `ci.yml` que vuelve a comprobar el requisito en cada Pull Request.

### 3.1. Requisitos funcionales

| ID | Requisito (HU → CA / CP) | Escenario | ADR | Artefacto | Commit o PR | Pipeline |
|---|---|---|---|---|---|---|
| TR-01 | **HU1 Registro de usuario** → CA1 (CP01) registro válido; CA2 (CP02) correo repetido; CA3 (CP03) campos vacíos | E1 | ADR-002, ADR-005 | [`hu1-registro.feature`](../tests/features/hu1-registro.feature); [`src/servicios.js`](../src/servicios.js) (`registrarUsuario`); ruta del prototipo `POST /api/auth/registro` (no documentada en OpenAPI) | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu1-registro.feature] | `pruebas` |
| TR-02 | **HU1** → CA4 (CP06) la contraseña no se almacena en texto plano | E1 | ADR-002 | [`hu1-registro.feature`](../tests/features/hu1-registro.feature); [`src/seguridad.js`](../src/seguridad.js) (hash scrypt con sal) | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ src/seguridad.js] | `pruebas`, `codeql` |
| TR-03 | **HU2 Inicio de sesión** → CA5 (CP04) credenciales correctas; CA6 (CP05) credenciales no válidas | E2 | ADR-002 | [`hu2-inicio-sesion.feature`](../tests/features/hu2-inicio-sesion.feature); API-01 `POST /login.php` | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu2-inicio-sesion.feature] | `pruebas`, `contrato` |
| TR-04 | **HU3 Deportes** → CA7 (CP08) catálogo de deportes | E5 | ADR-001, ADR-003 | [`hu3-deportes.feature`](../tests/features/hu3-deportes.feature); [`src/almacen.js`](../src/almacen.js) | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu3-deportes.feature] | `pruebas` |
| TR-05 | **HU3** → CA8 (CP07) consulta sin token se rechaza | E2 | ADR-002 | [`hu3-deportes.feature`](../tests/features/hu3-deportes.feature); [`src/servidor.js`](../src/servidor.js) | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu3-deportes.feature] | `pruebas` |
| TR-06 | **HU4 (= HU-001) Registrar actividad** → CA9 (= CA-01, CP09) registro exitoso | E5 | ADR-001, ADR-003 | [`hu4-registrar-actividad.feature`](../tests/features/hu4-registrar-actividad.feature); API-02 `POST /registrar_actividad.php`; [`docs/07`](07-historias-y-criterios.md) | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu4-registrar-actividad.feature] | `pruebas`, `contrato` |
| TR-07 | **HU4** → CA10 (= CA-03, CP10) duración obligatoria | E5 | ADR-001, ADR-003 | [`hu4-registrar-actividad.feature`](../tests/features/hu4-registrar-actividad.feature); API-02 | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu4-registrar-actividad.feature] | `pruebas`, `contrato` |
| TR-08 | **HU4** → CA11 (= CA-02, CP17) rechazo de duración y distancia negativas | E5 | ADR-001, ADR-003 | [`hu4-registrar-actividad.feature`](../tests/features/hu4-registrar-actividad.feature); API-02 | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ EL ESCENARIO CP17] | `pruebas`, `contrato` |
| TR-09 | **HU5 Historial** → CA12 (CP12) cada usuario ve solo sus actividades ¹ | E2 | ADR-002 | [`hu5-historial.feature`](../tests/features/hu5-historial.feature); API-03 `GET /listar_actividades.php` | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu5-historial.feature] | `pruebas`, `contrato` |
| TR-10 | **HU5** → CA13 (CP07) consulta del historial sin token ¹ | E2 | ADR-002 | [`hu5-historial.feature`](../tests/features/hu5-historial.feature); API-03 | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu5-historial.feature] | `pruebas`, `contrato` |
| TR-11 | **HU6 Gestión de actividades** → CP13 actualizar una actividad propia | E2 ² | ADR-002 | [`hu6-gestion-actividades-openapi.feature`](../tests/features/hu6-gestion-actividades-openapi.feature); API-04 `POST /actualizar_actividad.php` | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu6-gestion-actividades-openapi.feature] | `pruebas`, `contrato` |
| TR-12 | **HU6** → CP14 rechazar la actualización de una actividad ajena | E2 ² | ADR-002 | Igual que TR-11 | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu6-gestion-actividades-openapi.feature] | `pruebas`, `contrato` |
| TR-13 | **HU6** → CP15 eliminar una actividad propia | E2 ² | ADR-002 | [`hu6-gestion-actividades-openapi.feature`](../tests/features/hu6-gestion-actividades-openapi.feature); API-05 `POST /eliminar_actividad.php` | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu6-gestion-actividades-openapi.feature] | `pruebas`, `contrato` |
| TR-14 | **HU6** → CP16 rechazar la eliminación de una actividad ajena | E2 ² | ADR-002 | Igual que TR-13 | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ hu6-gestion-actividades-openapi.feature] | `pruebas`, `contrato` |

¹ En `hu5-historial.feature` estos criterios figuran hoy como `@CA11` y `@CA12`; `@CA11` ya lo usa `hu4-registrar-actividad.feature`. Se propone renumerarlos a CA12 y CA13 (ver Sección 6, inconsistencia I-1).
² Las pruebas HU6 llevan solo la etiqueta `@OpenAPI`. Su relación con E2 (aislamiento de datos por usuario) es una **asignación propuesta por el equipo** por tratarse de reglas de propiedad de la actividad.

### 3.2. Atributos de calidad y decisiones de proceso

| ID | Requisito o decisión | Escenario | ADR | Artefacto | Commit o PR | Pipeline |
|---|---|---|---|---|---|---|
| TR-15 | Cambios localizados en la capa de acceso remoto del cliente (D3) | E3 | ADR-003 | Capas Repository y de acceso remoto de la app Android: [INSERTAR RUTA DE LA CARPETA DEL CÓDIGO ANDROID EN EL REPOSITORIO O EN OTRO REPOSITORIO] | [INSERTAR ENLACE AL COMMIT QUE CREÓ LA CAPA REPOSITORY] | **Sin puerta automática** (requiere revisión de código Android) |
| TR-16 | Backend reutilizable por otro cliente a través de un contrato versionado (D4) | E4 | ADR-003 | [`api/openapi.yaml`](../api/openapi.yaml); `.spectral.yaml`; documentación generada con Redocly | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ api/openapi.yaml] | `contrato` |
| TR-17 | Comportamiento ante servidor no disponible | E6 ³ | ADR-003 | No hay un documento que defina E6 | [INSERTAR ENLACE A LA EVIDENCIA, SI EXISTE] | **Sin puerta automática** |
| TR-18 | Control de versiones con Git, flujo GitHub Flow y revisión cruzada | — | ADR-004 | [`CONTRIBUTING.md`](../CONTRIBUTING.md); [`.github/CODEOWNERS`](../.github/CODEOWNERS); [`08-matriz-git-vs-svn.md`](08-matriz-git-vs-svn.md); [`12-resolucion-conflicto-git.md`](12-resolucion-conflicto-git.md) | [PR #16 (conflicto)](https://github.com/kellymoraj8-ops/dossier-pukay/pull/16); [PR #17 (evidencias)](https://github.com/kellymoraj8-ops/dossier-pukay/pull/17); [Release v0.3.0](https://github.com/kellymoraj8-ops/dossier-pukay/releases/tag/v0.3.0) | Protección de `main`: exige los cinco checks y Pull Request |
| TR-19 | Esqueleto ejecutable que reproduce el contrato para ejercitar la cadena CASE | E1, E2, E4, E5 | ADR-005 | [`src/`](../src/); [`tests/`](../tests/); [`package.json`](../package.json); [`cucumber.js`](../cucumber.js) | [INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ LA CARPETA src/] | `calidad`, `pruebas`, `codeql` |
| TR-20 | Pipeline de integración continua con puertas de calidad | — | ADR-004, ADR-005 | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml); [`scripts/escanear-secretos.js`](../scripts/escanear-secretos.js) | [INSERTAR ENLACE AL PR QUE AGREGÓ ci.yml] | Los cinco jobs |

³ E6 se menciona en el ADR-003 y en el registro de IA, pero ningún documento de `docs/01-contexto-y-drivers/` lo define todavía (la Tabla 7 llega hasta E5). Hasta definirlo, el eslabón E6 queda abierto.

## 4. Detalle de pruebas: criterio → caso de prueba → resultado

| Criterio | Caso | Escenario Gherkin | Archivo | Resultado |
|---|---|---|---|---|
| CA1 | CP01 | Registro con datos válidos | `hu1-registro.feature` | Aprobado |
| CA2 | CP02 | Registro con un correo que ya existe | `hu1-registro.feature` | Aprobado |
| CA3 | CP03 | Registro con campos vacíos | `hu1-registro.feature` | Aprobado |
| CA4 | CP06 | La contraseña no se almacena en texto plano | `hu1-registro.feature` | Aprobado |
| CA5 | CP04 | Inicio de sesión con credenciales correctas | `hu2-inicio-sesion.feature` | Aprobado |
| CA6 | CP05 | Inicio de sesión con credenciales no válidas | `hu2-inicio-sesion.feature` | Aprobado |
| CA7 | CP08 | El catálogo incluye los deportes definidos | `hu3-deportes.feature` | Aprobado |
| CA8 | CP07 | Consulta de deportes sin token | `hu3-deportes.feature` | Aprobado |
| CA9 | CP09 | Registro de una actividad válida y consulta en el historial | `hu4-registrar-actividad.feature` | Aprobado |
| CA10 | CP10 | Registro de una actividad sin duración | `hu4-registrar-actividad.feature` | Aprobado |
| CA11 | CP17 | Rechazar duración y distancia negativas | `hu4-registrar-actividad.feature` | Aprobado |
| CA12 | CP12 | Cada usuario ve solo sus actividades | `hu5-historial.feature` | Aprobado |
| CA13 | CP07 | Consulta del historial sin token | `hu5-historial.feature` | Aprobado |
| — | CP13 | Actualizar correctamente una actividad propia | `hu6-gestion-actividades-openapi.feature` | Aprobado ⁴ |
| — | CP14 | Rechazar actualización de una actividad ajena | `hu6-gestion-actividades-openapi.feature` | Aprobado ⁴ |
| — | CP15 | Eliminar correctamente una actividad propia | `hu6-gestion-actividades-openapi.feature` | Aprobado ⁴ |
| — | CP16 | Rechazar eliminación de una actividad ajena | `hu6-gestion-actividades-openapi.feature` | Aprobado ⁴ |

⁴ Los escenarios HU6 comprueban funciones de servicio del prototipo; no son pruebas HTTP contra el backend PHP/MySQL.

**Caso y escenario que exige la rúbrica.** La rúbrica menciona el caso «reservar cita» y el escenario E1 como ejemplo genérico. En PUKAY corresponden a: el caso de uso principal **«registrar actividad»** (HU4, CP09, CP10 y CP17) y el escenario **E1, protección de contraseñas** (CP01 y CP06). Ambos pasan por el job `pruebas`.

## 5. Resultados de verificación

Comandos ejecutados sobre el repositorio con la configuración del pipeline descrita en el [informe final](09-informe-final.md#anexo-a-apartado-técnico-pipeline-de-integración-continua):

| Puerta | Comando | Resultado |
|---|---|---|
| `calidad` | `npm run lint` | Sin errores ni advertencias de ESLint |
| `pruebas` | `npm run cobertura` | 17 escenarios aprobados, 96 pasos aprobados, 0 fallidos; cobertura de líneas 82,1 % (umbral del pipeline: 80 %) |
| `seguridad` | `npm run secretos` | Sin secretos detectados |
| `seguridad` | `npm run auditoria` (solo dependencias de ejecución) | 0 vulnerabilidades |
| `contrato` | `npm run contrato` | Sin resultados de severidad `warn` o superior |
| `contrato` | `npm run docs:redoc` | Documentación HTML generada correctamente |
| `codeql` | Ejecución en GitHub Actions | [INSERTAR ENLACE A LA EJECUCIÓN DEL JOB codeql EN VERDE] |

**Nota sobre la auditoría completa.** `npm audit` sin filtros informa 19 vulnerabilidades (13 de severidad alta y 6 moderadas) que provienen únicamente de herramientas de desarrollo (`@stoplight/prism-cli` y `@openapitools/openapi-generator-cli`). No forman parte de ningún código que se despliegue; el riesgo se acepta de forma documentada y se revisa con Dependabot.

## 6. Inconsistencias detectadas y su corrección

| ID | Inconsistencia | Dónde | Corrección |
|---|---|---|---|
| I-1 | `@CA11` aparece en dos features con significados distintos (CP17 y CP12) | `hu4-registrar-actividad.feature` y `hu5-historial.feature` | Renumerar en HU5: `@CA11 @CP12` → `@CA12 @CP12` y `@CA12 @CP07` → `@CA13 @CP07` |
| I-2 | El archivo `ADR-005-stack-del-esqueleto.md` lleva el título «ADR-004» en su interior; el ADR-004 es la selección de Git | `docs/03-adr/ADR-005-stack-del-esqueleto.md` | Cambiar el título interno a «ADR-005» y retirar la marca «Confirmar en equipo» del estado |
| I-3 | `CONTRIBUTING.md` cita `docs/08-matriz-trazabilidad.md` y `docs/09-matriz-evaluacion-case.md`, que no existen con esos nombres | `CONTRIBUTING.md`, líneas 195 y 196 | Reemplazar por `docs/05-trazabilidad.md` y `docs/10-matriz-evaluacion-case.md` |
| I-4 | El README enumera solo ADR-001 a ADR-003 y enlaza archivos en minúscula (`a-caso-pukay.md`) mientras los archivos reales se llaman `A)Caso-pukay.md` | `README.md` | Actualizar la lista a ADR-001 a ADR-005 y corregir los enlaces (GitHub distingue mayúsculas) |
| I-5 | La ruta de registro de usuario existe en el prototipo (`/api/auth/registro`) pero no en `api/openapi.yaml` | `api/openapi.yaml` | Documentar la operación en el contrato o declarar que HU1 queda fuera del contrato |
| I-6 | El supuesto 2 del dossier habla de cinco deportes; el prototipo define seis (incluye natación) | `docs/01-contexto-y-drivers/D)restricciones-supuestos.md` y `src/almacen.js` | Unificar la cantidad en ambos lugares |
| I-7 | E4 mide «9 de 9 recursos» y el contrato documenta 5 operaciones | `F)Escenarios-calidad.md` y `api/openapi.yaml` | Aclarar que el contrato cubre 5 de los 9 recursos del informe original |
| I-8 | La evidencia de protección de `main` figura como «Pendiente de verificación» | `evidencias/prueba-proteccion-main.md` | Completar con captura de la regla y del bloqueo de un PR en rojo |
| I-9 | Los documentos mencionan 16 escenarios; la ejecución actual da 17 | `06-mapa-toolchain.md`, `10-matriz-evaluacion-case.md` | Actualizar a 17 (16 más CP17) |

## 7. Estado de los eslabones

| Eslabón | Estado | Qué falta |
|---|---|---|
| Requisito → escenario | Completo para HU1 a HU6 | Definir E6 |
| Escenario → ADR | Completo para E1 a E5 | Vincular E6 |
| ADR → artefacto | Completo | Corregir el título de ADR-005 (I-2) |
| Artefacto → commit o PR | **Parcial** | Reemplazar los marcadores `[INSERTAR ENLACE ...]` de la Tabla 3.1 y 3.2 |
| Commit o PR → pipeline | **Pendiente de ejecución** | Fusionar `ci.yml`, activar la protección de `main` y enlazar una ejecución en verde |

## 8. Conclusión

La trazabilidad de los requisitos funcionales HU1 a HU6 queda cerrada hasta el artefacto y la prueba automatizada, con 17 escenarios aprobados sobre el prototipo del contrato. Los atributos E3 y E6 carecen de una puerta automática y se declaran explícitamente como tales. El único tramo que depende de acciones manuales es el enlace final de cada artefacto con su commit o PR y con la ejecución del pipeline, que se completa con los marcadores indicados.

Estos resultados no sustituyen las pruebas de integración de la aplicación Android con el backend PHP y la base de datos MySQL.

---

## Navegación

[Volver al índice general](../README.md) · [Mapa de toolchain](06-mapa-toolchain.md) · [Historias y criterios](07-historias-y-criterios.md) · [Matriz de evaluación CASE](10-matriz-evaluacion-case.md) · [Registro de IA](04-registro-ia.md) · [Informe final](09-informe-final.md)

---

## 🔍 Guía para Kelly

Esta guía explica cada marcador entre corchetes que dejé en este documento y de dónde sacar la información. **Borra esta sección antes de entregar.**

### Paso previo: dejar el archivo en su lugar

1. En tu computador, dentro del repositorio, ejecuta: `git switch -c docs/trazabilidad-final`.
2. Renombra el archivo anterior para no perder su historial: `git mv docs/11-matriz-trazabilidad.md docs/05-trazabilidad.md`.
3. Abre `docs/05-trazabilidad.md`, borra todo su contenido y pega este documento.
4. Corrige la línea 195 y 196 de `CONTRIBUTING.md` (inconsistencia I-3).

### Qué significa cada marcador

| Marcador | Qué significa | De dónde sacarlo |
|---|---|---|
| `[INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ <archivo>]` | El enlace al Pull Request o commit en el que ese archivo entró al repositorio | En GitHub abre el archivo (por ejemplo `tests/features/hu1-registro.feature`) → botón **History** (arriba a la derecha) → el último commit de la lista (el más antiguo) es el que lo creó → clic → copia la dirección del navegador. Si el cambio llegó por un Pull Request, es mejor el enlace del PR: pestaña **Pull requests** → **Closed** → busca el PR por título → copia su dirección |
| `[INSERTAR ENLACE AL PR O COMMIT QUE AGREGÓ EL ESCENARIO CP17]` | El commit que agregó el escenario de duración y distancia negativas | Abre `tests/features/hu4-registrar-actividad.feature` → **Blame** (junto a History) → mira la línea de `@CA11 @CP17` → clic en el mensaje del commit que aparece a la izquierda → copia el enlace |
| `[INSERTAR RUTA DE LA CARPETA DEL CÓDIGO ANDROID ...]` | Dónde está el código Java de la app (capa Repository) | Si el código Android está en otro repositorio, pega su enlace de GitHub y la carpeta (por ejemplo `.../app/src/main/java/.../repository`). Si no está en GitHub, escribe «código en el equipo de Oscar; no versionado en este repositorio» y no inventes un enlace |
| `[INSERTAR ENLACE AL COMMIT QUE CREÓ LA CAPA REPOSITORY]` | El commit del proyecto Android que creó esa capa | Mismo procedimiento de **History** en el repositorio Android. Pregúntaselo a Oscar si no lo encuentras |
| `[INSERTAR ENLACE A LA EVIDENCIA, SI EXISTE]` (E6) | Evidencia de la prueba de servidor caído | Si el equipo hizo esa prueba, pega el enlace a la captura. Si no existe, reemplaza el marcador por «Sin evidencia: pendiente» (es más honesto que inventarla) |
| `[INSERTAR ENLACE AL PR QUE AGREGÓ ci.yml]` | El Pull Request donde subirás el pipeline | Se crea en el Paso 6 del Anexo A del informe final. Después de fusionarlo: **Pull requests** → **Closed** → copia el enlace |
| `[INSERTAR ENLACE A LA EJECUCIÓN DEL JOB codeql EN VERDE]` | La página de una ejecución del pipeline donde `codeql` salió en verde | Pestaña **Actions** → workflow **CI** → entra en una ejecución con la marca verde → copia la dirección |

### Cosas que debes comprobar tú misma

1. **Inconsistencias I-1 a I-9 (Sección 6):** son errores reales que encontré al leer tu repositorio. Corrige al menos I-1, I-2, I-3 e I-4, porque afectan directamente el criterio «identificadores coinciden entre documentos y repositorio» (25 % de la nota).
2. **PR #16, PR #17 y la versión v0.3.0:** esos enlaces los tomé de tus propios documentos (`docs/12-resolucion-conflicto-git.md` y `evidencias/README.md`). Ábrelos una vez para confirmar que cargan.
3. **Columna Pipeline:** solo será verdadera cuando `ci.yml` esté fusionado y funcionando. Si no alcanzas, cambia esas celdas por «Pendiente».

## Navegación

[Volver al índice general](README.md)

[Consultar el mapa de toolchain](06-mapa-toolchain.md)

[Consultar historias y criterios de aceptación](07-historias-y-criterios.md)

[Consultar la matriz de evaluación CASE](09-matriz-evaluacion-case.md)

[Consultar el registro de IA](04-registro-ia.md)
