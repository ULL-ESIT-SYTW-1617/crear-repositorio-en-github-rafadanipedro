export default async function getGithubUsername() {
  const spawn = require('child_process').spawn;
  const ssh = spawn('ssh', ['-T', 'git@github.com']);

  let resultado = await new Promise((res, rej) => {
    let solucion = ''
    ssh.stderr.on('data', (data) => {
      solucion+=data.toString()
    });

    ssh.on('close', (code) => {
      res(solucion)
    });
  })

  return resultado.match(/Hi (.+)!/)[1]
}