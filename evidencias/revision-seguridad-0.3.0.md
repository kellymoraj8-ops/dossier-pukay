

\# Revisión de secretos y dependencias — PUKAY



\*\*Versión:\*\* 0.3.0  

\*\*Fecha:\*\* 2026-11-06  

\*\*Rama:\*\* docs/mejoras-adr004  

\*\*Estado:\*\* Revisión inicial realizada, hallazgos pendientes de tratamiento.



\## 1. Objetivo



Identificar posibles secretos expuestos en los archivos versionados y vulnerabilidades conocidas en las dependencias de la cadena CASE de PUKAY.



\## 2. Herramientas utilizadas



\- npm audit

\- git grep

\- GitHub CodeQL y Dependabot como controles complementarios



\## 3. Revisión de dependencias



\*\*Comando ejecutado:\*\*



`npm audit --audit-level=moderate`



\*\*Resultados:\*\*



| Severidad | Cantidad |

|---|---:|

| Alta | 13 |

| Moderada | 6 |

| Total | 19 |



La auditoría identificó dependencias vulnerables, entre ellas paquetes relacionados con ESLint, minimatch y uuid.



\*\*Tratamiento propuesto:\*\*



\- Revisar los avisos de seguridad y las versiones corregidas.

\- Priorizar las vulnerabilidades de severidad alta.

\- Evaluar actualizaciones compatibles antes de modificar dependencias.

\- Ejecutar nuevamente las pruebas y validaciones después de actualizar.

\- Evitar `npm audit fix --force` sin analizar los cambios incompatibles.



\*\*Estado:\*\* Pendiente de remediación.



\## 4. Revisión de posibles secretos



\*\*Comando ejecutado:\*\*



`git grep -n -I -E 'PRIVATE.KEY|BEGIN.\*PRIVATE KEY|password\[\[:space:]]\*=|api\[\_-]?key\[\[:space:]]\*='`



\*\*Hallazgo:\*\*



\- Archivo: `tests/steps/comunes.js`

\- Línea: 59

\- Coincidencia: asignación de una contraseña de prueba.



El valor identificado parece corresponder a datos de prueba utilizados por Cucumber.



\*\*Tratamiento propuesto:\*\*



\- Confirmar que la contraseña no se utiliza en entornos reales.

\- Mantener las credenciales reales fuera del código fuente.

\- Utilizar variables de entorno para secretos de ejecución.

\- Ampliar la revisión con herramientas especializadas de detección de secretos.



\*\*Estado:\*\* Pendiente de confirmar que se trata exclusivamente de un dato de prueba.



\## 5. Alcance y limitaciones



La revisión mediante `git grep` identifica únicamente determinados patrones en archivos versionados. No constituye una auditoría exhaustiva de secretos ni garantiza la ausencia de credenciales expuestas.



La auditoría npm identifica vulnerabilidades conocidas en las dependencias instaladas; no demuestra por sí sola que sean explotables en el entorno de PUKAY.



\## 6. Conclusión



Se ejecutaron comprobaciones iniciales de seguridad y se documentaron los hallazgos.



La revisión permitió identificar 19 vulnerabilidades de dependencias y una coincidencia que requiere confirmar su uso exclusivo en pruebas.



La remediación de dependencias y la ampliación de la búsqueda de secretos quedan como acciones de seguimiento.



