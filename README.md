# Práctica: GitHub API, Heroku API y SSH en JavaScript. Práctica 6 de SYTW

![Version NPM](https://img.shields.io/npm/v/gitbook-start-github-rafadanipedro.svg)

En esta práctica trabajaremos sobre los anteriores paquetes en los que deplegábamos un Gitbook en Heroku e IAAS.
En este caso, se nos pide crear un plugin para desplegar en Github que, utilizando la API de Github, sea capaz de crear un repositorio y publicarlo.

* **[Heroku API](https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-heroku-rafadanipedro)**
* **[Heroku API plugin](https://github.com/ULL-ESIT-SYTW-1617/practica-plugins-heroku-rafadanipedro)**

* **[SSH en JavaScript](https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-iaas-ull-es-rafadanipedro)**
* **[SSH en JavaScript plugin](https://github.com/ULL-ESIT-SYTW-1617/nueva-funcionalidad-para-el-paquete-npm-plugins-rafadanipedro)**

## Funcionamiento paquete

Para esta práctica hemos creado un nuevo paquete, disponible en el [siguiente enlace](https://www.npmjs.com/package/gitbook-start-github-rafadanipedro).

Lo primero, debemos de instalar dicho paquete de manera global, ejecutando el siguiente comando: `npm i -g gitbook-start-github-rafadanipedro`. Una vez instalado, simplemente ejecutamos `gitbook-start <nombreLibro>`, lo que nos creará la estructura del libro. A continuación, se nos pedirá por pantalla el nombre de usuario y la contraseña (de manera oculta) de GitHub para obtener el token de nuestro perfil y así poder crear un repositorio al que subir el libro de manera totalmente automática y transparente para el cliente.

Las opciones que puede recibir el paquete son: 

 `--author`: especifica el autor del libro. Por defecto es el nombre de usuario de GitHub.  
 `--email`: especifica el email del autor del libro. Por defecto es el correo de usuario de git.  
 `--license`: especifica la licencia del libro. Por defecto es "MIT".  
 `--repo`: especifica la direccion del repositorio de GitHub. Por defecto es "https://github.com/'+nombreUsuario/'+nombreRepo".  
 `--ghPages`: especifica la direccion en la que se encuentran las gh-pages generadas. Por defecto es "http://'+nombreUsuario.github.io/'+nombreRepo".  
 `--name`: especifica el nombre del libro. Por defecto este argumento es obligatorio.  
 `--title`: especifica el titulo del libro. Por defecto es el mismo que el nombre del libro.  
 `--description`: especifica la descripcion del libro. Por defecto es "Descripcion breve del Gitbook".  
 `--outputDirName`: nombre del directorio a crear. Por defecto es el nombre del libro.
 `-d o --deploy `: despliega el libro en el plugin que le indique

## Descripción de la práctica
 * [Gitbook de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicagithubapi.html)

## Páginas personales

Pinchando sobre las imágenes podrás acceder a nuestras páginas personales.

<a href='https://rafaherrero.github.io' target='_blank'><img src='https://avatars2.githubusercontent.com/u/11819652?v=3&s=400' border='0' alt='postimage' width='100px'/></a> <a href='https://danielramosacosta.github.io/' target='_blank'><img src='https://avatars2.githubusercontent.com/u/11427028?v=3&s=400' border='0' alt='postimage' width='100px'/></a> <a href='https://alu0100505078.github.io/' target='_blank'><img src='https://avatars3.githubusercontent.com/u/14938442?v=3&s=400' border='0' alt='postimage' width='100px'/></a>
