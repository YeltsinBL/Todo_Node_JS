import express, { json } from 'express'
import { moviesRouter } from './routers/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

// indicamos que cuando se use el '/movies', ingrese al 'moviesRouter'
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
