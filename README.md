# Práctica: GitHub API, Heroku API y SSH en JavaScript. Práctica 6 de SYTW

En esta práctica utilizaremos dos repositorios para poder publicar un libro de Gitbook, desplegándolo en una aplicación de Heroku de manera automática. El otro repositorio se encuentra en el [siguiente enlace](https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-heroku-rafadanipedro).

Con el otro repositorio se generará un Gitbook y este será para crear un plugin de manera que se pueda desplegar el libro en una aplicación en Heroku.

## Uso del plugin
Este plugin se encarga de copiar la carpeta generada por Gitbook, por defecto gh-pages, y la pega en .heroku, un directorio temporal. En este directorio se incluyen también los ficheros necesarios para crear un servidor de Express. Posteriormente, se crea un repositorio temporal y se pushea a Heroku.
Con esto, Heroku ya muestra el libro desplegado.

Para usar el plugin, es aconsejable utilizarlo llamándolo desde el plugin [`gitbook-start-heroku-rafadanipedro`](https://www.npmjs.com/package/gitbook-start-heroku-rafadanipedro). Si lo utilizamos, debemos de realizar un `gitbook-start --deploy=plugin-heroku-rafadanipedro`. Las opciones disponibles son:
* `--token`: para especificar la ruta donde se almacena el token para autentificarnos.
* `--path`: para especificar donde se encuentra el Gitbook construido.
* `--nombreApp`: para especificar el nombre de nuestra aplicación a desplegar.
* `--title`: sirve para especificar manualmente el título del libro.

Si no se introduce alguno de estos argumentos, se pide por pantalla.

Una vez creada la aplicación en Heroku, para deplegar el libro tenemos que ejecutar `gulp herokuRafadanipedro`.

## Enlace al paquete en npm
* [Paquete publicado en npm](https://www.npmjs.com/package/plugin-heroku-rafadanipedro)

## Descripción de la práctica
 * [Gitbook de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicagithubapi.html)

## Páginas personales

Pinchando sobre las imágenes podrás acceder a nuestras páginas personales.

<a href='https://rafaherrero.github.io' target='_blank'><img src='https://avatars2.githubusercontent.com/u/11819652?v=3&s=400' border='0' alt='postimage' width='100px'/></a> <a href='https://danielramosacosta.github.io/' target='_blank'><img src='https://avatars2.githubusercontent.com/u/11427028?v=3&s=400' border='0' alt='postimage' width='100px'/></a> <a href='https://alu0100505078.github.io/' target='_blank'><img src='https://avatars3.githubusercontent.com/u/14938442?v=3&s=400' border='0' alt='postimage' width='100px'/></a>