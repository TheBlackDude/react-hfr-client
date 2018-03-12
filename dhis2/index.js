'use strict'

const fs = require('fs-extra')
const path = require('path')
const zipFolder = require('zip-folder')
const FOLDER_PATH = path.parse(process.mainModule.filename).dir
const ROOT_DIR = path.resolve(path.join(FOLDER_PATH, '../'))
const SRC_FOLDER = path.join(ROOT_DIR, 'build')
const DEST_FOLDER_ROOT = path.join(FOLDER_PATH, 'dhis2-app')
const DEST_FOLDER = path.join(DEST_FOLDER_ROOT, 'dist')
const ZIP_FILE_NAME = 'dhis2.zip'
const ZIP_FILE_PATH = path.join(FOLDER_PATH, ZIP_FILE_NAME)
const MANIFEST_FILE_SRC = path.join(ROOT_DIR, 'manifest.webapp')
const MANIFEST_FILE_DEST = path.join(DEST_FOLDER_ROOT, 'manifest.webapp')
const HTML_FILE = path.join(DEST_FOLDER, 'index.html')
const CSS_DIR = path.join(DEST_FOLDER, 'static', 'css')
const JS_DIR = path.join(DEST_FOLDER, 'static', 'js')

const zipDHIS2Files = () => {
  return new Promise((resolve, reject) => {
    zipFolder(DEST_FOLDER_ROOT, ZIP_FILE_PATH, error => {
      if (error) {
        reject(error)
      } else {
        console.log('dhis2 bundle can be found here', ZIP_FILE_PATH)
        resolve('zipped!')
      }
    })
  })
}

const setupStatic = () => {
  let cssFile
  let jsFile
  return fs.readFile(HTML_FILE, 'utf8')
    .then((data) => {
      return fs.writeFile(HTML_FILE, data.replace(/\/static/g, 'static'))
    })
    .then(() => {
      return fs.readdir(CSS_DIR)
    })
    .then((files) => {
      cssFile = files.filter((row) => {
        var ext = row.split('.').pop()
        return ext === 'css'
      })[0]
      return fs.readFile(path.join(CSS_DIR, cssFile), 'utf8')
    })
    .then((data) => {
      return fs.writeFile(path.join(CSS_DIR, cssFile), data.replace(/\/static/g, '..'))
    })
    .then(() => {
      return fs.readdir(JS_DIR)
    })
    .then((files) => {
      jsFile = files.filter((row) => {
        var ext = row.split('.').pop()
        return ext === 'js'
      })[0]
      return fs.readFile(path.join(JS_DIR, jsFile), 'utf8')
    })
    .then((data) => {
      return fs.writeFile(path.join(JS_DIR, jsFile), data.replace(/static\//g, 'api/apps/dhis2/dist/static/'))
    })
}

fs.ensureDir(DEST_FOLDER)
  .then(fs.copy.bind(null, SRC_FOLDER, DEST_FOLDER))
  .then(fs.copy.bind(null, MANIFEST_FILE_SRC, MANIFEST_FILE_DEST))
  .then(setupStatic)
  .then(zipDHIS2Files)
  .then(() => fs.remove(DEST_FOLDER_ROOT))
  .catch(err => console.log(err))
