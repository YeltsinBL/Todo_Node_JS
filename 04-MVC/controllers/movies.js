import { MovieModel } from '../models/movie.js'
import { validatePartialMovie, validationMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Película no encontrada' })
  }

  static async create (req, res) {
    // validar los datos del json
    const result = validationMovie(req.body)

    // verificar si hubo un error o datos
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }

    return res.json({ message: 'Película eliminada' })
  }
}
