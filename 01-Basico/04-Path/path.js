// Path: construir nuevas rutas de archivos, saber la extension del archivo, crear rutas absolutas,etc.

const path = require('node:path')

// barras separadora de carpetas segun sistema operativo
console.log(path.sep) // en mac (/) en windows(\)

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath);

// obtener el nombre del archivo desde una ruta con la extension
const base = path.basename('/temp/directory/test.txt')
console.log(base);
// obtener el nombre del archivo desde una ruta sin la extension
const filename = path.basename('/temp/directory/test.txt', '.txt')
console.log(filename);
// obtener la extension del archivo
const extension = path.extname('test.txt')
console.log(extension);