import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

dotenv.config()

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app) // Creamos el servidor HTTP
const io = new Server(server, {
  // para saber el tiempo de desconexión
  connectionStateRecovery: {
  }
}) // Creamos el servidor del Socket.io

// Conexión a la BD
const db = createClient({
  url: 'libsql://chat-realtime-yeltsinbl.turso.io',
  authToken: process.env.DB_TOKEN
})
await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT
  )
`)

// Cada vez que el cliente se conecta al servidor io
io.on('connection', (socket) => {
  console.log('as user has connected')
  // cada vez que el cliente se desconecte
  socket.on('disconnect', () => {
    console.log('as user has disconnected')
  })

  socket.on('chat message', async (msg) => {
    let result
    try {
      result = await db.execute({
        sql: 'insert into messages(content) values (:msg)',
        args: { msg }
      })
    } catch (error) {
      console.log(error)
      return
    }
    io.emit('chat message', msg, result.lastInsertRowid.toString())
  })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
