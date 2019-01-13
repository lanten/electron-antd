
const { app } = require('electron')
const { createWindow, getWindowUrl } = require('../window')

function nodeFunction() {
  console.log('运行在主进程中的方法')
}

const $api = {
  app,
  createWindow, getWindowUrl,

  nodeFunction,
}

module.exports = $api