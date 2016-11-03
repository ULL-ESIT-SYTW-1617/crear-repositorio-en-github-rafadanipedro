import minimist from 'minimist'
import fs from 'fs-promise'
import Gitbook from './gitbookStart'
import path from 'path'
import nombre from 'git-user-name'
import email from 'git-user-email'
import GHUsername from './githubUsername'
import deploy from './deploy'

(async () => {
  const argv = minimist(process.argv.slice(2))
  let conf = require('../package.json')

  const ghUsername = await GHUsername()

  if (argv.d || argv.deploy) return deploy(argv.d || argv.deploy, argv)

  switch(true) {
    case (argv.a || argv.authorinfo):
      console.log(`Autor: ${conf.author.name}`);
      break;

    case (argv.c || argv.contributors):
      console.log("Contribuidores:");
      for (let contributor of conf.contributors){
        console.log(`* ${contributor.name}`);
      }
      break;
    case (argv.h || argv.help):
      console.log(fs.readFileSync(path.resolve(__dirname, '..', 'man/gitbook-start-rafadanipedro.1'), 'utf8'))
      break;

    case (argv.v || argv.version):
      console.log(`Version: ${conf.version}`);
      break;

    default:
      if (argv._.length === 0) {
        console.error('Tienes que pasarme el nombre del libro')
        process.exit(1)
      }

      let nombreLibro = argv._[0]
      let options = {
        author: nombre(),
        email: email(),
        license: 'MIT',
        repo: `http://github.com/${ghUsername}/${nombreLibro}`,
        ghPages: `http://${ghUsername}.github.io/${nombreLibro}`,
        name: nombreLibro,
        title: nombreLibro,
        description: 'Descripción breve del Gitbook',
        outputDirName: nombreLibro,
        ...argv
      }
      let gitbook = new Gitbook(options)
      gitbook.write().catch(err => console.error(`ERROR: ${err.message}`))
  }
})()
