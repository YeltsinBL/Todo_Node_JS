import { createApp } from './app.js'
import { MovieModel } from './models/sql/movie.js'

createApp({ movieModel: MovieModel })
