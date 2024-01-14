// Argumenos de entrada que recibe en la linea de comando
console.log(process.argv)

// controlar el proceso y su salida
// process.exit(0) // ha pasado todo bien
// process.exit(1) // ha ocurrido algun error

// controlar el proceso de salida
process.on('exit', () => {
  // limpiar los procesos
})

// current working directory - obtener la direccion desde donde se esta ejecutando el archivo
console.log(process.cwd())
