# Todo_Node_JS

Iniciando en la programación con Node.JS
<!-- cSpell:disable -->

## 01_Basico
<!-- cSpell:enable -->
- Utiliza el patron de diseño modulo para separar el código en diferentes ficheros y asi poder exportar e importar el código para reutilizarlo.
- Sistema de Modulo
  - CommonJS (cjs), por defecto.
  - ECMAScript (mjs), moderna y recomendada.
- Sistema de Archivo
  - FS: Stats, Síncrono, Asíncrono, Promesa, convertir Callback a Promise (solo en módulos nativos que no tengan Promesa nativa)
  - Async-Await: se puede utilizar con mjs en el cuerpo del archivo (top level await) con callback y paralelo, en cmj no se puede realizar, se puede utilizar en cjs utilizando IIFE, que ejecuta la función al instante de crearla que es secuencial.
- Path
  - Para construir nuevas rutas de archivos, saber la extension del archivo, crear rutas absolutas,etc.
- Ls
  - Error: manejo de errores con callback y try-catch.
  - Ls: obtener todos los detalles del archivo, aplicando todo lo aprendido.
- Process
  - Proceso para saber si se ejecuto bien la aplicación y dirección de la ejecución.
- Servidor
  - Leer puertos disponibles, controlar error de puertos u otros y ejecutar el servidor

## 02_Api

Creación de Api usando solo Node con http y Express.

- 01-Node_Basico
  - inicializamos: `npm init -y`
  - http: creación básica de las rutas y contenido a mostrar (texto o imagen.)
  - routing: manejo de métodos GET y POST
- 02-Express
  - inicializamos: `npm init -y`
  - instalamos Express: `npm install express -E`
  - express:
    - manejo de métodos GET y POST.
    - middleware: función que se ejecuta entre la petición y la respuesta.

> Nota: Para reiniciar automáticamente el servidor es utilizando  `watch` o usando una dependencia `nodemon` en modo desarrollo y agregándolo al script del package.json.

```sh
# usando watch
node --watch [ruta_y_archivo_ejecutar]

# instalar nodemon
npm i nodemon -D
#agregando en el script del package.json
"dev:#":"[archivo_ejecutar]"
# ejecutamos el script
npm run dev:#
```

## 03-ApiRest

Creación de ApiRest utilizando Express

- app:
  - Inicializar el proyecto: `npm init -y`
  - Instalamos Express
  - Levantamos el servidor usando watch
  - Métodos utilizados: GET, POST, PATCH
  - Corrección del CORS: restringe si el recurso se puede usar en un origen diferente al mismo, solo funciona en los navegadores.

> Nota: se puede utilizar REGEX en las rutas:`app.get( '^/users/:userId([0-9]{6})', function( req, res )`.
>
> Manejo de CORS
>> CORS MANUAL: para usar en CORS en métodos normales (GET/HEAD/POST) solo he agrega la cabecera del 'Access-control-Allow-Origin' pero para los métodos complejos (PUT/PATCH/DELETE) se debe utilizar el CORS PRE-FLIGHT que requiere una petición especial que se llama OPTIONS.
