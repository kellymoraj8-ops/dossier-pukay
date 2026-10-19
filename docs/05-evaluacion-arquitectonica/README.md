
# Parte III — Evaluación y Selección del Estilo Arquitectónico

## Introducción

Esta sección documenta la evaluación y selección del estilo arquitectónico del sistema PUKAY.

El objetivo es comparar diferentes alternativas de arquitectura y justificar la selección de la solución que mejor responde a los drivers, escenarios de calidad y restricciones del proyecto.

---

## Objetivo

Seleccionar un estilo arquitectónico adecuado para PUKAY mediante criterios de evaluación relacionados con seguridad, mantenibilidad, interoperabilidad, capacidad de interacción y restricciones del proyecto.

---

## Alternativas arquitectónicas

Se consideran tres alternativas:

| ID | Alternativa | Descripción |
|---|---|---|
| **A1** | Aplicación autónoma | Aplicación Android con base de datos local y sin servidor. |
| **A2** | Cliente-servidor con API REST | Aplicación Android que consume una API REST desarrollada en PHP y conectada a MySQL. |
| **A3** | Backend como servicio | Aplicación Android que utiliza un servicio externo para autenticación y almacenamiento de datos. |

---

## Contenido de la evaluación

Esta sección incluirá:

1. Descripción de las alternativas arquitectónicas.
2. Definición de criterios y pesos.
3. Evaluación comparativa de alternativas.
4. Matriz de decisión ponderada.
5. Justificación del estilo seleccionado.
6. Relación con el ADR-003 y las vistas C4.

---

## Estilo arquitectónico seleccionado

El estilo utilizado en PUKAY es **cliente-servidor con API REST (A2)**.

Su implementación comprende:

- Cliente Android con MVVM y Repository.
- API REST desarrollada en PHP.
- Servidor Apache mediante XAMPP.
- Base de datos MySQL.
- Comunicación mediante solicitudes HTTP y respuestas JSON.

La justificación comparativa de esta selección se documentará mediante la matriz de evaluación arquitectónica.

---

## Navegación

[Volver al índice general](../README.md)

[Consultar Contexto y Drivers](../01-contexto-y-drivers/README.md)

[Consultar C4 Nivel 2](../02-vistas-c4/c4-nivel2.md)
