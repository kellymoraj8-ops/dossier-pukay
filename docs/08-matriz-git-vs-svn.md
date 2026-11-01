
# Matriz comparativa Git vs SVN — Proyecto PUKAY

## 1. Objetivo

Comparar Git y Subversion (SVN) como sistemas de control de versiones para justificar la selección de Git en el proyecto PUKAY.

## 2. Contexto del proyecto

PUKAY es una aplicación Android de seguimiento deportivo, desarrollada con Java y XML, que se comunica mediante una API REST en PHP con una base de datos MySQL.

El proyecto requiere colaboración entre integrantes, trazabilidad de cambios, revisión cruzada, protección de la rama principal y publicación de versiones.

## 3. Matriz comparativa

| Criterio | Git | Subversion (SVN) | Aplicación en PUKAY |
|---|---|---|---|
| Modelo | Sistema distribuido. Cada clon contiene el historial del repositorio. | Sistema centralizado, con un repositorio principal en el servidor. | Git permite que cada integrante trabaje con su propia copia del historial. |
| Historial | Los commits se registran localmente y pueden compartirse con el repositorio remoto. | Las revisiones se registran principalmente en el repositorio central. | Git facilita identificar los cambios y responsables mediante commits y Pull Requests. |
| Ramas | Permite crear y fusionar ramas de manera eficiente. | Las ramas se representan como rutas dentro del repositorio y pueden fusionarse. | Git facilita trabajar con ramas cortas y aplicar GitHub Flow. |
| Trabajo sin conexión | Permite realizar commits, consultar historial y crear ramas sin conexión. | Algunas operaciones pueden realizarse localmente, pero los commits requieren conexión al servidor. | Git permite continuar el trabajo cuando no existe conexión a Internet. |
| Permisos | Git por sí mismo no define permisos por carpeta; las plataformas como GitHub permiten gestionar accesos y reglas de protección. | SVN puede configurar permisos de acceso a rutas específicas del repositorio. | GitHub permite proteger `main` y exigir revisiones antes de integrar cambios. |
| Rendimiento | Muchas operaciones son locales, lo que reduce la dependencia de la red. | Las operaciones que requieren el servidor dependen de la conexión y su disponibilidad. | Git facilita consultar cambios y trabajar en ramas sin depender continuamente del servidor. |
| Ecosistema | Amplia integración con GitHub, GitLab, CI/CD y herramientas de revisión. | Compatible con clientes como TortoiseSVN e integraciones con herramientas de desarrollo. | Git se integra con Pull Requests, CODEOWNERS, issues y releases del proyecto. |

## 4. Justificación de la selección de Git

Se selecciona Git para PUKAY porque permite un flujo de trabajo distribuido, facilita la creación de ramas y proporciona trazabilidad de los cambios realizados por cada integrante.

Mediante GitHub, el equipo puede aplicar GitHub Flow, gestionar issues, realizar revisiones cruzadas mediante Pull Requests y proteger la rama `main`.

Estas capacidades contribuyen a mantener un proceso de desarrollo colaborativo y controlado.

## 5. ¿En qué caso sería conveniente SVN?

SVN sería una alternativa válida para una organización que necesite un repositorio centralizado y controles de acceso detallados sobre directorios específicos.

Por ejemplo, una organización que administre documentación compartida con permisos diferenciados por departamento podría preferir SVN si su infraestructura y procesos ya están basados en este sistema.

Sin embargo, para PUKAY se considera más adecuado Git por las necesidades de colaboración, ramas independientes y revisión mediante Pull Requests.

## 6. Conclusión

Ambos sistemas permiten controlar versiones y mantener un historial de cambios.

Git resulta más apropiado para PUKAY por su modelo distribuido y su integración con el flujo de colaboración utilizado por el equipo.

SVN continúa siendo una alternativa válida cuando se prioriza la administración centralizada y el control de acceso por rutas.

## 7. Referencias bibliográficas

Chacon, S., & Straub, B. (2014). *Pro Git* (2.ª ed.). Apress. https://git-scm.com/book/es/v2

Collins-Sussman, B., Fitzpatrick, B. W., & Pilato, C. M. (2011). *Version control with Subversion: For Subversion 1.7*. O'Reilly Media. https://svnbook.red-bean.com
