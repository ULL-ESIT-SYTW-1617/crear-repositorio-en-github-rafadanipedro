import fs from 'fs-promise'
import ejs from 'ejs'
import path from 'path'


export default async function generateTemplate (options) {
  let tempalteDir = path.resolve(__dirname, '../../template')
  await renderTempalte(tempalteDir, options.outputDirName, options)
}

async function renderTempalte (origin, dest, options) {
  await comprobarExiste(dest)

  let files = await fs.readdir(origin)
  let promises = []
  for (let file of files) {
    let originPath = path.resolve(origin, file)
    let outputPath = path.resolve(dest, file)
    if ((await fs.stat(originPath)).isDirectory()) {
      promises.push(renderTempalte(originPath, outputPath, options))
    } else {
      promises.push(copiarFichero(originPath, outputPath, options))
    }
  }
  return Promise.all(promises)
}

async function comprobarExiste (path) {
  try {
    await fs.mkdir(path)
  } catch (err) {
    if (err.message.match(/file already exists/)) {
      throw new Error(`El directorio ${err.message.match(/'(.+)'/)[1]} ya existe`)
    } else {
      throw err
    }
  }
}

async function copiarFichero (origin, dest, options) {
  let data = await fs.readFile(origin, {encoding: 'utf8'})
  if (origin.match(/\.ejs$/)) {
    dest = dest.slice(0, -4)
    data = ejs.render(data, options)
  }
  console.log(`Escribiendo ${path.relative(options.outputDirName, dest)}`)
  await fs.writeFile(dest, data)
}