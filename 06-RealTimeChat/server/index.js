import express from 'express'
import logger from 'morgan'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app) // Creamos el servidor HTTP
const io = new Server(server) // Creamos el servidor del Socket.io

// Cada vez que el cliente se conecta al servidor io
io.on('connection', (socket) => {
  console.log('as user has connected')
  // cada vez que el cliente se desconecte
  socket.on('disconnect', () => {
    console.log('as user has disconnected')
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
