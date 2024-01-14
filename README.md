# Todo_Node_JS

Iniciando en la programación con Node.JS

## 01_Basico

- Utiliza el patron de diseno modulo para separar el codigo en diferentes ficheros y asi poder exportar e importar el codigo para reutilizarlo.
- Sistema de Modulo
  - CommonJS (cjs), por defecto.
  - ECMAScript (mjs), moderna y recomendada.
- Sistema de Archivo
  - FS: Stats, Sincrono, Asincrono, Promesa, convertir Callback a Promise (solo en modulos nativos que no tengan Promesa nativa)
  - Async-Await: se puede utilizar con mjs en el cuerpo del archivo (top level await) con callback y paralelo, en cmj no se puede realizar, se puede utilizar en cjs utilizando IIFE, que ejecuta la funcion al instante de crearla que es secuencial.
- Path
  - Para construir nuevas rutas de archivos, saber la extension del archivo, crear rutas absolutas,etc.
- Ls
  - Error: manejo de errores con callback y try-catch.
  - Ls: obtener todos los detalles del archivo, aplicando todo lo aprendido.
- Process
  - Proceso para saber si se ejecuto bien la aplicacion y direccion de la ejecucion.
- Servidor
  - Leer puertos disponibles, controllar error de puertos u otros y ejecutar el servidor
