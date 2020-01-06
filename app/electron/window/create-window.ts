import path from 'path'
import { BrowserWindow } from 'electron'

import { urls } from './window-urls'

const { NODE_ENV, port, host } = process.env

export const windowList = {}

/**
 * 通过 window-urls.js 中的 key 得到 url
 * @param {String} urlKey
 */
export function getWindowUrl(key: string) {
  let url,
    hash = urls[key],
    config = {}
  if (typeof hash === 'object') {
    config = hash.config || {}
    hash = hash.url
  }
  if (NODE_ENV === 'development') {
    url = `http://${host}:${port}#${hash}`
  } else {
    url = `file://${path.join(__dirname, '../renderer/index.html')}#${hash}`
  }
  return { url, config }
}

/**
 * 创建一个子窗口
 * @param {String} urlKey
 * @param {Object} BrowserWindowOptions
 */
export function createWindow(key: string, options: any = {}) {
  let win = windowList[key]

  if (windowList[key]) {
    win.show()
    return win
  }

  const { url, config } = getWindowUrl(key)

  let from
  if (options.from) {
    from = options.from
    delete options.from
  }

  const defaultOptions = {
    icon: $tools.APP_ICON,
    width: 800,
    height: 600,
    show: false,
    hasShadow: true,
    webPreferences: {
      nodeIntegration: true,
    },
    // frame: false, // 无边框窗口
    // skipTaskbar: false, // 是否在任务栏中隐藏窗口
    // backgroundColor: '#fff',
    // transparent: true, // 窗口是否透明
    // titleBarStyle: 'default',
    vibrancy: 'fullscreen-ui', // 毛玻璃效果
    ...config,
  }
  win = new BrowserWindow(Object.assign(defaultOptions, options))
  if (from) win.from = from
  windowList[key] = win
  win.loadURL(url)
  win.once('ready-to-show', () => {
    win.show()
    // win.webContents.openDevTools()
  })

  win.on('close', () => {
    delete windowList[key]
  })

  return win
}
