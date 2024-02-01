import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel })

  // Convertimos la respuesta de datos de Síncrono a asíncrono
  moviesRouter.get('/', movieController.getAll)

  moviesRouter.get('/:id', movieController.getById)

  moviesRouter.post('/', movieController.create)

  moviesRouter.patch('/:id', movieController.update)

  moviesRouter.delete('/:id', movieController.delete)

  return moviesRouter
}
