const express = require('express')
const crypto = require('node:crypto') // lo utilizaremos para crear una ID
const movies = require('./movies.json')
const { validationMovie, validatePartialMovie } = require('./schemas/movies')
const app = express()

app.disable('x-powered-by')
app.use(express.json())
// Lista de los Orígenes aceptados
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234'
]
app.get('/movies', (req, res) => {
  // Agregamos para resolver el CORS al utilizar este endpoint
  // el servidor nunca envía la cabecera del origin cuando esta en su mismo servidor
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-control-Allow-Origin', origin)
  }
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      // Comparamos todos los elementos del genero en minúsculas
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Película no encontrada' })
})

app.post('/movies', (req, res) => {
  // validar los datos del json
  const result = validationMovie(req.body)

  // verificar si hubo un error o datos
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(), // crea una id
    ...result.data
  }

  // No se considera REST porque la información se esta guardando en memoria
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Película no encontrada' })
  }
  // Actualizamos la película
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = updateMovie
  return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-control-Allow-Origin', origin)
  }
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Película no encontrada' })
  }
  movies.splice(movieIndex, 1)

  return res.json({ message: 'Película eliminada' })
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  }
  res.send(200)
})
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
