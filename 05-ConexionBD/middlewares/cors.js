import cors from 'cors'

// Lista de los Orígenes aceptados
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    // Agregamos para resolver el CORS al utilizar las apis
    // el servidor nunca envía la cabecera del origin cuando esta en su mismo servidor
    if (acceptedOrigins.includes(origin) || !origin) {
      return callback(null, true)
    }
    return callback(new Error('No tiene permiso de CORS'))
  }
})
