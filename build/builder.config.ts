/**
 * electron-builder configuration
 * https://www.electron.build/configuration/configuration
 */

import path from 'path'
import { Configuration, CliOptions } from 'electron-builder'

const config: Configuration = {
  productName: 'electron-antd',
  appId: 'org.electron.electron-antd',
  // icon: path.resolve(__dirname, '../assets/app-icon/icon/icon'),
  files: ['dist/', 'assets', 'node_modules/', 'package.json'],
  asar: false,
  directories: {
    buildResources: 'assets',
    output: 'release',
  },
  dmg: {
    icon: path.resolve(__dirname, '../assets/app-icon/icon/icon.icns'),
    contents: [
      { x: 130, y: 220 },
      { x: 410, y: 220, type: 'link', path: '/Applications' },
    ],
  },
  win: {
    icon: path.resolve(__dirname, '../assets/app-icon/icon/icon.ico'),
    target: ['nsis', 'msi'],
  },
  linux: {
    icon: path.resolve(__dirname, '../assets/app-icon/icon/icon.icns'),
    target: ['deb', 'rpm', 'AppImage'],
    category: 'Development',
  },
}

const packageConfig: CliOptions = {
  config,
}

export default packageConfig
