/**
 * electron-builder configuration
 * https://www.electron.build/configuration/configuration
 */

import path from 'path'
import { Configuration, CliOptions } from 'electron-builder'
import devConfig from './dev.config'

const ICON_ICO = path.resolve(__dirname, '../assets/app-icon/icon/icon.ico')
const ICON_ICNS = path.resolve(__dirname, '../assets/app-icon/icon/icon.icns')

const config: Configuration = {
  productName: 'electron-antd',
  appId: 'org.electron.electron-antd',
  files: ['dist/', 'assets', 'node_modules/', 'package.json'],
  asar: false,
  directories: {
    buildResources: 'assets',
    output: devConfig.release,
  },
  dmg: {
    icon: ICON_ICNS,
    contents: [
      { x: 130, y: 220 },
      { x: 410, y: 220, type: 'link', path: '/Applications' },
    ],
  },
  win: {
    icon: ICON_ICO,
    target: ['nsis', 'msi'],
  },
  linux: {
    icon: ICON_ICNS,
    target: ['deb', 'rpm', 'AppImage'],
    category: 'Development',
  },
}

const packageConfig: CliOptions = {
  config,
}

export default packageConfig
