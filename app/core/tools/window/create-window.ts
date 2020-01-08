import path from 'path'
import { BrowserWindow, BrowserWindowConstructorOptions, Rectangle } from 'electron'
import { log } from '../log'
import routes, { RouterKey } from '@/src/auto-routes'

const { NODE_ENV, port, host } = process.env

/** 已创建的窗口列表 */
export const windowList: Map<RouterKey, BrowserWindow> = new Map()

/**
 * 通过 routes 中的 key(name) 得到 url
 * @param key
 */
export function getWindowUrl(key: RouterKey): string {
  const routePath = routes.get(key)?.path
  if (NODE_ENV === 'development') {
    return `http://${host}:${port}#${routePath}`
  } else {
    return `file://${path.join(__dirname, '../renderer/index.html')}#${routePath}`
  }
}

/**
 * 创建一个新窗口
 * @param key
 * @param options
 */
export function createWindow(key: RouterKey, options: BrowserWindowConstructorOptions = {}): BrowserWindow {
  const routeConf: RouteConfig | AnyObj = routes.get(key) || {}
  let win: BrowserWindow | undefined = windowList.get(key)

  // 如果窗口已存在则激活此窗口而不是创建一个新的
  if (win) {
    win.show()
    return win
  }

  win = new BrowserWindow({
    ...$tools.DEFAULT_WINDOW_CONFIG, // 默认新窗口选项
    ...routeConf.window, // routes 中的配置的window选项
    ...options, // 调用方法时传入的选项
  })

  const url = getWindowUrl(key)
  windowList.set(key, win)
  win.loadURL(url)

  if (routeConf.saveWindowBounds) {
    win.setBounds(getLocalBounds(key))
  }

  win.once('ready-to-show', () => {
    win?.show()
    if (routeConf.saveWindowBounds) win?.webContents.openDevTools()
  })

  win.once('show', () => {
    log.info(`Window <${key}:${win?.id}> url: ${url} is opened.`)
  })

  win.on('close', () => {
    if (routeConf.saveWindowBounds && win) saveLocalBounds(key, win)
    windowList.delete(key)
    log.info(`Window <${key}:${win?.id}> is closed.`)
  })

  return win
}

/**
 * 将指定窗口的位置和尺寸保存到 localStorage
 * @param win
 */
export function saveLocalBounds(key: RouterKey, win: BrowserWindow) {
  const bounds = win.getBounds()

  try {
    const boundsStr = JSON.stringify(bounds)
    localStorage.setItem(`bounds-${key}`, boundsStr)
    log.info(`save window bounds ${key} success: ${boundsStr}`)
  } catch (error) {
    log.error(`save window bounds <${key}> failed: ${error.message}`)
  }
}

/**
 * 从 localStorage 中取出已保存的窗口位置和尺寸信息
 * @param key
 */
export function getLocalBounds(key: RouterKey) {
  let bounds: Partial<Rectangle> = {}
  try {
    bounds = JSON.parse(localStorage.getItem(key) || '')
  } catch (error) {
    log.error(`get window bounds <${key}> failed: ${error.message}`)
  }
  return bounds
}
