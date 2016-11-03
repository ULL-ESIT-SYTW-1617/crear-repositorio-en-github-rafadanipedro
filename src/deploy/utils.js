import fs from 'fs'
import path from 'path'

export function getTask(taskName, variable) {
  return (`
export function ${taskName} () {
  return ${variable}.deploy(plugins['${variable}'])
}
`
  )
}

export class loadJSON {
  constructor (filename, crearSiNoExiste) {
    this.filename = filename
    try {
      this.json = require(path.resolve(process.cwd(), this.filename))
    } catch(err) {
      if (crearSiNoExiste) {
        fs.writeFileSync(path.resolve(process.cwd(), this.filename), JSON.stringify({}, undefined, 2))
        this.json = {}
      } else {
        throw new Error(`No existe el ${this.filename} en el directorio actual`)
      }
    }
  }

  write () {
    fs.writeFileSync(path.resolve(process.cwd(), this.filename), JSON.stringify(this.json, undefined, 2))
  }
}