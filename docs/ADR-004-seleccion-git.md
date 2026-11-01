
# ADR-004: Selección de Git como sistema de control de versiones

**Estado:** Aceptado  
**Fecha:** 2026-11-01  
**Proyecto:** PUKAY  
**Responsables:** Equipo de desarrollo PUKAY

## 1. Contexto

PUKAY es una aplicación Android para el registro y seguimiento de actividades deportivas y metas personales.

Su arquitectura contempla un cliente Android desarrollado en Java y XML, una API REST en PHP y una base de datos MySQL.

El equipo necesita gestionar los cambios de código y documentación de forma colaborativa, mantener un historial verificable y evitar modificaciones no revisadas en la rama principal.

Se requiere un sistema de control de versiones que permita:

- Trabajar mediante ramas independientes.
- Registrar cambios mediante commits identificables.
- Realizar revisiones cruzadas antes de integrar cambios.
- Relacionar tareas, issues y Pull Requests.
- Mantener versiones identificadas mediante SemVer.
- Facilitar el trabajo distribuido de los integrantes.

Se evaluaron Git y Subversion (SVN) como alternativas.

## 2. Decisión

Se selecciona **Git**, utilizando GitHub como plataforma de colaboración y alojamiento del repositorio.

El equipo adoptará un flujo basado en GitHub Flow:

1. Crear un issue para registrar el trabajo.
2. Crear una rama corta desde `main`.
3. Realizar cambios y registrarlos mediante Conventional Commits.
4. Abrir un Pull Request vinculado al issue.
5. Solicitar revisión cruzada de otro integrante.
6. Fusionar los cambios después de cumplir las reglas de protección.
7. Eliminar la rama temporal cuando corresponda.

La rama `main` estará protegida mediante Pull Requests obligatorios y al menos una aprobación válida.

El archivo `.github/CODEOWNERS` identificará a los responsables de revisar las diferentes áreas del repositorio.

Las versiones del proyecto se identificarán mediante etiquetas SemVer.

## 3. Alternativa considerada: Subversion (SVN)

Subversion es un sistema de control de versiones centralizado.

Dispone de un repositorio principal que mantiene el historial y permite administrar permisos sobre rutas específicas.

Entre sus características se encuentran:

- Administración centralizada del repositorio.
- Control de acceso por directorios.
- Historial de revisiones mantenido en el servidor.
- Posibilidad de crear ramas y fusionar cambios.
- Integración con herramientas como TortoiseSVN.

Sin embargo, para PUKAY presenta algunas limitaciones frente a Git:

- Los commits requieren comunicación con el servidor.
- El trabajo distribuido es menos flexible.
- El flujo de revisión mediante Pull Requests no forma parte de SVN por sí mismo y requiere herramientas adicionales.
- Muchas operaciones dependen de la disponibilidad del repositorio central.

## 4. Justificación de la decisión

Git se considera más adecuado para PUKAY por las siguientes razones:

### 4.1 Colaboración distribuida

Cada integrante puede disponer de una copia local del repositorio con su historial, realizar commits y crear ramas sin conexión permanente.

### 4.2 Gestión de ramas

Git permite trabajar mediante ramas cortas, facilitando que los cambios de diferentes integrantes se desarrollen y revisen de forma independiente.

### 4.3 Trazabilidad

Los commits, issues y Pull Requests permiten documentar qué se modificó, por qué se realizó el cambio y quién participó en su revisión.

### 4.4 Protección de la rama principal

GitHub permite establecer reglas para impedir la integración de cambios sin Pull Request y aprobación previa.

### 4.5 Integración con herramientas

Git cuenta con un ecosistema que facilita la integración con GitHub Actions, herramientas de análisis de código, pruebas automatizadas y gestión de versiones.

## 5. Consecuencias de la decisión

### 5.1 Consecuencias positivas

- Mayor autonomía de los integrantes.
- Historial distribuido y verificable.
- Facilidad para crear ramas y fusionar cambios.
- Revisiones cruzadas mediante Pull Requests.
- Integración con herramientas de automatización.
- Posibilidad de recuperar versiones anteriores.
- Mejor trazabilidad entre tareas y cambios.

### 5.2 Consecuencias negativas y riesgos

- Los integrantes deben aprender comandos y conceptos de Git.
- Pueden producirse conflictos durante la integración de ramas.
- Un uso incorrecto de `rebase`, `reset` o `push --force` puede afectar el historial.
- Las ramas de larga duración pueden complicar las fusiones.
- La configuración de permisos y revisiones depende de la plataforma de alojamiento utilizada.

### 5.3 Medidas de mitigación

- Documentar el flujo de trabajo en `CONTRIBUTING.md`.
- Utilizar Conventional Commits.
- Mantener ramas pequeñas y de corta duración.
- Exigir revisiones mediante Pull Requests.
- Proteger `main` contra cambios directos y force pushes.
- Documentar los conflictos y sus resoluciones.
- Verificar los cambios antes de fusionarlos.

## 6. ¿En qué caso se utilizaría SVN?

SVN sería apropiado en una organización que requiera administración centralizada del repositorio y permisos detallados por directorio.

Por ejemplo, una institución que mantenga un repositorio de documentos técnicos compartidos entre departamentos, donde cada área solo pueda modificar determinadas carpetas, podría beneficiarse del control de acceso por rutas que ofrece SVN.

También podría resultar conveniente cuando la organización ya dispone de infraestructura SVN, procesos consolidados y personal capacitado en esa herramienta.

En esos escenarios, migrar a Git no necesariamente aportaría beneficios suficientes para justificar los costos del cambio.

## 7. Relación con los requisitos del proyecto

| Necesidad de PUKAY | Solución seleccionada |
|---|---|
| Trabajo colaborativo | Git distribuido |
| Desarrollo independiente | Ramas de trabajo |
| Control de cambios | Commits convencionales |
| Revisión cruzada | Pull Requests |
| Protección de la rama principal | Rulesets de GitHub |
| Responsables por área | CODEOWNERS |
| Trazabilidad de tareas | Issues vinculados a PR |
| Identificación de versiones | Etiquetas SemVer |

## 8. Resultado de la decisión

Se adopta Git como sistema de control de versiones de PUKAY y GitHub como plataforma de colaboración.

Esta decisión favorece la trazabilidad, el trabajo distribuido y la revisión controlada de cambios.

SVN se mantiene como alternativa válida para escenarios que prioricen una administración centralizada y permisos específicos por rutas.

## 9. Documentos relacionados

- `README.md`
- `CONTRIBUTING.md`
- `.github/CODEOWNERS`
- `docs/08-matriz-git-vs-svn.md`
- Issue #11: Documentar ADR-004 selección de Git para PUKAY.

## 10. Referencias bibliográficas

Chacon, S., & Straub, B. (2014). *Pro Git* (2nd ed.). Apress. https://git-scm.com/book/es/v2

Collins-Sussman, B., Fitzpatrick, B. W., & Pilato, C. M. (2011). *Version control with Subversion: For Subversion 1.7*. O'Reilly Media. https://svnbook.red-bean.com

Conventional Commits. (s. f.). *Conventional Commits 1.0.0*. https://www.conventionalcommits.org/es/v1.0.0/

Preston-Werner, T. (s. f.). *Semantic Versioning 2.0.0*. https://semver.org/lang/es/
