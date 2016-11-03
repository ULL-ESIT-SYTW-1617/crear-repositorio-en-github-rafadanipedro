import fs from 'fs'
import path from 'path'
import { loadJSON } from './utils'

export default function anadirConfig(config, plugin) {
  let plugins = new loadJSON('plugins.json', true)
  plugins.json[plugin] = config
  plugins.write()
}