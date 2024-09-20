import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

import { PORT, SECRET_JWT_KEY } from './conf.js'
import { UserRepository } from './user-repository.js'

const app = express()

app.set('view engine', 'ejs') // indicar el sistema de plantilla de la web
app.use(express.json())
app.use(cookieParser())

// Middleware para verificar el token y devolver su información
app.use((req, res, next) => {
  const token = req.cookies.access_token
  // Añadimos información a la petición para usarla en cualquier endpoint
  req.session = { user: null }
  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch (error) {
    req.session.use = null
  }
  next() // sigue la ejecución a la siguiente ruta o middleware
})

app.get('/', (req, res) => {
//   // Devolver vacío para indicar que no hay el token
//   if (!token) return res.json(null)
//   try {
//     // Verificamos si existe datos para que se de acceso directo en el front
//     const data = jwt.verify(token, SECRET_JWT_KEY)
//     return res.json(data)
//   } catch (error) {
//     res.json(null)
//   }
  // Al usar el Middleware de verificación de token, se simplifica lo que esta en la parte superior
  const { user } = req.session
  res.json(user)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    // Creación del token
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
      expiresIn: '1h'
    })
    res
      .cookie('access_token', token, {
        httpOnly: true, // la cookie solo se puede acceder en el servidor
        secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en producción
        sameSite: 'strict', // la cookie solo se puede acceder en el mismo dominio
        maxAge: 1000 * 60 * 60 // la cookie tiene un tiempo de validez de 1 hora
      })
      .send({ user, token })
  } catch (error) {
    res.status(401).send(error.message)
  }
})
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    res.status(400).send(error.message)
  }
})
app.post('/logout', (req, res) => {
  res.clearCookie('access_token')
    .json({ message: 'Sesión Cerrada' })
})
app.post('/protected', (req, res) => {
  // si hay sesión del usuario funciona bien
  // si no hay sesión de usuario da error
//   const token = req.cookies.access_token
//   if (!token) return res.status(403).send('Acceso no autorizado')
//   try {
//     const data = jwt.verify(token, SECRET_JWT_KEY)
//     res.json(data)
//   } catch (error) {
//     return res.status(401).send('Acceso no autorizado')
//   }
  // Al usar el Middleware de verificación de token, se simplifica lo que esta en la parte superior
  const { user } = req.session
  if (!user) return res.status(403).send('Acceso no autorizado')
  res.json(user)
//   res.json({ message: 'Permitido' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})
