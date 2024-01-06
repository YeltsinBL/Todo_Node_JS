// Esta forma se pueden encontrar en sistemas antiguos

const { readFile } = require('node:fs/promises');

// IIFE => Inmediatly Invoked Function Expression
(
    async() => {
        console.log('Leer archivo')
        const text = await readFile('./archivo.txt', 'utf-8')
        console.log('CJS:', text)
    }
)()

// esto es la representacion sin IIFE
async function init(){
    console.log('Leer archivo')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('CJS:', text)
}
init()