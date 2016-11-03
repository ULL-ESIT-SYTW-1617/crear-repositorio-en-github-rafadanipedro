import fs from 'fs-promise'
import ejs from 'ejs'
import path from 'path'

export default class Gitbook {
  constructor (options) {
    this.options = options
  }

  async write () {
    let tempalteDir = path.resolve(__dirname, '..', 'template')
    await this.renderTempalte(tempalteDir, this.options.outputDirName, this.options)
  }

  async renderTempalte (origin, dest) {
    await this.comprobarExiste(dest)

    let files = await fs.readdir(origin)
    let promises = []
    for (let file of files) {
      let originPath = path.resolve(origin, file)
      let outputPath = path.resolve(dest, file)
      if ((await fs.stat(originPath)).isDirectory()) {
        promises.push(this.renderTempalte(originPath, outputPath, this.options))
      } else {
        promises.push(this.copiarFichero(originPath, outputPath))
      }
    }
    return Promise.all(promises)
  }

  async comprobarExiste (path) {
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

  async copiarFichero (origin, dest) {
    let data = await fs.readFile(origin, {encoding: 'utf8'})
    if (origin.match(/\.ejs$/)) {
      dest = dest.slice(0, -4)
      data = ejs.render(data, this.options)
    }
    console.log(`Escribiendo ${path.relative(this.options.outputDirName, dest)}`)
    await fs.writeFile(dest, data)
  }
}
