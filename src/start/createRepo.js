import fs from 'fs'
import path from 'path'
import github from 'octonode'
import Git from 'simple-git'
import inquirer from 'inquirer'

export default async function crearRepo (options) {
  let client = await ghClient()
  await createRepoGithub(options, client)
  await creaRepoLocal(await getGHUsername(client), options.name)
}

// Función para obtener el token, si no existe el token se crea.

export async function ghClient () {
  return github.client(await getToken())
}

async function getToken () {
  console.log('Obteniendo Token')
  try {
    fs.mkdirSync(path.resolve(process.env.HOME, '.gitbook-start'))
  } catch(e) {}

  let dirToken = path.resolve(process.env.HOME, '.gitbook-start/config.json')
  let config
  try {
    config = require(dirToken)
    return config.tokens.github
  } catch(err) {
    // No existe dirtoken
    config = {}
    let tokenGithub = await generateTokenGithub()
    config.tokens = {github: tokenGithub}
    console.log(`El token ${tokenGithub} se ha guardado en ${dirToken}`)
    fs.writeFileSync(dirToken, JSON.stringify(config, undefined, 2))
    return tokenGithub
  }
}

//Función para generar un token de Github
async function generateTokenGithub () {
  console.log('Generando el token de Github')
  let username = await ask('Introduce tu nombre de usuario de Github')
  let password = await ask('Introduce tu contraseña de Github', true)
  return new Promise((resolve, reject) => {
    github.auth.config({ username, password }).login({
      scopes: ['user', 'repo'],
      note: 'Token para Gitbook'
    }, (err, id, token) => {
      if (err) return reject(err)
      return resolve(token)
    })
  })
}

// Función para preguntar cosas por pantalla
async function ask(question, password) {
  return new Promise((resolve, reject) => {
    inquirer.prompt([{
      type: password ? 'password' : 'input',
      name: 'respuesta',
      message: question
    }]).then(function (answers) {
      resolve(answers.respuesta)
    })
  })
}

// Función que crea un repositorio en Github
async function createRepoGithub (options, client) {
  console.log('Creando repositorio en Github')
  return new Promise((resolve,reject) => {
    let ghme = client.me()
    ghme.repo({
      name: options.name,
      description: options.description,
    }, (err, body) => {
      if(err) {
        if (err.statusCode === 422) return reject(new Error('Ya existe ese repositorio en tu cuenta de Github'))
        if (err.statusCode === 404) return reject(new Error('No tengo permisos para crear el repositorio en Github'))
        if (err.statusCode === 401) return reject(new Error('No tengo permisos (has borrado el token de github?)'))
        return reject(err);
      }
      return resolve(body)
    })
  })
}

//Función para obtener nombre de usuario
export async function getGHUsername(client) {
  return new Promise((resolve, reject) => {
    client.me().info((err, data) => {
      if(err) return reject(err)
      return resolve(data.login)
    })
  })
}

//Funcion para crear el repoitorio local y pushear a la master
async function creaRepoLocal (username, nombreApp){
  return new Promise((resolve, reject) => {
    let repoPath = path.resolve(process.cwd(), nombreApp)
    console.log('Creando repositorio git local')
    console.log('Inicializando repo en ' + repoPath)
    console.log(`La dirección del remoto es: git@github.com:${username}/${nombreApp}.git`)

    Git(repoPath)
      .init()
      .addRemote('origin',`git@github.com:${username}/${nombreApp}.git`)
      .add('.')
      .commit('Primer Commit')
      .push(['-uf', 'origin', 'master'], (err, data) => {
        if(err) return reject(err)
        return resolve(data)
      })

  })
}
