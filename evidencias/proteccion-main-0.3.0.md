

\# Evidencia de protección de la rama main — PUKAY



\*\*Fecha:\*\* 2026-11-06  

\*\*Versión:\*\* 0.3.0  

\*\*Repositorio:\*\* dossier-pukay  

\*\*Estado:\*\* Verificado



\## 1. Objetivo



Comprobar que la rama principal `main` está protegida contra modificaciones directas y que los cambios requieren revisión antes de integrarse.



\## 2. Configuración de protección



La rama `main` cuenta con reglas que exigen:



\- Crear un Pull Request para incorporar cambios.

\- Obtener al menos una aprobación de un integrante autorizado.

\- Superar las verificaciones automáticas requeridas.



\## 3. Prueba realizada



Durante la actualización de la cadena CASE de PUKAY se intentó publicar un commit directamente en `main`.



GitHub rechazó la operación debido a las reglas de protección configuradas.



Para continuar, se creó la rama `docs/correcciones-cadena-case` y se abrió el Pull Request #32.



\## 4. Resultados



| Verificación | Resultado |

|---|---|

| Rechazo de push directo a main | Exitoso |

| Creación de rama independiente | Exitoso |

| Creación de Pull Request | Exitoso |

| Ejecución de verificaciones CI y CodeQL | Exitoso |

| Aprobación de otro integrante | Exitoso |

| Integración mediante Pull Request | Exitoso |



\## 5. Evidencias



\- \[Pull Request #32](https://github.com/kellymoraj8-ops/dossier-pukay/pull/32)

\- Capturas de la configuración de protección de main.

\- Captura del rechazo del push directo, si está disponible.

\- Historial de verificaciones y aprobación del Pull Request.



\## 6. Conclusión



La prueba confirma que el flujo de trabajo de PUKAY exige utilizar ramas independientes y Pull Requests para integrar cambios en `main`.



La protección de la rama principal y la revisión colaborativa fueron comprobadas durante el proceso de integración del PR #32.



