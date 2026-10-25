
# Parte I. Levantar los Drivers (Sesión 1)

## Paso 3. Drivers Arquitectónicos

### Objetivo

Identificar y priorizar los principales factores que condicionan la estructura y las decisiones arquitectónicas del sistema PUKAY.

Los drivers arquitectónicos se seleccionan a partir de los concerns, las restricciones y los atributos de calidad identificados previamente.

Se consideran cinco drivers, evaluados según su importancia y dificultad de implementación.

Los atributos de calidad se clasifican de acuerdo con ISO/IEC 25010:2023.

---

## Tabla 6. Drivers Arquitectónicos y su Priorización

| ID | Driver | Tipo (ISO/IEC 25010:2023) | Origen | Importancia | Dificultad |
|---|---|---|---|---|---|
| **D1** | Proteger las credenciales del usuario y las comunicaciones. | Seguridad | S1, R6 | Alta | Media |
| **D2** | Aislar los datos de cada usuario. | Seguridad | S1 | Alta | Media |
| **D3** | Localizar el impacto de los cambios en una sola capa. | Mantenibilidad | S3 | Alta | Media |
| **D4** | Permitir que otros clientes reutilicen el backend. | Interoperabilidad | S5, S3, R1 | Alta | Media |
| **D5** | Registrar actividades en pocos pasos y mostrar el progreso sin cálculos manuales. | Capacidad de interacción | S1, S2 | Media | Media |

*Nota. Elaboración propia. ISO/IEC (2023) renombró la usabilidad como capacidad de interacción.*

---

## Criterios de priorización

Los drivers se valoran mediante dos criterios:

### Importancia

Representa el impacto del driver en el cumplimiento de los objetivos y necesidades del sistema.

- **Alta:** Influye directamente en decisiones arquitectónicas fundamentales.
- **Media:** Contribuye al cumplimiento de necesidades relevantes del sistema.

### Dificultad

Representa el esfuerzo técnico estimado para satisfacer el driver dentro de las restricciones del proyecto.

Los drivers con importancia alta y dificultad alta o media tienen mayor peso en las decisiones arquitectónicas.

---

## Consideración adicional sobre rendimiento

El informe del proyecto también exige rendimiento asíncrono (RNF06).

Este requisito se atiende dentro del diseño del cliente Android mediante llamadas asíncronas a la API REST, según lo documentado en el ADR-003.

Sin embargo, no se seleccionó como driver independiente para respetar el máximo de cinco drivers establecido en el dossier.

---

## Relación con los escenarios de calidad

Cada driver se relaciona con un escenario de calidad verificable:

| Driver | Escenario | Propósito |
|---|---|---|
| **D1** | E1 | Protección de contraseñas almacenadas. |
| **D2** | E2 | Aislamiento de datos por usuario. |
| **D3** | E3 | Cambio localizado en el acceso remoto. |
| **D4** | E4 | Reutilización del backend por otro cliente. |
| **D5** | E5 | Registro rápido de una actividad. |

Estos escenarios permiten establecer medidas concretas para evaluar si la arquitectura de PUKAY responde a las necesidades identificadas.
