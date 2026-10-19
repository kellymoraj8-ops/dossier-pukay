
# Parte I. Levantar los Drivers (Sesión 1)

## Paso 2. Restricciones y Supuestos

### Objetivo

Identificar las condiciones técnicas y organizacionales que limitan o condicionan las decisiones arquitectónicas del sistema PUKAY.

Las restricciones representan condiciones impuestas al proyecto y se clasifican según su origen y nivel de negociabilidad (Bass et al., 2021).

---

## Tabla 5. Restricciones del Proyecto, Origen y Negociabilidad

| ID | Tipo | Restricción | Origen | Negociable |
|---|---|---|---|---|
| **R1** | Técnica | Uso de servidores externos, API REST, XAMPP y MySQL. | Condición del proyecto final de Arquitectura de Software. | No |
| **R2** | Técnica | El acceso a la base de datos se hace únicamente mediante el backend. | Condición del proyecto final. | No |
| **R3** | Organizacional | Dos semanas de desarrollo. | Cronograma de la asignatura. | Sí |
| **R4** | Organizacional | Tres integrantes con conocimientos de Android Studio, Java y XML. | Equipo de desarrollo. | Parcial |
| **R5** | Técnica | Aplicación nativa para Android 7.0 (API 24) o superior. | Decisión del equipo (RNF09). | Parcial |
| **R6** | Técnica | El servidor XAMPP corre en un equipo de desarrollo y HTTPS usa un certificado de desarrollo. | Infraestructura disponible. | Parcial |

*Nota. Elaboración propia a partir de las Tablas 16, 17 y 21 de Arévalo et al. (2026). La negociabilidad es una valoración del equipo autor.*

---

## Supuestos adoptados

Para el diseño de la arquitectura de PUKAY se consideran los siguientes supuestos:

1. **Conectividad:** El deportista dispone de conexión a la red local mientras utiliza la aplicación.

2. **Catálogo deportivo:** El sistema contempla cinco deportes: running, caminata, ciclismo, fútbol y gimnasio.

3. **Disponibilidad del servidor:** El servidor XAMPP permanece encendido durante las pruebas del sistema.

4. **Idioma:** La aplicación se desarrolla para atender un solo idioma.

---

## Relación con las decisiones arquitectónicas

Las restricciones identificadas condicionan la selección de tecnologías y la organización del sistema.

- **R1 y R2:** Condicionan el uso de una API REST y el acceso centralizado a MySQL mediante el backend.
- **R3 y R4:** Influyen en la selección de una arquitectura que pueda desarrollarse con los conocimientos y recursos del equipo.
- **R5:** Define la compatibilidad mínima de la aplicación Android.
- **R6:** Condiciona la infraestructura disponible para las pruebas y el despliegue del servidor.

Estas restricciones serán consideradas en la definición de los drivers arquitectónicos, los escenarios de calidad y los registros de decisiones arquitectónicas (ADR).
