import { spawn } from 'child_process'
import path from 'path'

export default async function generateGitbook (nombrelibro) {
  process.chdir(nombrelibro)
  console.log("Instalando plugins libro y generando...")
  await gitbookSpawn('install')
  await gitbookSpawn('build', '.', './gh-pages')
  process.chdir('..')
}

function gitbookSpawn(...params) {
  return new Promise((res, rej) => {
    const gb = spawn('node', [
      path.resolve(__dirname, '../..', 'node_modules/gitbook-cli/bin/gitbook.js'),
      ...params
    ])

    gb.stdout.on('data', data => process.stdout.write(data.toString()))
    gb.on('close', code => code ? rej() : res())
  })
}
