/** Formas de Leer un JSON en MJS **/

// Forma experimental
// import movies from './movies.json' with {type:'json'}

// Usando FS
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json','utf-8'))

// usando Module, recomendada actualmente
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url) // obtenemos la dirección del archivo actual
export const readJson = (path) => require(path)
