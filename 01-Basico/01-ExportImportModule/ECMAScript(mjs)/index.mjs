/**
 * .js -> por defecto utiliza CommonJS
 * .mjs -> para utilizar ES Module - moderna y recomendada
 * .cjs -> para utilizar CommonJS
 * **/
import { sum, rest, mult } from "./operaciones.mjs";
console.log(sum(10,4));
console.log(rest(10,4));
console.log(mult(10,4));