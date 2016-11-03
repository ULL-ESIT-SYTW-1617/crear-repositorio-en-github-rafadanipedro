#!/usr/bin/env node

var production
try {
  production = !process.execArgv[0].match(/babel-cli/)
} catch (err) {
  production = true
}

if (production) {
  require('babel-polyfill')
  require('../dist')
} else {
  require('../src')
}
