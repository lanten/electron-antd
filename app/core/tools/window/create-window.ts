import path from 'path'
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { log } from '../log'
import routes, { RouterKeys } from '@/src/auto-routes'

const { NODE_ENV, port, host } = process.env

/** 已创建的窗口列表 */
export const windowList: Map<RouterKeys, BrowserWindow> = new Map()

/**
 * 通过 routes 中的 key(name) 得到 url
 * @param {String} urlKey
 */
export function getWindowUrl(key: RouterKeys): string {
  const routePath = routes.get(key)?.path
  if (NODE_ENV === 'development') {
    return `http://${host}:${port}#${routePath}`
  } else {
    return `file://${path.join(__dirname, '../renderer/index.html')}#${routePath}`
  }
}

/**
 * 创建一个新窗口
 * @param {String} urlKey
 * @param {Object} BrowserWindowOptions
 */
export function createWindow(key: RouterKeys, options: BrowserWindowConstructorOptions = {}): BrowserWindow {
  const config: BrowserWindowConstructorOptions = routes.get(key)?.window ?? {}
  let win: BrowserWindow | undefined = windowList.get(key)

  // 如果窗口已存在则激活此窗口而不是创建一个新的
  if (win) {
    win.show()
    return win
  }

  win = new BrowserWindow({
    ...$tools.DEFAULT_WINDOW_CONFIG, // 默认新窗口选项
    ...config, // routes 中的配置的选项
    ...options, // 调用方法时传入的选项
  })
  const url = getWindowUrl(key)
  windowList.set(key, win)
  win.loadURL(url)

  win.once('ready-to-show', () => {
    win?.show()
    // win.webContents.openDevTools()
  })

  win.once('show', () => {
    log.info(`Window <key:${win?.id}> url: ${url} is opened.`)
  })

  win.on('close', () => {
    windowList.delete(key)
    log.info(`Window <${key}:${win?.id}> is closed.`)
  })

  // win.on('moved', (e: any) => {
  //   console.log(e.sender.getBounds())
  // })

  return win
}
