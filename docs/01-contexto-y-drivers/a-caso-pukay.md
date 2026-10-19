
# 1. El Caso y la Convención de Identificadores

## 1.1. El Caso PUKAY

**PUKAY** es una aplicación móvil nativa para Android que permite registrar actividades deportivas y dar seguimiento a metas personales (Arévalo et al., 2026).

Se desarrolló como proyecto final de la asignatura Arquitectura de Software con una arquitectura cliente-servidor, compuesta por:

- Aplicación móvil Android organizada con MVVM y Repository.
- API REST implementada sobre Apache de XAMPP.
- Base de datos MySQL para el almacenamiento de información.

Este dossier documenta la arquitectura para la asignatura Automatización de Procesos de Software y sigue el modelo de la cátedra:

1. **Parte I:** Drivers y escenarios de calidad.
2. **Parte II:** Vistas C4 y decisiones arquitectónicas.
3. **Parte III:** Comparación y selección del estilo arquitectónico.

### Descripción del problema

Muchas personas practican varias disciplinas deportivas, pero la información de sus entrenamientos queda dispersa, lo que dificulta conocer su frecuencia y su avance hacia metas concretas (Arévalo et al., 2026).

PUKAY responde a esta necesidad mediante cuatro procesos principales:

1. Registro e inicio de sesión.
2. Consulta y selección de actividad deportiva.
3. Registro de actividades.
4. Gestión de metas personales.

---

### Tabla 1. Resumen del Caso PUKAY

| Elemento | Descripción |
|---|---|
| **Casos de uso** | Registrarse e iniciar sesión; elegir uno de cinco deportes (running, caminata, ciclismo, fútbol y gimnasio); registrar una actividad con fecha, duración, distancia y observación; consultar el historial; crear metas y consultar su progreso. |
| **Elementos del sistema** | Aplicación móvil Android, API REST y base de datos MySQL. El progreso de cada meta no se ingresa: el servidor lo calcula con las actividades del mismo deporte dentro del periodo. |
| **Sistema externo** | Ninguno. El servidor y la base de datos son contenedores propios del proyecto. |
| **Fuera del alcance** | Uso sin conexión, notificaciones, actualización en tiempo real, reportes avanzados y despliegue en un servidor público. |

*Nota. Elaboración propia a partir de Arévalo et al. (2026).*
