'use strict'

const url = require('url')
const extend = require('extend')
const fs = require('fs')

const pkg = require('../package.json')
const env = process.env.NODE_ENV
let configOutput = 'export default '
let config = {}

const defaults = {
  name: pkg.name,
  version: pkg.version
}

// if NODE_ENV is set and it is not 'development'
if (typeof env !== 'undefined' && env !== null && env !== 'development') {
  config = {
    apiUrl: process.env.API_URL,
    authApiUrl: process.env.AUTH_API_URL
  }
} else {
  config = require('./development.json')
}

const parsedUrl = url.parse(config.apiUrl)
config.baseUrl = parsedUrl.href.split(parsedUrl.path)[0]
const mergedConfig = extend(true, {}, defaults, config)

configOutput = [configOutput, JSON.stringify(mergedConfig, null, 2)].join(' ')
configOutput = configOutput.replace(/"/g, '\'')

fs.writeFile('src/config.js', configOutput, (err) => {
  if (err) {
    console.log(err)
  }
})
