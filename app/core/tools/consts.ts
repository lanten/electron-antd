import { BrowserWindowConstructorOptions } from 'electron'
import { asAssetsPath } from './paths'
import { app } from 'electron'

/** 应用名称 */
export const APP_NAME = app.name
/** 应用标题 */
export const APP_TITLE = 'Electron Antd'

/** 应用主图标 (桌面) */
export const APP_ICON = asAssetsPath('app-icon/app-icon@256.png')

/** 亮色风格托盘图标 标准尺寸 16*16, 系统会自动载入 @2x 和 @3x */
export const TRAY_ICON_LIGHT = asAssetsPath('tray-icon/tray-icon-light.png')

/** 暗色风格托盘图标 (仅 macOS) */
export const TRAY_ICON_DARK = asAssetsPath('tray-icon/tray-icon-dark.png')

/** 创建新窗口时默认加载的选项 */
export const DEFAULT_WINDOW_CONFIG: BrowserWindowConstructorOptions = {
  icon: APP_ICON,
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
}
