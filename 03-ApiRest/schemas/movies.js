const z = require('zod') // para realizar las validaciones

// creación de schema para crear las validaciones
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'El titulo debe ser un string',
    required_error: 'El titulo es requerido'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({
    message: 'Debe ingresar una url valida'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi'])
  )
})

function validationMovie (object) {
  // devolvemos un objeto result que indica si hay un error o datos
  return movieSchema.safeParse(object)
}

function validatePartialMovie (input) {
  // partial: Solo validamos los datos que se envían
  return movieSchema.partial().safeParse(input)
}

module.exports = {
  validationMovie,
  validatePartialMovie
}
