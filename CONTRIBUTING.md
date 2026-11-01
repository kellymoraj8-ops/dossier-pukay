
# Guía de contribución — PUKAY

## 1. Objetivo

Este documento establece las normas de colaboración, control de versiones, revisión de cambios y aseguramiento de calidad para el proyecto PUKAY, una aplicación Android destinada al registro y seguimiento de actividades deportivas.

Su propósito es facilitar el trabajo colaborativo, proteger la estabilidad del proyecto y mantener la trazabilidad entre requisitos, código, pruebas y documentación.

## 2. Integrantes del equipo

| Integrante | Responsabilidad principal |
|---|---|
| Oscar Arévalo | Desarrollo técnico, integración de componentes y ejecución de pruebas |
| Katherin Siza | Revisión de requisitos, documentación y criterios de aceptación |
| Kelly Mora | Gestión del repositorio, trazabilidad y revisión de entregables |

Las responsabilidades son una distribución inicial del trabajo y pueden ajustarse por acuerdo del equipo.

Todos los integrantes participan en la revisión y validación de los cambios antes de su incorporación a la rama principal.

## 3. Estructura del proyecto

El repositorio contiene los siguientes directorios:

- `api/`: contrato OpenAPI y documentación de servicios REST.
- `docs/`: requisitos, diagramas, decisiones arquitectónicas, historias de usuario, matrices y registros de IA.
- `src/`: código del prototipo y servicios utilizados en la cadena CASE.
- `tests/`: escenarios Gherkin y definiciones de pasos automatizados.
- `evidencias/`: capturas y resultados que respaldan las verificaciones realizadas.

También se utilizan archivos de configuración y documentación como `README.md`, `CHANGELOG.md`, `package.json` y `.gitignore`.

## 4. Estrategia de ramas

Se utilizará un flujo de trabajo basado en GitHub Flow.

### Rama principal

`main`

Contiene los cambios integrados y revisados del proyecto. No se recomienda modificarla directamente para desarrollar nuevas funcionalidades.

### Ramas de trabajo

Cada cambio deberá realizarse preferentemente en una rama independiente.

Convenciones:

- `feature/nombre-funcionalidad`: nuevas funcionalidades.
- `fix/nombre-error`: correcciones.
- `docs/nombre-documento`: documentación.
- `test/nombre-prueba`: pruebas.
- `chore/nombre-tarea`: configuración o mantenimiento.

Ejemplos:

- `feature/registro-actividades`
- `fix/validacion-duracion`
- `docs/actualizar-trazabilidad`
- `test/escenarios-cucumber`

Los nombres deben ser cortos, descriptivos y utilizar guiones para separar palabras.

## 5. Procedimiento para contribuir

1. Revisar la tarea y sus requisitos.
2. Crear una rama de trabajo a partir de `main`.
3. Realizar los cambios necesarios.
4. Revisar los archivos modificados.
5. Ejecutar las verificaciones aplicables.
6. Registrar los cambios mediante commits descriptivos.
7. Publicar la rama en GitHub.
8. Crear un Pull Request hacia `main`.
9. Solicitar una revisión a otro integrante.
10. Resolver observaciones y conflictos antes de integrar los cambios.

No deben incorporarse archivos temporales, contraseñas, tokens reales ni información sensible.

## 6. Convención de commits

Se utilizarán mensajes inspirados en Conventional Commits.

Formato:

`tipo(alcance): descripción breve`

Tipos recomendados:

| Tipo | Uso |
|---|---|
| `feat` | Incorporar una funcionalidad |
| `fix` | Corregir un error |
| `docs` | Actualizar documentación |
| `test` | Agregar o modificar pruebas |
| `refactor` | Reorganizar código sin alterar su comportamiento esperado |
| `chore` | Realizar tareas de mantenimiento |
| `ci` | Modificar automatizaciones de integración continua |

Ejemplos:

`feat(actividades): agregar validacion de duracion`

`docs(case): actualizar matriz de herramientas`

`test(cucumber): agregar escenario de eliminacion`

`fix(api): corregir respuesta de actividad inexistente`

Cada commit debe representar un cambio coherente y fácil de revisar.

## 7. Pull Requests

Todo Pull Request debe indicar:

- Objetivo del cambio.
- Archivos o componentes modificados.
- Requisito o historia de usuario relacionada, cuando corresponda.
- Pruebas realizadas y resultados obtenidos.
- Riesgos, limitaciones o tareas pendientes.

### Criterios de revisión

Antes de aprobar un Pull Request se debe comprobar que:

- Los cambios cumplen el requisito solicitado.
- El código y la documentación son comprensibles.
- No se introducen datos sensibles.
- Las pruebas aplicables se ejecutaron correctamente.
- Se mantienen las convenciones de nombres e identificadores.
- Los cambios no contradicen las decisiones arquitectónicas documentadas.

Se recomienda que al menos un integrante distinto del autor revise el Pull Request antes de integrarlo.

## 8. Protección de la rama principal

Se propone configurar las siguientes reglas para `main`, cuando los permisos del repositorio lo permitan:

- Requerir Pull Request antes de integrar cambios.
- Requerir al menos una aprobación.
- Impedir la integración cuando existan conflictos.
- Requerir verificaciones automatizadas cuando estén configuradas.
- Evitar cambios directos que omitan el proceso de revisión.

Estas reglas constituyen la política propuesta del equipo. Su configuración efectiva deberá comprobarse en GitHub.

## 9. Validación y pruebas

Para el prototipo Node.js de la cadena CASE se utilizarán las siguientes verificaciones, según corresponda.

### Instalar dependencias

```bash
npm install
```

### Ejecutar pruebas automatizadas

```bash
npm test
```

### Ejecutar análisis estático

```bash
npm run lint
```

### Validar el contrato OpenAPI

```bash
npx @stoplight/spectral-cli lint api/openapi.yaml
```

En PowerShell, si existe una restricción para ejecutar los comandos de npm, se puede utilizar `npm.cmd` y `npx.cmd`.

Los resultados deben documentarse de manera verificable.

Las pruebas del prototipo Node.js no sustituyen las pruebas de integración de la aplicación Android con el backend PHP y la base de datos MySQL.

## 10. Trazabilidad

Cuando corresponda, los cambios deberán relacionarse con:

- Historias de usuario: `HU`.
- Criterios de aceptación: `CA`.
- Casos de prueba: `CP`.
- Escenarios de calidad: `E`.
- Decisiones arquitectónicas: `ADR`.

Los documentos de referencia incluyen:

- `docs/06-mapa-toolchain.md`
- `docs/07-historias-y-criterios.md`
- `docs/08-matriz-trazabilidad.md`
- `docs/09-matriz-evaluacion-case.md`

Se debe mantener coherencia entre los identificadores utilizados en los documentos, el contrato OpenAPI y las pruebas.

## 11. Uso responsable de inteligencia artificial

La inteligencia artificial puede utilizarse como herramienta de apoyo para redactar, revisar, organizar o proponer soluciones técnicas.

Sin embargo:

- Ninguna respuesta generada por IA debe aceptarse automáticamente.
- Los resultados deben contrastarse con los requisitos.
- El código propuesto debe revisarse y probarse.
- Las limitaciones y errores encontrados deben registrarse.
- El equipo conserva la responsabilidad de las decisiones finales.

El registro correspondiente se mantiene en:

`docs/04-registro-ia.md`

## 12. Gestión de conflictos

Cuando dos integrantes modifiquen el mismo archivo:

1. Identificar los cambios de ambas ramas.
2. Revisar las diferencias.
3. Conservar el contenido necesario de cada versión.
4. Eliminar los marcadores de conflicto.
5. Verificar que el archivo resultante sea válido.
6. Ejecutar las pruebas pertinentes.
7. Registrar la resolución antes de completar la integración.

No se debe resolver un conflicto eliminando contenido sin comprobar su utilidad.

## 13. Criterios de finalización

Una tarea se considera terminada cuando:

- Cumple el requisito definido.
- Sus cambios están documentados.
- Las verificaciones aplicables se ejecutaron.
- No presenta conflictos pendientes.
- Ha sido revisada por otro integrante, cuando corresponda.
- Se ha integrado mediante el procedimiento acordado.
- Se conserva evidencia cuando la actividad académica la solicita.

## 14. Responsabilidad compartida

Oscar Arévalo, Katherin Siza y Kelly Mora comparten la responsabilidad de mantener la calidad, coherencia y trazabilidad del proyecto PUKAY.

La colaboración debe basarse en comunicación clara, revisión respetuosa y decisiones técnicas justificadas.
