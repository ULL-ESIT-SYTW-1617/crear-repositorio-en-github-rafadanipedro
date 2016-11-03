import { src } from 'gulp'
import standard from 'gulp-standard'

export function lint () {
  src([
    'src/*',
    'bin/cli.js',
    'gulpfile.babel.js'
  ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
}

export default lint