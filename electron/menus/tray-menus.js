const { createWindow } = require('../window')

const trayMenus = [
  { label: 'home', click: () => createWindow('home') },

  { type: 'separator' },

  { label: 'demo1', click: () => createWindow('demo1') },
  { label: 'demo2', click: () => createWindow('demo2') },

  { type: 'separator' },

  { label: 'about', click: () => createWindow('about') },
  { label: 'quit', role: 'quit' }
]

module.exports = trayMenus
