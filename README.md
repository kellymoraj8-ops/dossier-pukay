# 🏃 PUKAY — Arquitectura de Software y Cadena CASE

**Proyecto académico | Arquitectura de Software | 2026**

PUKAY es una aplicación móvil Android orientada al registro y seguimiento de actividades deportivas y metas personales.

Este repositorio contiene la documentación arquitectónica del proyecto y una **cadena CASE ejecutable** que permite validar el contrato de la API, realizar análisis estático, ejecutar pruebas automatizadas y generar documentación técnica.

---

## 1. Descripción del proyecto

PUKAY permite a los deportistas registrar sus entrenamientos, consultar actividades anteriores y realizar un seguimiento de sus objetivos personales.

### Funcionalidades principales

- Registro de usuarios.
- Inicio de sesión y autenticación.
- Consulta de disciplinas deportivas.
- Registro de actividades físicas.
- Consulta del historial de entrenamientos.
- Modificación y eliminación de actividades.
- Registro y seguimiento de metas personales.
- Visualización del progreso deportivo.

El sistema utiliza una arquitectura cliente-servidor que separa la interfaz móvil, la lógica del servidor y el almacenamiento de información.

## 2. Objetivo general

Desarrollar y documentar una solución de seguimiento deportivo mediante una arquitectura cliente-servidor, aplicando decisiones arquitectónicas justificadas y herramientas CASE que permitan verificar la calidad del software, la consistencia del contrato de la API y el cumplimiento de los criterios de aceptación.

### Objetivos específicos

1. Documentar los requisitos, restricciones y drivers arquitectónicos.
2. Representar la arquitectura mediante diagramas C4.
3. Justificar las decisiones técnicas mediante registros ADR.
4. Especificar los servicios mediante OpenAPI.
5. Automatizar pruebas funcionales con Cucumber-JS.
6. Integrar verificaciones de calidad y seguridad con GitHub Actions.
7. Proporcionar evidencias reproducibles del funcionamiento de la cadena CASE.

---

## 3. Arquitectura del sistema

PUKAY se organiza en tres componentes principales:

| Componente | Tecnología | Responsabilidad |
|---|---|---|
| Cliente móvil | Android, Java y XML | Interfaz de usuario y operaciones de la aplicación |
| Backend principal | PHP y API REST | Procesamiento de solicitudes, autenticación y reglas de negocio |
| Base de datos | MySQL | Almacenamiento centralizado de usuarios, actividades y metas |

### Flujo de comunicación

```text
┌──────────────────────────┐
│    Aplicación Android    │
│       Java + XML         │
└────────────┬─────────────┘
             │
             │ Solicitudes HTTPS / JSON
             ▼
┌──────────────────────────┐
│        API REST          │
│           PHP            │
└────────────┬─────────────┘
             │
             │ Consultas mediante PDO
             ▼
┌──────────────────────────┐
│       Base de datos      │
│          MySQL           │
└──────────────────────────┘
```

La aplicación Android no accede directamente a MySQL. Todas las operaciones de almacenamiento se realizan a través del backend.

### Arquitectura del cliente

El cliente utiliza el patrón **MVVM + Repository**, que permite separar las responsabilidades de presentación, lógica de aplicación y acceso a datos.

### Seguridad

El diseño contempla:

- Protección de contraseñas mediante funciones de hash.
- Autenticación mediante tokens.
- Control de acceso a la información de cada usuario.
- Comunicación mediante HTTPS.
- Acceso a MySQL exclusivamente desde el servidor.

---

## 4. Tecnologías y herramientas

| Categoría | Tecnología | Utilización |
|---|---|---|
| Aplicación móvil | Android Studio | Desarrollo de la aplicación |
| Lenguaje móvil | Java | Implementación de funcionalidades |
| Interfaces | XML | Diseño de pantallas |
| Arquitectura del cliente | MVVM + Repository | Separación de responsabilidades |
| Backend principal | PHP | Implementación de servicios REST |
| Servidor de desarrollo | Apache / XAMPP | Ejecución local del backend |
| Base de datos | MySQL | Persistencia centralizada |
| Acceso a datos | PDO | Comunicación PHP–MySQL |
| Servidor de pruebas | Node.js | Ejecución de servicios de la cadena CASE |
| Contrato de API | OpenAPI | Especificación de servicios |
| Validación del contrato | Spectral | Análisis de reglas OpenAPI |
| Pruebas de aceptación | Cucumber-JS | Ejecución de escenarios Gherkin |
| Calidad de código | ESLint | Análisis estático de JavaScript |
| Generación de código | OpenAPI Generator | Generación de stubs |
| Automatización | GitHub Actions | Integración continua |
| Seguridad | CodeQL | Análisis de código |
| Dependencias | Dependabot | Identificación de vulnerabilidades |
| Control de versiones | Git y GitHub | Historial y colaboración |
| Documentación | Markdown y Mermaid | Documentación y diagramas |
| Plataforma de despliegue | Render | Entorno previsto para el servidor Node.js |

---

## 5. Documentación arquitectónica

El dossier de PUKAY documenta el contexto del sistema, las restricciones, los escenarios de calidad, las vistas arquitectónicas y las decisiones técnicas.

### Parte I. Contexto y drivers arquitectónicos

| Documento | Descripción |
|---|---|
| [Índice de la Parte I](docs/01-contexto-y-drivers/README.md) | Organización de la primera parte del dossier |


### Parte II. Vistas arquitectónicas C4

| Documento | Descripción |
|---|---|
| [C4 Nivel 1 — Contexto](docs/02-vistas-c4/c4-nivel1.md) | Relación entre PUKAY y sus usuarios |
| [C4 Nivel 2 — Contenedores](docs/02-vistas-c4/c4-nivel2.md) | Aplicación Android, API REST y MySQL |

### Decisiones arquitectónicas

Las decisiones se documentan mediante registros ADR:

- **ADR-001:** Persistencia centralizada mediante MySQL.
- **ADR-002:** Protección de credenciales y autenticación.
- **ADR-003:** Arquitectura cliente-servidor mediante API REST.

[Consultar las decisiones arquitectónicas](docs/03-adr/)

### Parte III. Evaluación arquitectónica

Se comparan tres alternativas:

| Identificador | Alternativa |
|---|---|
| A1 | Aplicación autónoma con almacenamiento local |
| A2 | Arquitectura cliente-servidor mediante API REST |
| A3 | Backend como servicio |

La alternativa seleccionada es **A2: cliente-servidor mediante API REST**, por su alineación con las restricciones del proyecto y la necesidad de centralizar los datos.



---

## 6. Cadena CASE de PUKAY

La cadena CASE integra herramientas que permiten verificar diferentes aspectos del proyecto mediante procedimientos reproducibles.

### Flujo de trabajo

```text
Historias de usuario
        │
        ▼
Criterios de aceptación
        │
        ▼
Contrato OpenAPI
        │
        ├──► Spectral: validación del contrato
        │
        ├──► OpenAPI Generator: generación de stubs
        │
        ▼
Servicios Node.js de pruebas
        │
        ├──► ESLint: calidad del código
        │
        └──► Cucumber-JS: pruebas automatizadas
                    │
                    ▼
              GitHub Actions
                    │
                    ├──► Validación del contrato
                    ├──► Calidad del código
                    ├──► Pruebas
                    └──► Documentación
```

### Herramientas y evidencias

| Herramienta | Función | Evidencia |
|---|---|---|
| OpenAPI | Definir el contrato REST | `api/openapi.yaml` |
| Spectral | Validar la especificación | `npm run lint:api` |
| OpenAPI Generator | Generar código base | Carpeta `stubs/` |
| ESLint | Analizar código JavaScript | `npm run lint` |
| Cucumber-JS | Ejecutar pruebas de aceptación | `npm test` |
| GitHub Actions | Automatizar verificaciones | `.github/workflows/` |
| CodeQL | Analizar problemas de seguridad | Resultados de Code Scanning |
| Dependabot | Detectar dependencias vulnerables | Alertas de Dependabot |

**Importante:** el servidor Node.js se utiliza para las pruebas y la cadena CASE. No reemplaza al backend PHP/MySQL de la aplicación Android.

---

## 7. Historias de usuario y criterios de aceptación

La cadena CASE utiliza historias de usuario para relacionar las funcionalidades del sistema con pruebas verificables.

| Historia | Funcionalidad |
|---|---|
| HU1 | Registro de usuarios |
| HU2 | Inicio de sesión |
| HU3 | Consulta de deportes |
| HU4 | Registro de actividades |
| HU5 | Consulta del historial |
| HU6 | Modificación y eliminación de actividades |

Los criterios de aceptación se expresan mediante escenarios Gherkin, utilizando las estructuras **Dado, Cuando y Entonces**.

Esta organización permite relacionar los requisitos funcionales con las pruebas automatizadas.

[Consultar historias y criterios de aceptación](docs/07-historias-y-criterios.md)

---

## 8. Resultados de pruebas automatizadas

En la ejecución local verificada de la cadena CASE se obtuvieron los siguientes resultados:

| Indicador | Resultado |
|---|---|
| Escenarios Cucumber | 17 aprobados de 17 |
| Pasos Cucumber | 96 aprobados de 96 |
| Análisis ESLint | Ejecución sin errores |
| Instalación de dependencias | Completada |

Salida de Cucumber-JS:

```text
17 scenarios (17 passed)
96 steps (96 passed)
```

Estos resultados corresponden a la ejecución local comprobada durante el desarrollo. Para conocer el estado actualizado del repositorio se deben consultar las ejecuciones de GitHub Actions.

[Consultar GitHub Actions](https://github.com/kellymoraj8-ops/dossier-pukay/actions)

---

## 9. Ejecución local de la cadena CASE

### Requisitos previos

- Node.js 18 o superior, compatible con las dependencias instaladas.
- npm.
- Git.
- Conexión a Internet para instalar las dependencias.

### Paso 1. Clonar el repositorio

```bash
git clone https://github.com/kellymoraj8-ops/dossier-pukay.git
cd dossier-pukay
```

### Paso 2. Instalar las dependencias

```bash
npm ci
```

Este comando instala las dependencias definidas en el archivo de bloqueo del proyecto.

### Paso 3. Validar el contrato OpenAPI

```bash
npm run lint:api
```

Utiliza Spectral para revisar la especificación `api/openapi.yaml` conforme a las reglas de `.spectral.yaml`.

### Paso 4. Analizar la calidad del código

```bash
npm run lint
```

Ejecuta ESLint sobre el código JavaScript.

### Paso 5. Ejecutar pruebas automatizadas

```bash
npm test
```

Ejecuta los escenarios de aceptación implementados mediante Cucumber-JS.

### Paso 6. Iniciar el servidor de pruebas

```bash
npm start
```

Inicia el servidor Node.js definido en `src/iniciar.js`.

Para detenerlo, utilizar `Ctrl + C`.

### Paso 7. Generar los stubs

```bash
npm run stubs
```

Genera el esqueleto del servidor Express en `stubs/`, utilizando la especificación OpenAPI.

**Precaución:** la regeneración puede sobrescribir modificaciones manuales del código generado, incluidas medidas de seguridad. Se recomienda revisar los cambios antes de incorporarlos al repositorio.

### Paso 8. Generar documentación HTML

El proyecto contempla la generación de documentación técnica a partir del contrato OpenAPI.

El comando debe verificarse en el `package.json` vigente antes de ejecutarlo. En configuraciones anteriores se utilizó:

```bash
npm run docs:html
```

---

## 10. Integración continua con GitHub Actions

El repositorio utiliza GitHub Actions para automatizar controles de calidad cuando se proponen o integran cambios.

Las verificaciones incluyen:

1. **Calidad:** análisis del código con ESLint.
2. **Contrato:** validación de la especificación OpenAPI.
3. **Pruebas:** ejecución de escenarios Cucumber-JS.
4. **Documentación:** comprobaciones relacionadas con la documentación.
5. **Seguridad:** análisis estático mediante CodeQL.

Los Pull Requests permiten revisar los cambios antes de integrarlos a la rama `main`.

La integración debe respetar las reglas de protección de la rama principal y las aprobaciones requeridas.

[Ver ejecuciones de CI](https://github.com/kellymoraj8-ops/dossier-pukay/actions)

---

## 11. Seguridad y gestión de dependencias

La calidad del software también incluye la identificación y tratamiento de posibles vulnerabilidades.

### CodeQL

CodeQL analiza el código fuente para identificar patrones potencialmente inseguros.

### Dependabot

Dependabot revisa las dependencias utilizadas por el proyecto y genera alertas cuando detecta versiones asociadas con vulnerabilidades conocidas.

Las alertas deben evaluarse considerando:

- La severidad del problema.
- La dependencia afectada.
- Si se utiliza en desarrollo o en ejecución.
- La disponibilidad de una versión corregida.
- El impacto de actualizarla sobre las pruebas existentes.

**Estado de seguridad:** durante el desarrollo se identificaron alertas de dependencias, incluidas vulnerabilidades en paquetes transitivos y herramientas de desarrollo. Su tratamiento forma parte del mantenimiento del proyecto. La aprobación de las pruebas funcionales no significa que todas las vulnerabilidades estén resueltas.

[Consultar seguridad del repositorio](https://github.com/kellymoraj8-ops/dossier-pukay/security)

---

## 12. Despliegue en Render

El proyecto contempla el despliegue del servidor Node.js de la cadena CASE mediante Render.

### Objetivo del despliegue

Permitir que el servidor de pruebas pueda ejecutarse en un entorno accesible mediante Internet, sin depender exclusivamente de una computadora local.

### Automatización del despliegue

El repositorio incluye un flujo de trabajo de despliegue continuo definido en:

```text
.github/workflows/cd.yml
```

Este flujo contempla la solicitud de despliegue a Render cuando se cumplen las condiciones configuradas.

### Configuración

La automatización utiliza parámetros de GitHub Actions, como:

| Parámetro | Función |
|---|---|
| `URL_PRODUCCION` | Identificar la dirección del entorno de producción |
| `RENDER_DEPLOY_HOOK` | Autorizar la solicitud de despliegue mediante un secreto |

El valor del webhook debe almacenarse como secreto y no incorporarse directamente al código fuente.

### Estado del despliegue

La ejecución del flujo CD debe comprobarse en GitHub Actions y en el panel de Render.

Un flujo marcado como **Skipped** significa que no se ejecutó el trabajo de despliegue. No constituye evidencia de que el servidor esté funcionando en producción.

La URL pública y el estado operativo deben incorporarse únicamente después de verificar el servicio desplegado.

[Consultar flujo de despliegue](https://github.com/kellymoraj8-ops/dossier-pukay/actions)

---

## 13. Trazabilidad del proyecto

La documentación utiliza identificadores para relacionar requisitos, decisiones arquitectónicas y pruebas.

| Identificador | Significado |
|---|---|
| S1–S5 | Stakeholders |
| R1–R6 | Restricciones |
| D1–D5 | Drivers arquitectónicos |
| E1–E6 | Escenarios de calidad |
| A1–A3 | Alternativas arquitectónicas |
| ADR-001–ADR-003 | Decisiones arquitectónicas |
| HU1–HU6 | Historias de usuario |
| CA1–CA17 | Criterios de aceptación |

La trazabilidad facilita comprobar que las funcionalidades y decisiones implementadas responden a las necesidades documentadas.

---

## 14. Uso responsable de inteligencia artificial

Durante la elaboración del dossier se utilizó ChatGPT como herramienta de apoyo para revisar, organizar y mejorar la documentación arquitectónica.

Las propuestas se contrastaron con los requisitos, las decisiones del equipo y las evidencias disponibles.

La responsabilidad de revisar y aprobar las decisiones arquitectónicas corresponde al equipo de desarrollo.

[Consultar registro de uso y contraste de IA](docs/04-registro-ia.md)

El registro incluye:

- Tabla 34. Uso de IA en la elaboración del borrador del dossier.
- Tabla 35. Registro del contraste con IA.
- Solicitudes realizadas y resultados obtenidos.
- Decisiones de aceptación, modificación o rechazo.

---

## 15. Evidencias para la defensa del proyecto

Durante la presentación se recomienda demostrar:

| Evidencia | Qué demuestra |
|---|---|
| Diagramas C4 | Organización y separación de componentes |
| Registros ADR | Justificación de decisiones técnicas |
| `api/openapi.yaml` | Contrato de los servicios REST |
| Spectral | Validación automatizada del contrato |
| Carpeta `stubs/` | Generación de código a partir de OpenAPI |
| Cucumber-JS | Verificación de criterios de aceptación |
| ESLint | Revisión de calidad del código |
| GitHub Actions | Automatización de verificaciones |
| CodeQL y Dependabot | Identificación de problemas de seguridad |
| Render, si está operativo | Ejecución del servidor en un entorno remoto |

---

## 16. Conclusiones

PUKAY integra una aplicación móvil de seguimiento deportivo con una arquitectura cliente-servidor basada en API REST y persistencia centralizada.

El dossier permite justificar las decisiones de arquitectura mediante restricciones, drivers, escenarios de calidad, diagramas C4 y registros ADR.

La cadena CASE complementa esta documentación con herramientas que permiten validar el contrato de la API, ejecutar pruebas automatizadas, analizar la calidad del código y registrar evidencias reproducibles.

La incorporación de GitHub Actions, CodeQL y Dependabot contribuye a establecer un proceso de integración, revisión y mejora continua.

El proyecto demuestra la relación entre la arquitectura diseñada, los requisitos funcionales y los mecanismos utilizados para comprobar la calidad del software.

---

**Proyecto:** PUKAY  
**Área:** Arquitectura de Software  
**Año:** 2026  
**Repositorio:** https://github.com/kellymoraj8-ops/dossier-pukay
