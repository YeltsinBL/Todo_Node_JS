import express from 'express'
import { PORT } from './conf.js'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello Word')
})

app.post('/login', (req, res) => {

})
app.post('/register', (req, res) => {

})
app.post('/logout', (req, res) => {

})
app.post('/protected', (req, res) => {

})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})
