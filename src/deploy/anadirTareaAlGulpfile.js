import fs from 'fs'
import path from 'path'
import { getTask } from './utils'

export default function anadirTareaAlGulpfile(plugin) {
  let gulpfile
  try {
    gulpfile = fs.readFileSync(path.resolve(process.cwd(), 'gulpfile.babel.js')).toString()
  } catch(err) {
    return console.error('No existe un gulpfile, así que no puedo añadir la tarea')
  }

  let variable = plugin.replace(/-(.)/g, m => m[1].toUpperCase())
  let taskName = variable.replace(/plugin./, m => m.slice(-1).toLowerCase())

  gulpfile = gulpfile.replace(/(gitbook-install')/,
    '$1\n' +
    `import * as ${variable} from '${plugin}'`
    )

  gulpfile = gulpfile.replace(/(export const deploy.+)\)/, `$1, ${taskName})`)
  gulpfile += getTask(taskName, variable)
  escribirGulpfile(gulpfile)
}

function escribirGulpfile(gulpfile){
  fs.writeFileSync(path.resolve(process.cwd(), 'gulpfile.babel.js'), gulpfile)
}