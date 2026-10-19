
# Parte I. Levantar los Drivers (Sesión 1)

## Paso 1. Stakeholders y Concerns

### Objetivo

Identificar a las personas y organizaciones que utilizan, desarrollan, operan o evalúan el sistema PUKAY, así como sus principales intereses y preocupaciones arquitectónicas.

Se adopta la organización por stakeholders y concerns de ISO/IEC/IEEE (2022).

Un **concern** representa un interés o preocupación de un stakeholder, pero todavía no constituye un requisito técnico ni propone una solución específica.

---

## Tabla 4. Stakeholders de PUKAY, Concerns e Influencia

| ID | Stakeholder | Rol | Concerns principales | Influencia |
|---|---|---|---|---|
| **S1** | Deportista aficionado | Practica varias disciplinas sin una herramienta de seguimiento. | Registrar una actividad con poco esfuerzo; que sus credenciales y sus datos estén protegidos; no perder su historial al cambiar de dispositivo. | Alta |
| **S2** | Persona que inicia un hábito deportivo | Busca constancia con objetivos medibles. | Entender su avance hacia la meta sin hacer cálculos; mantener la motivación. | Alta |
| **S3** | Equipo de desarrollo | Construye y mantiene la aplicación y el servidor (tres integrantes). | Modificar una parte sin afectar el resto; poder probar cada parte; cumplir el plazo con tecnologías conocidas. | Alta |
| **S4** | Docente evaluador | Valora la solución desde la arquitectura de software. | Evidencia de análisis y de decisiones justificadas; correspondencia entre diseño, implementación y pruebas. | Media |
| **S5** | Desarrolladores de futuros clientes | Construirían una aplicación web o iOS sobre el mismo backend. | Construir otro cliente sin modificar la lógica del servidor. | Baja |

*Nota. Elaboración propia a partir de la Tabla 1 y de los requisitos RNF04 y RNF08 de Arévalo et al. (2026). S5 se deriva de RNF08. La influencia es una valoración del equipo autor.*

---

## Relación con la arquitectura de PUKAY

La identificación de los stakeholders permite reconocer las necesidades que condicionan las decisiones arquitectónicas.

Los intereses identificados sirven como base para establecer:

- Restricciones del proyecto.
- Drivers arquitectónicos.
- Escenarios de calidad verificables.
- Decisiones arquitectónicas documentadas mediante ADR.

Estos elementos mantienen la trazabilidad entre las necesidades de los involucrados y la arquitectura propuesta.
