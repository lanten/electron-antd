/**
 * electron-builder configuration
 * https://www.electron.build/configuration/configuration
 */

import path from 'path'
import { Configuration, CliOptions } from 'electron-builder'
import buildConfig from './config'

const rootPath = process.cwd()

const ICON_ICO = path.resolve(rootPath, 'assets/app-icon/icon/icon.ico')
const ICON_ICNS = path.resolve(rootPath, 'assets/app-icon/icon/icon.icns')

const {
  npm_package_name: productName,
  npm_package_buildVersion: buildVersion,
  npm_package_appId: appId,
  npm_package_version: version,
} = process.env

const config: Configuration = {
  productName,
  buildVersion,
  appId,
  files: ['dist', 'assets', 'package.json'],
  asar: false,
  directories: {
    buildResources: 'assets',
    output: path.join(buildConfig.release, `${productName}-release-${version}.${buildVersion}`),
  },
  win: {
    icon: ICON_ICO,
    target: ['nsis', 'msi'],
  },
  mac: {
    icon: ICON_ICNS,
  },
  dmg: {
    icon: ICON_ICNS,
    contents: [
      { x: 130, y: 220 },
      { x: 410, y: 220, type: 'link', path: '/Applications' },
    ],
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
