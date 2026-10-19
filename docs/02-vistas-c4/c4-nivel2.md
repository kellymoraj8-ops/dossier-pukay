flowchart TB
  deportista["Deportista<br/>[Persona]"]
  app["Aplicación móvil<br/>[Contenedor: Android,<br/>MVVM + Repository]"]
  api["API REST<br/>[Contenedor: API REST sin estado,<br/>PHP sobre Apache XAMPP]"]
  db[("Base de datos MySQL<br/>[Contenedor: MySQL]")]
  deportista -->|"Usa las pantallas<br/>interfaz de la app"| app
  app -->|"Solicita y recibe datos<br/>HTTPS/JSON con token"| api
  api -->|"Lee y escribe datos<br/>SQL preparado (PDO)"| db
