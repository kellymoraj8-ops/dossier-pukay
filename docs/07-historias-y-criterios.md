# 07. Historias de Usuario y Criterios de Aceptación — PUKAY

## HU-001: Registro de Actividades Deportivas

| Campo | Descripción |
|---|---|
| Identificador | HU-001 |
| Módulo | Registro de actividades |
| Título | Registrar una actividad deportiva |
| Prioridad | Alta |
| Estado | Definida para validación y pruebas |
| Proyecto | PUKAY |

### 1. Descripción de la historia de usuario

**Como** deportista registrado en la aplicación PUKAY,

**Quiero** registrar mis actividades deportivas ingresando el tipo de deporte, fecha, duración, distancia y observaciones,

**Para** llevar un control de mis entrenamientos, consultar mi historial y evaluar mi progreso deportivo.

### 2. Criterios de aceptación en formato Gherkin

#### CA-01: Registro exitoso de una actividad

```gherkin
Característica: Registro de actividades deportivas

Escenario: Registrar una actividad correctamente
  Dado que el deportista ha iniciado sesión en PUKAY
  Y se encuentra en la pantalla "Registrar Actividad"
  Cuando selecciona el deporte "Running"
  Y ingresa la fecha "24/10/2026"
  Y registra una duración de 45 minutos
  Y registra una distancia de 5 kilómetros
  Y escribe la observación "Entrenamiento matutino"
  Y presiona el botón "Guardar Actividad"
  Entonces el sistema valida los datos ingresados
  Y guarda la actividad en la base de datos MySQL
  Y muestra el mensaje "Actividad registrada correctamente"
  Y la actividad aparece en el historial del deportista
```

#### CA-02: Rechazo de datos inválidos

```gherkin
Escenario: Rechazar una actividad con datos inválidos
  Dado que el deportista ha iniciado sesión en PUKAY
  Y se encuentra en la pantalla "Registrar Actividad"
  Cuando selecciona el deporte "Running"
  Y ingresa una fecha válida
  Y registra una duración de -10 minutos
  Y registra una distancia de -5 kilómetros
  Y presiona el botón "Guardar Actividad"
  Entonces el sistema identifica los datos inválidos
  Y muestra un mensaje indicando que la duración
    y la distancia deben ser valores válidos
  Y no permite guardar la actividad
  Y mantiene al deportista en el formulario
    para corregir los datos
```

#### CA-03: Validación de campos obligatorios

```gherkin
Escenario: Intentar registrar una actividad incompleta
  Dado que el deportista se encuentra en
    la pantalla "Registrar Actividad"
  Cuando deja vacío el campo "Duración"
  Y presiona el botón "Guardar Actividad"
  Entonces el sistema muestra un mensaje
    indicando que existen campos obligatorios
  Y no registra la actividad en la base de datos
  Y permite completar la información faltante
```

### 3. Reglas de negocio

| Código | Regla |
|---|---|
| RN-01 | El deportista debe tener una sesión activa. |
| RN-02 | El tipo de deporte y la fecha son obligatorios. |
| RN-03 | La duración debe ser mayor que cero. |
| RN-04 | La distancia no puede ser negativa. |
| RN-05 | Las observaciones son opcionales. |
| RN-06 | La actividad debe asociarse al usuario autenticado. |

**Nota:** Estas reglas representan criterios propuestos para la historia de usuario y deben verificarse con las validaciones implementadas en PUKAY.

### 4. Trazabilidad de la historia de usuario

| Elemento | Identificador | Relación |
|---|---|---|
| Historia de usuario | HU-001 | Registro de actividades deportivas |
| Criterio de aceptación | CA-01 | Registro exitoso |
| Criterio de aceptación | CA-02 | Rechazo de datos inválidos |
| Criterio de aceptación | CA-03 | Validación de campos obligatorios |
| Tarea CASE | T-01 | Elaboración de historias y criterios |
| Contrato API | Pendiente | Operación de registro de actividad |
| Pruebas automatizadas | Pendiente | Verificación de CA-01, CA-02 y CA-03 |

La correspondencia con los escenarios identificados en el dossier deberá confirmarse utilizando los identificadores definidos en `01-contexto-y-drivers/f-escenarios-calidad.md`.

### 5. Resultado esperado

La aplicación PUKAY debe permitir que los deportistas registren correctamente sus entrenamientos mediante la aplicación Android, enviando los datos a la API REST desarrollada en PHP para almacenarlos en MySQL.

Cuando existan datos inválidos, el sistema debe impedir el registro y mostrar mensajes claros para su corrección.

### 6. Estado de verificación

| Elemento | Estado |
|---|---|
| Historia HU-001 | Documentada |
| Criterios CA-01, CA-02 y CA-03 | Documentados |
| Reglas de negocio | Pendientes de contrastar con el código |
| Vinculación con escenarios del dossier | Pendiente |
| Validación mediante OpenAPI | Pendiente |
| Pruebas automatizadas | Pendientes de ejecución |

**Observación:** La historia se considera definida, pero su aceptación definitiva dependerá de comprobar las validaciones, la persistencia y los mensajes implementados en PUKAY.
