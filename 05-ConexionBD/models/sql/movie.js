import { getConnection, mssql } from './conexion_mssql.js'

export class MovieModel {
  static async getAll ({ genre }) {
    try {
      const pool = await getConnection()
      let result
      if (genre) {
        result = await pool.request()
          .input('name_genre', mssql.VarChar, genre)
          .query(
            'select distinct m.id, m.title,m.[year],m.director,m.duration,m.rate,poster=CAST(m.poster as varchar(max)),' +
            'genre=(select ge.name from genre ge ' +
            'INNER JOIN movie_genre mgr on ge.id=mgr.genre_id ' +
            'WHERE mgr.movie_id=m.id ' +
            'for json PATH) ' +
            'from movies m ' +
            'INNER JOIN movie_genre mg on m.id=mg.movie_id ' +
            'INNER JOIN genre g ON mg.genre_id=g.id ' +
            'WHERE g.name=@name_genre')
      } else {
        result = await pool.request().query('select * from movies')
      }
      pool.close()
      return result.recordset
    } catch (error) {
      console.error(error)
    }
  }

  static async getById ({ id }) {
    try {
      const pool = await getConnection()
      const resultGenre = await pool.request()
        .input('value_id', mssql.VarChar, id)
        .query('select g.name from genre g inner join movie_genre mg on g.id=mg.genre_id where mg.movie_id=convert(uniqueidentifier,@value_id)')
      const nameGenre = []
      resultGenre.recordset.forEach(x => { nameGenre.push(x.name) })
      // console.log(nameGenre)
      const result = await pool.request()
        .input('value_id', mssql.VarChar, id)
        .query(
          'select distinct m.id, m.title,m.[year],m.director,m.duration,m.rate,poster=CAST(m.poster as varchar(max)) ' +
              'from movies m ' +
              'INNER JOIN movie_genre mg on m.id=mg.movie_id ' +
              'INNER JOIN genre g ON mg.genre_id=g.id ' +
              'WHERE m.id=convert(uniqueidentifier,@value_id)')

      pool.close()
      result.recordset[0].newGenre = nameGenre
      console.log(result.recordset)
      return result.recordset
    } catch (error) {
      console.error(error)
    }
  }

  static async create ({ input }) {
    try {
      const {
        genre: genreInput,
        title, year, duration, director, rate, poster
      } = input

      const pool = await getConnection()

      // Obtenemos un UUID
      const uuidResult = await pool.request().query('select NEWID() uuid;')
      const [{ uuid }] = uuidResult.recordset
      console.log(uuid)

      // Obtenemos los ID de los géneros
      console.log(genreInput)
      genreInput.forEach(async element => {
        const genreDataResult = await pool.request().input('name', mssql.VarChar, element)
          .query('select id from genre where name=@name')
        const [{ id }] = genreDataResult.recordset
        console.log(id)

        // Registramos la relación Película y genero
        await pool.request()
          .input('uuid', mssql.UniqueIdentifier, uuid)
          .input('id_genre', mssql.Int, id)
          .query('Insert into movie_genre (movie_id, genre_id) ' +
          'values(@uuid,@id_genre)')
      })

      // Guardamos los datos
      await pool.request()
        .input('uuid', mssql.UniqueIdentifier, uuid)
        .input('title', mssql.VarChar, title)
        .input('year', mssql.Int, year)
        .input('director', mssql.VarChar, director)
        .input('duration', mssql.Int, duration)
        .input('poster', mssql.Text, poster)
        .input('rate', mssql.Decimal, rate)
        .query('Insert into movies (id, title,[year], director, duration, poster, rate)' +
            ' values(@uuid,@title,@year,@director,@duration,@poster,@rate)')
      // Obtenemos la película guardada
      const movie = await pool.request()
        .input('value_id', mssql.UniqueIdentifier, uuid)
        .query('Select * from Movies WHERE id=@value_id')
      // console.log(movie.recordset)
      pool.close()
      return movie.recordset
    } catch (error) {
      console.error(error)
    }
  }

  static async delete ({ id }) {
    try {
      const pool = await getConnection()
      await pool.request()
        .input('value_id', mssql.VarChar, id)
        .query(
          'delete from movies WHERE id=convert(uniqueidentifier,@value_id)')

      pool.close()
      return true
    } catch (error) {
      console.log(error)
    }
  }

  static async update ({ id, input }) {
    try {
      const { title, year, duration, director, rate, poster } = input
      const pool = await getConnection()
      await pool.request()
        .input('value_id', mssql.VarChar, id)
        .input('title', mssql.VarChar, title)
        .input('year', mssql.Int, year)
        .input('director', mssql.VarChar, director)
        .input('duration', mssql.Int, duration)
        .input('poster', mssql.Text, poster)
        .input('rate', mssql.Decimal(2, 1), rate)
        .query('update movies ' +
        'set title=@title, year=@year, director=@director,duration=@duration, poster=@poster, rate=@rate ' +
        'WHERE id=convert(uniqueidentifier,@value_id)')
      const movie = await pool.request()
        .input('value_id', mssql.VarChar, id)
        .query('Select * from Movies WHERE id=convert(uniqueidentifier,@value_id)')
      console.log(movie.recordset)
      pool.close()
      return movie.recordset
    } catch (error) {
      console.log(error)
    }
  }
}
