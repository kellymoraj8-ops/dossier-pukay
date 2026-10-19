1\. El Caso y la Convención de Identificadores

PUKAY es una aplicación móvil nativa para Android que permite registrar actividades deportivas y dar seguimiento a metas personales (Arévalo et al., 2026). Se desarrolló como proyecto final de la asignatura Arquitectura de Software con una arquitectura cliente-servidor: una API REST en el servidor Apache de XAMPP, una base de datos MySQL y un cliente Android organizado con MVVM y Repository. Este dossier documenta esa arquitectura para la asignatura Automatización de Procesos de Software y sigue el modelo de la cátedra: un único caso que evoluciona paso a paso, primero con los drivers y los escenarios de calidad (Parte I), luego con las vistas C4 y las primeras decisiones (Parte II) y, por último, con la comparación y selección del estilo arquitectónico (Parte III) (Universidad Politécnica Estatal del Carchi, 2026).

1.1 El Caso

Muchas personas practican varias disciplinas deportivas, pero la información de sus entrenamientos queda dispersa, lo que dificulta conocer su frecuencia y su avance hacia metas concretas (Arévalo et al., 2026). PUKAY responde con cuatro procesos: registro e inicio de sesión, consulta y selección de actividad deportiva, registro de actividad y gestión de metas. La Tabla 1 resume el caso.

Tabla 1

Resumen del Caso PUKAY

Elemento	Descripción

Casos de uso	Registrarse e iniciar sesión; elegir uno de cinco deportes (running, caminata, ciclismo, fútbol y gimnasio); registrar una actividad con fecha, duración, distancia y observación; consultar el historial; crear metas y consultar su progreso.

Elementos del sistema	Aplicación móvil Android, API REST, base de datos MySQL. El progreso de cada meta no se ingresa: el servidor lo calcula con las actividades del mismo deporte dentro del periodo.

Sistema externo	Ninguno. El servidor y la base de datos son contenedores propios del proyecto.

Fuera del alcance	Uso sin conexión, notificaciones, actualización en tiempo real, reportes avanzados y despliegue en un servidor público.

Nota. Elaboración propia a partir de Arévalo et al. (2026).

1.2 Convención de Identificadores

Cada identificador se define en un paso y se reutiliza sin cambios en las vistas, los ADR y la matriz de decisión, de modo que se conserve la trazabilidad entre las tres partes. La Tabla 2 lista los prefijos y la Tabla 3 muestra la continuidad entre las partes.

Tabla 2

Convención de Identificadores

Prefijo	Significado	Valores en el caso

S	Stakeholder	S1 a S5 (Paso 1)

R	Restricción	R1 a R6 (Paso 2)

D	Driver arquitectónico	D1 a D5 (Paso 3)

E	Escenario de calidad	E1 a E5 (Paso 4); E6 se incorpora en la Parte III (Paso 10)

A	Alternativa de estilo	A1 a A3 (Paso 11)

ADR	Registro de decisión arquitectónica	ADR-001 y ADR-002 (Paso 7); ADR-003 (Paso 15)

Nota. Elaboración propia a partir del modelo de la cátedra.

Tabla 3

Continuidad entre las Tres Partes del Dossier

Parte	Sesión	Pregunta que responde	Productos	Ubicación en el repositorio

I. Levantar	S1	¿Qué necesita el sistema y qué condiciona su estructura?	S, R, D y escenarios E1 a E5	docs/01-contexto-y-drivers.md

II. Representar	S2	¿Cómo se ve la arquitectura y qué se decidió?	C4 niveles 1 y 2, ADR-001, ADR-002, trazabilidad	docs/02-vistas-c4/ y docs/03-adr/

III. Decidir	S3	¿Qué estilo sostiene mejor los escenarios?	E6, matriz ponderada, ADR-003, C4 nivel 2 actualizado	docs/01, docs/02 y docs/03

Nota. Elaboración propia a partir del modelo de la cátedra.

Parte I. Levantar los Drivers (Sesión 1)

Objetivo: identificar quién influye en el sistema, qué lo condiciona y cómo se mide la calidad esperada. Se adopta la organización por stakeholders y concerns de ISO/IEC/IEEE (2022) y las características de calidad de ISO/IEC (2023).

Ubicación en el repositorio: docs/01-contexto-y-drivers.md

Paso 1. Stakeholders y Concerns

Se listan las personas y organizaciones que usan, deciden, operan o evalúan el sistema y lo que le preocupa a cada una. Un concern es un interés, todavía no un requisito, y se redacta sin proponer soluciones técnicas. La Tabla 4 presenta los cinco stakeholders de PUKAY.

Tabla 4

Stakeholders de PUKAY, Concerns e Influencia

ID	Stakeholder	Rol	Concerns principales	Influencia

S1	Deportista aficionado	Practica varias disciplinas sin una herramienta de seguimiento	Registrar una actividad con poco esfuerzo; que sus credenciales y sus datos estén protegidos; no perder su historial al cambiar de dispositivo.	Alta

S2	Persona que inicia un hábito deportivo	Busca constancia con objetivos medibles	Entender su avance hacia la meta sin hacer cálculos; mantener la motivación.	      Alta

S3	Equipo de desarrollo	Construye y mantiene la aplicación y el servidor (tres integrantes)	Modificar una parte sin afectar el resto; poder probar cada parte; cumplir el plazo con tecnologías conocidas.	Alta

S4	Docente evaluador	Valora la solución desde la arquitectura de software	Evidencia de análisis y de decisiones justificadas; correspondencia entre diseño, implementación y pruebas.	Media

S5	Desarrolladores de futuros clientes	Construirían una aplicación web o iOS sobre el mismo backend	Construir otro cliente sin modificar la lógica del servidor.	Baja

Nota. Elaboración propia a partir de la Tabla 1 y de los requisitos RNF04 y RNF08 de Arévalo et al. (2026). S5 se deriva de RNF08. La influencia es una valoración del equipo autor.

Paso 2. Restricciones y Supuestos

Se registran las condiciones impuestas y si son negociables (Bass et al., 2021). La Tabla 5 reúne las seis restricciones que condicionaron la arquitectura.

Tabla 5

Restricciones del Proyecto, Origen y Negociabilidad

ID	Tipo	Restricción	Origen	Negociable

R1	Técnica	Uso de servidores externos, API REST, XAMPP y MySQL.	Condición del proyecto final de Arquitectura de Software	No

R2	Técnica	El acceso a la base de datos se hace únicamente mediante el backend.	Condición del proyecto final	No

R3	Organizacional	Dos semanas de desarrollo.	Cronograma de la asignatura	Si

R4	Organizacional	Tres integrantes con conocimientos de Android Studio, Java y XML.	Equipo de desarrollo	Parcial

R5	Técnica	Aplicación nativa para Android 7.0 (API 24) o superior.	Decisión del equipo (RNF09)	Parcial

R6	Técnica	El servidor XAMPP corre en un equipo de desarrollo y HTTPS usa un certificado de desarrollo.	Infraestructura disponible	Parcial

Nota. Elaboración propia a partir de las Tablas 16, 17 y 21 de Arévalo et al. (2026). La negociabilidad es una valoración del equipo autor.

Supuestos adoptados: el deportista dispone de conexión a la red local mientras usa la aplicación; el catálogo se limita a cinco deportes; el servidor está encendido durante las pruebas; se atiende un solo idioma.

Paso 3. Drivers Arquitectónicos

Se eligen entre tres y cinco concerns, restricciones o atributos que más condicionan la estructura y se valoran por importancia y dificultad. Los tipos usan las características de ISO/IEC (2023). Los de importancia alta y dificultad alta o media pesan más en las decisiones. El informe también exige rendimiento asíncrono (RNF06); se atiende dentro del diseño del cliente (ADR-003), pero no se eligió como driver para respetar el máximo de cinco.

Tabla 6

Drivers Arquitectónicos y su Priorización

ID	Driver	Tipo (ISO/IEC 25010:2023)	Origen	Importancia	Dificultad

D1	Proteger las credenciales del usuario y las comunicaciones	Seguridad	S1, R6	Alta	Media

D2	Aislar los datos de cada usuario	Seguridad	S1	Alta	Media

D3	Localizar el impacto de los cambios en una sola capa	Mantenibilidad	S3	Alta	Media

D4	Permitir que otros clientes reutilicen el backend	Interoperabilidad	S5, S3, R1	Alta	Media

D5	Registrar actividades en pocos pasos y mostrar el progreso sin cálculos manuales	Capacidad de interacción	S1, S2	Media	Media

Nota. Elaboración propia. ISO/IEC (2023) renombró la usabilidad como capacidad de interacción.

Paso 4. Escenarios de Calidad

Cada driver se convierte en un escenario con seis partes (fuente, estímulo, entorno, artefacto, respuesta y medida) que se puede comprobar; un atributo sin medida no es verificable (Bass et al., 2021). La Tabla 7 resume los cinco escenarios y de la Tabla 8 a la Tabla 12 se desglosan sus seis partes.

Tabla 7

Escenarios de Calidad de la Parte I

ID	Atributo	Driver	Escenario	Medida (propuesta)

E1	Seguridad	D1	Una persona con acceso de lectura a MySQL consulta la tabla usuario y no puede obtener las contraseñas.	0 usuarios con contraseña en texto plano; 100 % con hash y sal.

E2	Seguridad	D2	Un usuario autenticado solicita su historial y sus metas y solo recibe los suyos.	0 registros ajenos en el 100 % de las consultas; 100 % de peticiones sin token reciben 401.

E3	Mantenibilidad	D3	Un integrante cambia la ruta o el formato de un recurso REST y lo hace sin tocar las pantallas.	0 archivos de interfaz modificados; 4 horas-persona o menos.

E4	Interoperabilidad	D4	Un desarrollador de un nuevo cliente consume la API sin cambios en el backend.	9 de 9 recursos utilizables; 0 líneas de lógica de negocio cambiadas.

E5	Capacidad de interacción	D5	Un deportista registra una actividad recién realizada y la ve en su historial.	3 pantallas o menos y 60 s o menos; 0 campos de progreso editables a mano.

Nota. Elaboración propia. Las evidencias CP se toman de la Tabla 24 de Arévalo et al. (2026).

Tabla 8

Escenario E1: Protección de Contraseñas Almacenadas

Parte	Descripción

Atributo y driver	Seguridad (D1)

Fuente	Una persona con acceso de lectura a la base de datos MySQL.

Estímulo	Consulta la tabla usuario.

Entorno	Operación normal, con usuarios ya registrados.

Artefacto	Tabla usuario de la base de datos MySQL.

Respuesta	Las contraseñas no se pueden leer ni recuperar en su forma original.

Medida	0 de los usuarios registrados tiene la contraseña en texto plano; el 100 % está almacenado como hash con sal.

Evidencia	CP06 (inspección de la tabla usuario); ADR-002.

Nota. Elaboración propia. Las evidencias CP corresponden a la Tabla 24 de Arévalo et al. (2026).

Tabla 9

Escenario E2: Aislamiento de los Datos por Usuario

Parte	Descripción

Atributo y driver	Seguridad (D2)

Fuente	Un usuario autenticado.

Estímulo	Solicita su historial de actividades y sus metas mientras existen datos de otros usuarios.

Entorno	Operación normal, con al menos dos usuarios con datos registrados.

Artefacto	Endpoints protegidos de la API REST.

Respuesta	La API valida el token y filtra la información por el identificador del usuario autenticado.

Medida	0 registros de otros usuarios en el 100 % de las consultas; el 100 % de las peticiones sin token recibe el código 401.

Evidencia	CP07 y CP12; ADR-002.

Nota. Elaboración propia. Las evidencias CP corresponden a la Tabla 24 de Arévalo et al. (2026).

Tabla 10

Escenario E3: Cambio Localizado en el Acceso Remoto

Parte	Descripción

Atributo y driver	Mantenibilidad (D3)

Fuente	Un integrante del equipo de desarrollo.

Estímulo	Debe cambiar la ruta o el formato de un recurso REST consumido por la aplicación.

Entorno	Desarrollo, antes de generar una nueva versión.

Artefacto	Capas de acceso remoto y Repository del cliente Android.

Respuesta	El cambio se hace solo en la capa de acceso remoto y en el Repository, y se prueba sin tocar las pantallas.

Medida	0 archivos de interfaz (Activities y XML) modificados y cambio terminado en 4 horas-persona o menos.

Evidencia	Organización del código fuente (Arévalo et al., 2026, Tabla 7); ADR-003.

Nota. Elaboración propia. Las evidencias CP corresponden a la Tabla 24 de Arévalo et al. (2026).

Tabla 11

Escenario E4: Reutilización del Backend por Otro Cliente

Parte	Descripción

Atributo y driver	Interoperabilidad (D4)

Fuente	Un desarrollador de un nuevo cliente (web o iOS).

Estímulo	Necesita consumir los recursos de PUKAY.

Entorno	Evolución futura, con el backend en operación.

Artefacto	API REST de PUKAY.

Respuesta	El nuevo cliente consume la API con HTTPS, JSON y token, sin cambios en la lógica de negocio.

Medida	9 de 9 recursos de la API utilizables sin modificar el backend (0 líneas de lógica de negocio cambiadas).

Evidencia	Recursos de la API (Arévalo et al., 2026, Tabla 10), probados con una herramienta cliente REST; ADR-003.

Nota. Elaboración propia. Las evidencias CP corresponden a la Tabla 24 de Arévalo et al. (2026).

Tabla 12

Escenario E5: Registro Rápido de una Actividad

Parte	Descripción

Atributo y driver	Capacidad de interacción (D5)

Fuente	Un deportista autenticado.

Estímulo	Quiere registrar una actividad que acaba de realizar.

Entorno	Operación normal, con el servidor disponible.

Artefacto	Flujo de pantallas Inicio, Deportes y Registrar actividad de la aplicación móvil.

Respuesta	Selecciona el deporte, completa fecha, duración y observación opcional, y la actividad aparece en el historial.

Medida	3 pantallas o menos y 60 segundos o menos desde Inicio hasta ver la actividad en el historial; 0 campos de progreso editables a mano.

Evidencia	CP09 y CP14; cálculo automático del progreso (DA-06 del informe); ADR-001.

Nota. Elaboración propia. Las evidencias CP corresponden a la Tabla 24 de Arévalo et al. (2026).


TABLAS:

Tabla 23

Alternativas de Estilo Arquitectónico

ID	Alternativa	Descripción	Costo operativo

A1	Aplicación autónoma	Una sola aplicación Android con base de datos local en el dispositivo y sin servidor.	Bajo: no hay servidor que mantener.

A2	Cliente-servidor con API REST	Aplicación Android con MVVM y Repository que consume una API REST en XAMPP con MySQL.	Medio: un servidor y una API que mantener, con tecnologías conocidas.

A3	Backend como servicio	Aplicación Android que usa un servicio de terceros para autenticación y datos.	Medio-alto: cuenta y SDK de un proveedor que aprender y del que depender.

Nota. Elaboración propia a partir de la Tabla 6 de Arévalo et al. (2026).



Tabla 24

Criterios, Origen y Pesos

Criterio	Origen	Peso	Cómo se evalúa

1\. Protección de credenciales	E1 · D1	20 %	Capacidad de que las contraseñas no sean legibles y de que las comunicaciones estén protegidas.

2\. Aislamiento de datos por usuario	E2 · D2	15 %	Puntos de control de acceso y validación de identidad por petición.

3\. Cambio localizado en el acceso remoto	E3 · D3	15 %	Cambios necesarios para modificar un recurso remoto sin tocar las pantallas.

4\. Reutilización del backend	E4 · D4	15 %	Esfuerzo para que otro cliente consuma el mismo backend.

5\. Registro rápido de una actividad	E5 · D5	10 %	Pasos y latencia para registrar una actividad.

6\. Tolerancia a servidor no disponible	E6 · R6 · D5	15 %	Comportamiento de la aplicación cuando el servidor no responde.

7\. Costo y carga del equipo	R3 · R4	10 %	Piezas que mantener y conocimientos nuevos requeridos en dos semanas.

Total		100 %	

Nota. Elaboración propia.



Tabla 26

Matriz Ponderada con las Calificaciones

Criterio	Peso	A1	A2	A3

1\. Protección de credenciales	20 %	3	5	4

2\. Aislamiento de datos por usuario	15 %	3	5	4

3\. Cambio localizado en el acceso remoto	15 %	3	4	3

4\. Reutilización del backend	15 %	1	5	3

5\. Registro rápido de una actividad	10 %	5	4	4

6\. Tolerancia a servidor no disponible	15 %	5	3	3

7\. Costo y carga del equipo	10 %	5	3	2

Total ponderado (de 5)	100 %	3,40	4,25	3,35

Nota. Elaboración propia. A1: aplicación autónoma; A2: cliente-servidor con API REST; A3: backend como servicio.



Tabla 27

Justificación Breve de las Calificaciones

Criterio	A1	A2	A3

1\. Protección de credenciales	A1 (3): credenciales protegidas solo por el dispositivo, sin control central.	A2 (5): hash, token y HTTPS bajo control del equipo (CP06).	A3 (4): el proveedor gestiona la autenticación, fuera del control del equipo.

2\. Aislamiento de datos por usuario	A1 (3): el aislamiento depende del dispositivo.	A2 (5): validación de token y filtro por usuario en cada endpoint (CP12).	A3 (4): reglas de acceso delegadas en el proveedor.

3\. Cambio localizado en el acceso remoto	A1 (3): solo se logra con capas internas.	A2 (4): capas separadas y API como contrato, con más clases.	A3 (3): el cliente depende del SDK del proveedor.

4\. Reutilización del backend	A1 (1): sin backend no hay nada que reutilizar.	A2 (5): API REST con JSON independiente del cliente.	A3 (3): reutilizable mediante el SDK propietario.

5\. Registro rápido de una actividad	A1 (5): sin latencia de red.	A2 (4): flujo corto; la latencia de red es aceptable.	A3 (4): equivalente a A2.

6\. Tolerancia a servidor no disponible	A1 (5): no depende de ningún servidor.	A2 (3): depende del servidor XAMPP; se mitiga con mensajes de error (CP16).	A3 (3): depende de la red y del proveedor.

7\. Costo y carga del equipo	A1 (5): sin servidor que mantener.	A2 (3): un servidor y una API, con tecnologías conocidas (R4).	A3 (2): aprender el SDK y la cuenta del proveedor en dos semanas (R3, R4).

Nota. Elaboración propia.



Tabla 29

Análisis de Sensibilidad de los Totales Ponderados

Alternativa	Pesos base (E6 al 15 %)	Pesos alternos (E6 al 40 %)

A1 Aplicación autónoma	3,40	3,87

A2 Cliente-servidor con API REST	4,25	3,88

A3 Backend como servicio	3,35	3,25

Nota. Elaboración propia. En los pesos alternos los demás criterios se reducen en proporción para que la suma siga siendo 100 %.



