const fs = require('node:fs');

/**STATS**/

// obtener informacion del archivo
const stats = fs.statSync('./archivo.txt');

console.log(
    stats.isFile(), // si es un archivo
    stats.isDirectory(), // si es un directorio
    stats.isSymbolicLink(), // si es un enlace
    stats.size // tamano en byte
);


/**Leear Sincrono**/

// Leer el archivo de forma Sincrono e indicamos la codificacion
const text = fs.readFileSync('./archivo.txt', 'utf-8');
console.log('Sincrono',text);


/**Leer Asincrono**/

// Leer el archivo de forma Asincrono,indicamos la codificacion y
// agregamos el callback que se ejecuta cuando una tarea a terminado
fs.readFile('./archivo.txt', 'utf-8', (error, texto) => {
    console.log('Asincrono',texto)
});


/**Leer con Promesas**/

// Evita utilizar callback
const fs_promise = require('node:fs/promises');
fs_promise.readFile('./archivo.txt', 'utf-8')
    .then(text => {
        console.log('Promesa', text)
    });


/**Convertir importacion de callback a Promesas solo en moduilos nativos
 * que no tngan promesas**/

const {promisify} = require('node:util');
const readFilePromise = promisify(fs.readFile);
readFilePromise('./archivo.txt', 'utf-8')
    .then(text => {
        console.log('ConvertCallbackPromise', text)
    });