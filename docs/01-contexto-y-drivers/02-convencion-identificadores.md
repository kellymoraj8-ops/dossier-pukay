
# 1.2. Convención de Identificadores

## Descripción

Cada identificador se define en un paso y se reutiliza sin cambios en las vistas, los ADR y la matriz de decisión, de modo que se conserve la trazabilidad entre las tres partes del dossier.

La **Tabla 2** presenta los prefijos utilizados en la documentación y la **Tabla 3** muestra la continuidad entre las tres partes del proyecto.

---

## Tabla 2. Convención de Identificadores

| Prefijo | Significado | Valores en el caso |
|---|---|---|
| **S** | Stakeholder | S1 a S5 (Paso 1) |
| **R** | Restricción | R1 a R6 (Paso 2) |
| **D** | Driver arquitectónico | D1 a D5 (Paso 3) |
| **E** | Escenario de calidad | E1 a E5 (Paso 4); E6 se incorpora en la Parte III (Paso 10) |
| **A** | Alternativa de estilo | A1 a A3 (Paso 11) |
| **ADR** | Registro de decisión arquitectónica | ADR-001 y ADR-002 (Paso 7); ADR-003 (Paso 15) |

*Nota. Elaboración propia a partir del modelo de la cátedra.*

---

## Tabla 3. Continuidad entre las Tres Partes del Dossier

| Parte | Sesión | Pregunta que responde | Productos | Ubicación en el repositorio |
|---|---|---|---|---|
| **I. Levantar** | S1 | ¿Qué necesita el sistema y qué condiciona su estructura? | S, R, D y escenarios E1 a E5 | `docs/01-contexto-y-drivers/` |
| **II. Representar** | S2 | ¿Cómo se ve la arquitectura y qué se decidió? | C4 niveles 1 y 2, ADR-001, ADR-002, trazabilidad | `docs/02-vistas-c4/` y `docs/03-adr/` |
| **III. Decidir** | S3 | ¿Qué estilo sostiene mejor los escenarios? | E6, matriz ponderada, ADR-003, C4 nivel 2 actualizado | `docs/01-contexto-y-drivers/`, `docs/02-vistas-c4/` y `docs/03-adr/` |

*Nota. Elaboración propia a partir del modelo de la cátedra.*

---

## Importancia de la trazabilidad

La convención de identificadores permite mantener una relación clara entre los diferentes elementos arquitectónicos del proyecto PUKAY.

Por ejemplo:

- **S1:** Deportista aficionado.
- **D1:** Proteger las credenciales del usuario y las comunicaciones.
- **E1:** Protección de contraseñas almacenadas.
- **ADR-002:** Protección de credenciales mediante hash y token.

Esta organización facilita la comprensión de las decisiones arquitectónicas y su relación con los requisitos del sistema.
