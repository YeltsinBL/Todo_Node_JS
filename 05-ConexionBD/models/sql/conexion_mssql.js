import mssql from 'mssql'

const config = {
  server: 'localhost',
  database: 'MoviesDB',
  user: 'SA',
  password: 'chemoSql123$',
  options: {
    trustServerCertificate: true
  }
}

export async function getConnection () {
  try {
    return await mssql.connect(config) // retorna una promesa por eso se usa await
  } catch (error) {
    console.log(error)
  }
}
export { mssql }
