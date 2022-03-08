import { app, Tray } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'

import { creatAppTray } from './tray'

require('@electron/remote/main').initialize()

$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

const appLock = app.requestSingleInstanceLock()

if (!appLock) {
  // 作为第二个实例运行时, 主动结束进程
  app.quit()
}

app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS)
  tray = creatAppTray()
  $tools.createWindow('Home')
})

app.on('second-instance', () => {
  // 当运行第二个实例时, 打开或激活首页
  $tools.createWindow('Home')
})

app.on('activate', () => {
  if (process.platform == 'darwin') {
    $tools.createWindow('Home')
  }
})

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})

app.on('before-quit', () => {
  $tools.log.info(`Application <${$tools.APP_NAME}> has exited normally.`)

  if (process.platform === 'win32') {
    tray.destroy()
  }
})
