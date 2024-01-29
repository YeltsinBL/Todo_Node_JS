import { randomUUID } from 'node:crypto'
import { readJson } from '../utils.js'
// Leer el json
const movies = readJson('./movies.json')

export class MovieModel {
  // Convertimos la respuesta de datos de Síncrono a asíncrono
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        // Comparamos todos los elementos del genero en minúsculas
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(), // crea una id
      ...input
    }

    // No se considera REST porque la información se esta guardando en memoria
    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    // Actualizamos la película
    const updateMovie = {
      ...movies[movieIndex],
      ...input
    }
    movies[movieIndex] = updateMovie
    return movies[movieIndex]
  }
}
