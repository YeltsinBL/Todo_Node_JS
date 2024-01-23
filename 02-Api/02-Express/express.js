// importamos el framework
const express = require('express')

const ditto = require('../pokemon/ditto.json')

// creamos la aplicación con express
const app = express()
// desactivamos el powered-by porque es inseguro
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

// Métodos y Ruta
app.get('/', (req, res) => {
  res.status(200).send('<h1>Mi pagina</h1>')
})
app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})
app.post('/pokemon', (req, res) => {
  let body = ''
  // leer los datos que enviamos en el body
  // el chunk recibe binarios, por eso se cambia a string
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    res.status(201).json(data)
  })
})

// forma global de usar las request
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

// escuchamos el puerto donde funcionara la aplicación
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
