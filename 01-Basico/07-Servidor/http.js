const http = require('node:http')
// importar puerto disponible
const { findavailableport } = require('./puerto_disponible.js')

const desiredPort = process.env.PORT ?? 3000

// creacion del servidor con un callback que recibe una peticion y entrega una respuesta
const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

// correros el servidor en un puerto disponible y esta forma es solo para desarrollo
// server.listen(0, () => {
//   console.log(`server listening on port http://localhost:${server.address().port}`)
// })

// utilizamos el la funcion importada
findavailableport(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
