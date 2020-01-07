import { app, Tray } from 'electron'

import { creatAppTray } from './tray'

let tray: Tray

app.on('ready', () => {
  tray = creatAppTray()
  $tools.createWindow('home')
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
