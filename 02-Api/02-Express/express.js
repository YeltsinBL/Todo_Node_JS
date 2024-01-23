// importamos el framework
const express = require('express')

const ditto = require('../pokemon/ditto.json')

// creamos la aplicación con express
const app = express()
// desactivamos el powered-by porque es inseguro
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

// middleware: función que se ejecuta entre la petición y la respuesta
// app.use((req, res, next) => {
//   // el next se utiliza cuando se termine de hacer todo la lógica o acción del callback
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // Solo llegaran las request que son POST y tengan el content/type: application/json
//   let body = ''
//   // leer los datos que enviamos en el body
//   // el chunk recibe binarios, por eso se cambia a string
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     // mutamos la request y agregamos los información en el body
//     req.body = data
//     next()
//   })
// })

// forma mas resumida de hacer lo mismo del middleware
app.use(express.json())

// Métodos y Ruta
app.get('/', (req, res) => {
  res.status(200).send('<h1>Mi pagina</h1>')
})
app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})
app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// la ultima que llegara, mayormente para errores
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

// escuchamos el puerto donde funcionara la aplicación
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
