// Error con try_ catch
const fs_promise = require('node:fs/promises')
const path = require('node:path')

const picocolors = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs_promise.readdir(folder)
  } catch {
    console.error(`No se pudo leer el directorio: ${folder}`)
    process.exit(1)
  }
  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs_promise.stat(filePath) // obtenemos los detalles del archivo
    } catch {
      console.error(picocolors.red(`❌ No se puedo leer el archivo ${filePath}`))
      process.exit(1)
    }
    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : '-'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${picocolors.blue(file.padEnd(20))} ${picocolors.yellow(fileSize.toString().padStart(10))} ${picocolors.cyan(fileModified)}`
  })

  // obtenemos toda la informacion del archivo
  const fileDet = await Promise.all(filesPromises)
  fileDet.forEach(fileDet => console.log(fileDet))
}

ls(folder)
