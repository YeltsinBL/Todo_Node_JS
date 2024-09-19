import DBLOCAL from 'db-local'

const { Schema } = new DBLOCAL({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static create ({ username, password }) {
    // 1. Validar al username y password
    if (typeof username !== 'string') throw new Error('El usuario debe ser texto.')
    if (username.length < 3) throw new Error('El usuario debe tener mas de 3 caracteres.')
    if (typeof password !== 'string') throw new Error('El usuario debe ser texto.')
    if (password.length < 6) throw new Error('El usuario debe tener mas de 6 caracteres.')

    // 2. Asegurarse que el username sea único
    const user = User.findOne({ username })
    if (user) throw new Error('El usuario ya existe.')

    const id = crypto.randomUUID()
    User.create({
      _id: id,
      username,
      password
    }).save()
    return id
  }

  static login ({ username, password }) {}
}