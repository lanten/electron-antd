import { app, Tray } from 'electron'

import { creatAppTray } from './tray'
import { createWindow } from './window'

const { NODE_ENV } = process.env

if (NODE_ENV === 'development') {
  // react-developer-tools
  require('electron-debug')({ showDevTools: false })
  app.on('ready', () => {
    const installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.REACT_DEVELOPER_TOOLS).catch((err: any) => {
      console.log('Unable to install `react-developer-tools`: \n', err)
    })
  })
}

let tray: Tray

app.on('ready', () => {
  tray = creatAppTray()
  createWindow('home')
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
