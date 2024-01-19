const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  console.log('request received:', req.url)
  res.end('Hola mundo')
}
// creacion del servidor con un callback que recibe una peticion y entrega una respuesta
const server = http.createServer(processRequest)

// utilizamos el la funcion importada
server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
