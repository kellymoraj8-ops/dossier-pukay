
# Parte III. Evaluación y Selección del Estilo Arquitectónico

## Paso 11. Alternativas de Estilo Arquitectónico

### Objetivo

Identificar las alternativas de estilo arquitectónico que podrían utilizarse para implementar el sistema PUKAY.

La evaluación considera las necesidades funcionales, los drivers arquitectónicos, los escenarios de calidad y las restricciones técnicas y organizacionales del proyecto.

Se establecen tres alternativas: A1, A2 y A3.

---

## Tabla 23. Alternativas de Estilo Arquitectónico

| ID | Alternativa | Descripción | Costo operativo |
|---|---|---|---|
| **A1** | Aplicación autónoma | Una sola aplicación Android con base de datos local en el dispositivo y sin servidor. | Bajo: no hay servidor que mantener. |
| **A2** | Cliente-servidor con API REST | Aplicación Android con MVVM y Repository que consume una API REST en XAMPP con MySQL. | Medio: un servidor y una API que mantener, con tecnologías conocidas. |
| **A3** | Backend como servicio | Aplicación Android que usa un servicio de terceros para autenticación y datos. | Medio-alto: cuenta y SDK de un proveedor que aprender y del que depender. |

*Nota. Elaboración propia a partir de la Tabla 6 de Arévalo et al. (2026).*

---

## Descripción de las alternativas

### A1. Aplicación autónoma

Esta alternativa propone desarrollar PUKAY como una aplicación Android independiente, utilizando una base de datos local en el dispositivo.

**Características:**

- No requiere un servidor externo.
- La información se almacena directamente en el dispositivo.
- Presenta un costo operativo bajo.
- La gestión de datos depende del almacenamiento local.

**Consideración arquitectónica:**

Esta alternativa no satisface las restricciones R1 y R2 del proyecto, que exigen el uso de una API REST y el acceso a la base de datos mediante el backend.

---

### A2. Cliente-servidor con API REST

Esta alternativa propone separar la aplicación Android, la lógica del servidor y la persistencia de datos.

**Características:**

- Cliente Android organizado con MVVM y Repository.
- API REST desarrollada en PHP.
- Servidor Apache mediante XAMPP.
- Base de datos MySQL.
- Comunicación mediante solicitudes HTTP y respuestas JSON.

**Consideración arquitectónica:**

Permite centralizar el almacenamiento, mantener separadas las responsabilidades del cliente y del servidor y reutilizar la API desde otros clientes.

Esta es la alternativa implementada en PUKAY.

---

### A3. Backend como servicio

Esta alternativa propone utilizar un servicio externo que proporcione funciones de autenticación y almacenamiento de datos.

**Características:**

- Utiliza infraestructura administrada por un proveedor.
- Reduce la necesidad de administrar directamente un servidor.
- Requiere aprender e integrar los servicios y SDK del proveedor.
- Introduce dependencia de una plataforma externa.

**Consideración arquitectónica:**

Aunque puede simplificar determinadas tareas de infraestructura, presenta diferencias respecto a las restricciones del proyecto, que contemplan una API REST propia, XAMPP y MySQL.

---

## Relación con los drivers arquitectónicos

Las tres alternativas se compararán considerando los siguientes drivers:

| Driver | Aspecto evaluado |
|---|---|
| **D1** | Protección de credenciales y comunicaciones. |
| **D2** | Aislamiento de datos por usuario. |
| **D3** | Mantenibilidad y localización de cambios. |
| **D4** | Reutilización del backend por otros clientes. |
| **D5** | Registro rápido de actividades y consulta del progreso. |

---

## Conclusión

Las alternativas A1, A2 y A3 representan diferentes formas de organizar la arquitectura del sistema PUKAY.

La alternativa **A2: Cliente-servidor con API REST** corresponde a la arquitectura implementada.

La justificación de su selección se desarrollará mediante una matriz de evaluación ponderada, considerando los escenarios de calidad, las restricciones y los criterios definidos en el dossier.

---

## Navegación

[Volver al índice de evaluación arquitectónica](README.md)

[Consultar Contexto y Drivers](../01-contexto-y-drivers/README.md)

[Consultar C4 Nivel 2](../02-vistas-c4/c4-nivel2.md)
