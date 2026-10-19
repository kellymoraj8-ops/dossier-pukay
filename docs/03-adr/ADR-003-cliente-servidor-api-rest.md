
## Tabla 30

### ADR-003: Estilo Cliente-Servidor con API REST y MVVM más Repository en el Cliente

| Campo | Contenido |
|---|---|
| **Título** | ADR-003: Estilo cliente-servidor con API REST y MVVM más Repository en el cliente |
| **Estado** | Aceptada. |
| **Contexto** | R1 exige servidores externos y API REST. Los drivers D3 (cambios localizados) y D4 (backend reutilizable) tienen importancia alta y el equipo cuenta con dos semanas y conocimientos de Android (R3, R4). La matriz ponderada favorece A2 (4,25) sobre A1 (3,40) y A3 (3,35). |
| **Decisión** | PUKAY es un sistema cliente-servidor. La aplicación Android se ocupa de la presentación. El backend, en Apache de XAMPP, expone una API REST sin estado sobre HTTPS con JSON y concentra la lógica de negocio. En el cliente se aplica MVVM con Repository: las vistas no acceden a la red, el ViewModel gestiona el estado de cada pantalla y el Repository es el único punto de acceso a la API, con llamadas asíncronas. |
| **Alternativas descartadas** | A1 aplicación autónoma: no hay backend reutilizable (E4) e incumple R1. A3 backend como servicio: dependencia de un proveedor e incumple R1. Lógica y red dentro de las Activities: alto acoplamiento y difícil de probar. Clean Architecture completa: complejidad excesiva para el alcance y el tiempo. |
| **Consecuencias a favor** | Separación de responsabilidades (E3). Backend reutilizable por otros clientes (E4). Seguridad concentrada en un solo lugar (E1, E2). Interfaz que no se bloquea durante las peticiones. |
| **Consecuencias en contra** | Dependencia de la red y del servidor (E6). Más complejidad de desarrollo y despliegue y más clases que un enfoque simple. Aplicación solo para Android en esta etapa. Debe revisarse si el funcionamiento sin conexión gana peso (sensibilidad del Paso 14). |
| **Vínculo** | Drivers D3, D4 y D5; escenarios E3, E4 y E6; restricciones R1, R3 y R4; ADR-001 y ADR-002; matriz ponderada del Paso 13; C4 nivel 2 del Paso 6. Evidencia: Tablas 6, 7, 16 y 18 del informe. |

*Nota. Elaboración propia a partir de Arévalo et al. (2026) y del formato de Nygard (2011).*
