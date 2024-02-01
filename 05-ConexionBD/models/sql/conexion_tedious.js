import tedious from 'tedious'

const Connection = tedious.Connection
const config = {
  server: 'localhost', // update me
  authentication: {
    type: 'default',
    options: {
      userName: 'SA', // update me
      password: 'chemoSql123$' // update me
    }
  },
  options: {
    database: 'MoviesDB', // update me
    trustServerCertificate: true
    // rowCollectionOnRequestCompletion: true
  }
}
const connection = new Connection(config)
connection.on('connect', function () {
  // If no error, then good to proceed.
  console.log('Connected')
  console.log(executeStatement())
})

connection.connect()

const Request = tedious.Request

async function executeStatement () {
  const request = new Request('SELECT * FROM movies;', function (err) {
    if (err) {
      console.log(err)
    }
    console.log('Paso consulta')
  })
  const result = []
  let data = {}
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log('NULL')
      } else {
        data[column.metadata.colName.toString()] = column.value
      }
    })
    result.push(data)
    data = {}
  })
  // Close the connection after the final event emitted by the request, after the callback passes
  request.on('requestCompleted', function () {
    console.log(' rows return')
    connection.close()
    // result.push(data)
    // console.log(result)
    // return result
  })
  connection.execSql(request)
  return result
}

// const executeSQL = (sql, callback) => {
//   connection.connect((err) => {
//     if (err) { return callback(err, null) }
//     const request = new Request(sql, (err, rowCount, rows) => {
//       connection.close()
//       if (err) { return callback(err, null) }
//       callback(null, { rowCount, rows })
//     })
//     connection.execSql(request)
//   })
// }
// executeSQL('SELECT * FROM movies', (err, data) => {
//   if (err) { console.error(err) }
//   console.log(data.rows)
// })
