// Error con el Callback
const fs= require('node:fs')

fs.readdir('.', (err, files)=> {
  if(err){
    console.error('Error al leer el directorio')
    return;
  }
  files.forEach(file =>{
    console.log(file);
  })
})

// Error con try_ catch
const fs_promise = require('node:fs/promises')

fs_promise.readdir('.')
.then(files=> {
    files.forEach(file => {
        console.log(file)
    })
})
.catch(err => {
    if (err){
        console.error('Error al leer el directorio:', err)
        return;
    }
})