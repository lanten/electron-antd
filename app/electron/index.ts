import { app, Tray } from 'electron'

import { creatAppTray } from './tray'
import { createWindow } from './window'

let tray: Tray

// const { NODE_ENV } = process.env

// if (NODE_ENV === 'development') {
require('electron-debug')({ showDevTools: true })
// }

app.on('ready', () => {
  tray = creatAppTray()
  createWindow('home')
  console.log({ __dirname })
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  if (process.platform === 'win32') {
    tray.destroy()
  }
})
