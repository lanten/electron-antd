/**
 * 页面全局变量 $config
 */

const path = require('path')

module.exports = {
  // 应用名称
  appName: 'electron-antd',

  // 应用主图标 (桌面)
  appIcon: path.join(__dirname, '../assets/app-icon/app-icon@256.png'),

  // 亮色风格托盘图标 标准尺寸 16*16, 系统会自动载入 @2x 和 @3x
  trayIconLight: path.join(__dirname, '../assets/tray-icon/tray-icon-light.png'),

  // 暗色风格托盘图标 (仅 macOS)
  trayIconDark: path.join(__dirname, '../assets/tray-icon/tray-icon-dark.png'),
}