import express from 'express'
import { PORT } from './conf.js'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello Word')
})
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})
