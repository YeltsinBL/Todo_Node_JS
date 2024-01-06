// el await solo funciona con funciones asincoronas
// Para leer un archivo con async/await se utiliza con modulos

import { readFile } from 'node:fs/promises';

// Utilizacion con Callback
console.log('Leer archivo')
const text = await readFile('./archivo.txt', 'utf-8')
console.log('MJS Callback:', text)

// Utilizacion en Paralelo
Promise.all([
    readFile('./archivo.txt', 'utf-8')
]).then(([text])=> {
    console.log('MSJ Paralelo:', text)
})