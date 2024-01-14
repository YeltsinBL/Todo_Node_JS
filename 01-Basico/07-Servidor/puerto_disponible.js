const net = require('node:net')

function findavailableport (puertodeseado) {
  return new Promise((resolve, reject) => {
    // crear el servidor
    const server = net.createServer()

    // correr en el puerto indicado
    server.listen(puertodeseado, () => {
      // obtenemos un puerto disponible
      const { port } = server.address()
      // cerramos el servidor con el puerto
      server.close(() => {
        resolve(port)
      })
    })

    // si el servidor da error
    server.on('error', (err) => {
      // si da el error de puerto ocupado
      if (err.code === 'EADDRINUSE') {
        // indicar que obtenga el puerto por defecto y lo resuelva
        findavailableport(0).then(port => resolve(port))
      } else {
        // ejecutar cualquier otro error
        reject(err)
      }
    })
  })
}

module.exports = { findavailableport }
