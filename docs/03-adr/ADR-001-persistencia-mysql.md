Tabla 15
ADR-001: Persistencia Centralizada en MySQL con Acceso Exclusivo desde el Backend (protege E5)
Campo	Contenido
Título	Persistencia centralizada en MySQL con acceso exclusivo desde el backend
Estado	Aceptada.
Contexto	PUKAY maneja usuarios, actividades y metas que requieren integridad y consultas por usuario, deporte y periodo (D5). Las restricciones R1 y R2 obligan a usar MySQL de XAMPP y a acceder a él solo mediante el backend. El deportista no debe perder su historial al cambiar de dispositivo (S1).
Decisión	Almacenar usuarios, actividades y metas en MySQL, al que solo accede el backend con un usuario de base de datos propio de PUKAY. La aplicación no guarda datos de negocio. El progreso y el estado de las metas no se guardan: se calculan en cada consulta con las actividades del mismo deporte dentro del periodo de la meta.
Alternativas	(a) Base de datos local en el dispositivo: los datos quedan ligados al aparato e incumple R1 y R2. (b) Base NoSQL en la nube: incumple R1 y añade dependencia de un proveedor. (c) Archivos en el servidor: sin integridad referencial ni consultas por periodo.
Consecuencias	A favor: integridad referencial con eliminación en cascada; consultas por usuario, deporte y periodo; los datos persisten al reinstalar; el progreso nunca contradice las actividades. En contra: la aplicación no funciona sin conexión; la disponibilidad depende del servidor XAMPP; cada consulta de metas recalcula el progreso y aumenta la carga.
Vínculo	Driver D5; escenario E5; restricciones R1 y R2; C4 nivel 2: relación API REST → Base de datos MySQL. Evidencia: Tablas 11, 12 y 20 del informe; CP11, CP13, CP14 y CP15.
Nota. Elaboración propia a partir de Arévalo et al. (2026) y del formato de Nygard (2011).


