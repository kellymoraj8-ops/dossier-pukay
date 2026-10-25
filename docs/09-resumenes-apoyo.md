# 09. Resúmenes de Apoyo (Lecturas Obligatorias)

Este documento resume las lecturas de apoyo solicitadas en la actividad autónoma, relacionándolas directamente con el desarrollo y 
control de versiones del proyecto PUKAY.

## 1. Resumen de ISO/IEC/IEEE 29148 (Ingeniería de Requisitos)
El estándar establece las mejores prácticas para redactar requisitos de software de manera clara, no ambigua y verificable. 
* **Aplicación en PUKAY:** Nos ayudó a entender que las historias de usuario (HU) no pueden quedar como simples ideas; deben
* ser medibles. Por ello, la adopción de los criterios de aceptación en formato **Gherkin** (Dado-Cuando-Entonces) es la herramienta perfecta,
* ya que obliga al equipo a definir exactamente qué se espera de cada funcionalidad (por ejemplo, en el registro de actividades o el manejo de contraseñas),
* sin dejar espacio a interpretaciones.

## 2. Resumen de Pro Git (Capítulos 1 y 2)
* **Capítulo 1 (Empezando):** Explica la importancia vital de los sistemas de control de versiones para el trabajo en equipo. En PUKAY,
* nos permite tener un historial seguro de los cambios. Si dos personas (o la IA) modifican un archivo a la vez, Git evita que se pierda el trabajo,
* permitiendo resolver conflictos de manera controlada.
* **Capítulo 2 (Fundamentos de Git):** Detalla el flujo de trabajo básico (`git init`, `git add`, `git commit`, `git push`). 
* **Aplicación en PUKAY:** Estos comandos son la base de nuestro repositorio. Gracias a este capítulo pudimos estructurar la carpeta `docs/`,
* subir las evidencias y, finalmente, crear la etiqueta (tag) `v0.2.0` para marcar formalmente esta entrega de la Semana 2.
