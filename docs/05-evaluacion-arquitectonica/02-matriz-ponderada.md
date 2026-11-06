
# Paso 13. Matriz de Evaluación Ponderada

## Objetivo

Comparar las alternativas arquitectónicas A1, A2 y A3 frente a los escenarios de calidad E1–E6 de PUKAY, justificando la selección del estilo arquitectónico.

Esta evaluación complementaria se elaboró después de la retroalimentación docente.

## Tabla 24. Matriz de Evaluación Ponderada

Escala: 1 = muy bajo; 2 = bajo; 3 = medio; 4 = alto; 5 = muy alto.

| Escenario | Criterio | Peso | A1 | A2 | A3 |
|---|---|---:|---:|---:|---:|
| E1 | Seguridad de credenciales | 20 % | 2 | 5 | 4 |
| E2 | Aislamiento de datos | 20 % | 2 | 5 | 4 |
| E3 | Mantenibilidad | 15 % | 3 | 4 | 3 |
| E4 | Reutilización del backend | 20 % | 1 | 5 | 4 |
| E5 | Registro de actividades | 10 % | 5 | 4 | 4 |
| E6 | Disponibilidad | 15 % | 5 | 2 | 3 |
| **Total** | | **100 %** | **2,70** | **4,30** | **3,70** |

*Nota. Elaboración propia. Las calificaciones representan valoraciones arquitectónicas, no mediciones de pruebas.*

## Método de cálculo

Se utiliza la suma ponderada:

Puntuación = Σ (peso × calificación)

Los pesos se expresan como valores decimales.

- A1 = 2,70
- A2 = 4,30
- A3 = 3,70

## Justificación

A2 obtiene la mayor puntuación porque permite centralizar la seguridad, separar responsabilidades y reutilizar la API REST.

A1 ofrece ventajas de disponibilidad local, pero incumple las restricciones R1 y R2.

A3 reduce la administración de infraestructura, pero introduce dependencia de un proveedor y no corresponde a la infraestructura requerida.

## Trade-offs

| Alternativa | Ventaja | Desventaja |
|---|---|---|
| A1 | Funcionamiento local | Incumple restricciones obligatorias |
| A2 | Seguridad centralizada y reutilización | Dependencia del servidor |
| A3 | Infraestructura administrada | Dependencia del proveedor |

## Análisis de sensibilidad

Si aumenta la importancia de E6, las alternativas con funcionamiento local o infraestructura administrada pueden mejorar su posición relativa.

Como comprobación, al aumentar E6 del 15 % al 30 % y reducir E1 y E2 al 12,5 % cada uno, se obtienen:

- A1: 3,15
- A2: 4,00
- A3: 3,55

A2 conserva la mayor puntuación en este escenario ilustrativo.

## Decisión

Se selecciona **A2: Cliente-servidor con API REST**, por obtener la mayor puntuación y satisfacer las restricciones arquitectónicas obligatorias.

Esta evaluación respalda el ADR-003 y los escenarios E1–E6.

*Nota. Evaluación complementaria sujeta a validación del equipo.*
