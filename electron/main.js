
const { app } = require('electron')
const { creatTray } = require('./tray')
const { createWindow } = require('./window')

const { NODE_ENV } = process.env

global.$api = require('./api')

if (NODE_ENV === 'development') {
  // react-developer-tools
  require('electron-debug')({ showDevTools: false })
  app.on('ready', () => {
    let installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.REACT_DEVELOPER_TOOLS).then(() => {
    }).catch(err => {
      console.log('Unable to install `react-developer-tools`: \n', err)
    })
  })
}


app.on('ready', () => {
  tray = creatTray()
  createWindow('home')
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  if (process.platform === 'win32') {
    tray.destroy()
  }
})


