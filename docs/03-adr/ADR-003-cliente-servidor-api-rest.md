
## Tabla 30

### ADR-003: Estilo Cliente-Servidor con API REST y MVVM más Repository en el Cliente

| Campo | Contenido |
|---|---|
| **Título** | ADR-003: Estilo cliente-servidor con API REST y MVVM más Repository en el cliente |
| **Estado** | Aceptada. |
| **Contexto** | R1 exige servidores externos y API REST. Los drivers D3 (cambios localizados) y D4 (backend reutilizable) tienen importancia alta. El equipo cuenta con dos semanas y conocimientos de Android (R3, R4). La evaluación ponderada complementaria favorece A2 (4,30) sobre A3 (3,70) y A1 (2,70). |
| **Decisión** | PUKAY adopta una arquitectura cliente-servidor. La aplicación Android se encarga de la presentación. El backend PHP, ejecutado sobre Apache mediante XAMPP, expone una API REST con JSON y concentra la lógica de negocio y el acceso a MySQL. La comunicación se diseña para HTTPS. El cliente utiliza MVVM y Repository para separar la interfaz del acceso a datos y realizar solicitudes asíncronas. |
| **Alternativas descartadas** | A1: aplicación autónoma con almacenamiento local, incumple R1 y R2. A3: backend como servicio, introduce dependencia de un proveedor y no se ajusta a la infraestructura requerida. También se descarta concentrar la lógica de red en las Activities por su alto acoplamiento. |
| **Consecuencias a favor** | Separación de responsabilidades (E3), reutilización del backend (E4), centralización de controles de seguridad (E1, E2) y mejor organización del mantenimiento. |
| **Consecuencias en contra** | Dependencia de la conectividad y disponibilidad del servidor (E6), mayor complejidad de despliegue y mantenimiento de la API. |
| **Trade-offs** | A2 prioriza seguridad, mantenibilidad y reutilización frente a la disponibilidad sin conexión de A1 y la infraestructura administrada de A3. La dependencia del servidor se acepta porque el funcionamiento sin conexión está fuera del alcance del proyecto. |
| **Evidencia de evaluación** | La matriz ponderada compara A1, A2 y A3 frente a E1–E6, utilizando seis criterios cuyos pesos suman 100 %. A2 obtiene 4,30/5, A3 obtiene 3,70/5 y A1 obtiene 2,70/5. Las puntuaciones son valoraciones arquitectónicas complementarias, no resultados de pruebas de rendimiento. |
| **Vínculo** | Drivers D1–D5; escenarios E1–E6; restricciones R1–R4; ADR-001 y ADR-002; matriz ponderada del Paso 13; vista C4 nivel 2. |

### Evidencia de la decisión arquitectónica

La selección de A2 se fundamenta en la comparación ponderada de las tres alternativas.

**Resultados:**

- A1: 2,70/5.
- A2: 4,30/5.
- A3: 3,70/5.

La alternativa A2 presenta el mejor equilibrio entre los escenarios de calidad y satisface las restricciones obligatorias del proyecto.

El análisis de sensibilidad también permite identificar cómo cambia la evaluación cuando aumenta la importancia de la disponibilidad.

**[Consultar matriz ponderada y análisis de sensibilidad](../05-evaluacion-arquitectonica/02-matriz-ponderada.md)**

*Nota. Elaboración propia a partir de Arévalo et al. (2026), del formato de Nygard (2011) y de la evaluación arquitectónica complementaria.*
