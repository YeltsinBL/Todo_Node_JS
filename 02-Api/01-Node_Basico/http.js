const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.url === '/') {
    res.end('Bienvenido a la página principal')
  } else if (req.url === '/image') {
    fs.readFile('./programming.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('500 internal error')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contact') {
    res.end('Pagina de contacto')
  } else {
    res.statusCode = 404
    res.end('404')
  }
}
// creación del servidor con un callback que recibe una petición y entrega una respuesta
const server = http.createServer(processRequest)

// utilizamos el la función importada
server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
