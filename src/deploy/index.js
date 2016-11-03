import path from 'path'
import npmi from 'npmi'
import anadirTareaAlGulpfile from './anadirTareaAlGulpfile'
import anadirConfig from './anadirConfig'
import { loadJSON } from './utils'

export default async function deploy (nombrePlugin, userArgs) {
  try {
    !estamosEnUnGitbook() ? process.exit(1) : ''
    existeEnPluginJSON(nombrePlugin) ? process.exit(1) : ''

    anadirTareaAlGulpfile(nombrePlugin)
    await npmInstall(nombrePlugin)

    console.info('Instalado el nuevo plugin!!')
    let pluginPath = path.resolve(process.cwd(), 'node_modules', nombrePlugin)
    let plugin = require(pluginPath)

    let pluginConfig = plugin.config()
    console.log(pluginConfig.then)
    if (pluginConfig.then) {
      pluginConfig = await pluginConfig
    }

    for (let key of Object.keys(pluginConfig) ) {
      if (userArgs[key]) {
        pluginConfig[key] = userArgs[key]
      }
    }

    anadirConfig(pluginConfig, nombrePlugin.replace(/-(.)/g, m => m[1].toUpperCase()))

    if (plugin.start) {
      let prom = plugin.start(pluginConfig)
      if (prom.then) {
        await prom
      }
    }
  } catch(err) {
    console.error(err)
  }
}

function estamosEnUnGitbook () {
  try {
    require(path.resolve(process.cwd(), 'book.json'))
    return true
  } catch(err) {
    console.error('No se reconoce tu directorio actual como un gitbook')
    return false
  }
}


function npmInstall (plugin) {
  return new Promise((resolve, reject) => {
    var options = {
      name: plugin,
      npmLoad: {
        loglevel: 'warn',
        'save-dev': true
      }
    }

    npmi(options, (err, result) => {
      if (err) {
        if (err.code === npmi.LOAD_ERR) console.error('npm load error');
        else if (err.code === npmi.INSTALL_ERR) console.error('npm install error');
        return reject(err)
      }

      resolve()
    });
  })
}

function existeEnPluginJSON (plugin) {
  let plugins
  try {
    plugins = new loadJSON('plugin.json')
  } catch(err) {
    return false
  }
  if (plugins.json[plugin]) {
    console.error(`Ya tienes el plugin ${plugin}`)
    return true
  }
  return false
}