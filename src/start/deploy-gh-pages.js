import Git from 'simple-git'
import path from 'path'

import ghClient from './createRepo'

export default async function deployGhPages (nombre, ghUsername) {
  console.log('Desplegando en gh-pages...')

  let ghPagesPath = path.resolve(process.cwd(), nombre, 'gh-pages')

  return new Promise((resolve, reject) => {
    Git(ghPagesPath)
      .init()
      .addRemote('origin',`git@github.com:${ghUsername}/${nombre}.git`)
      .add('.')
      .commit('gh-pages push')
      .push(['-uf', 'origin', 'master:gh-pages'], (err, data) => {
        if(err) return reject(err)
        resolve(data)
      })
  })
}
