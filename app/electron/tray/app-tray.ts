import { Menu, Tray, systemPreferences, nativeImage } from 'electron'

import { createWindow } from '../window'
import { trayMenus } from '../menus'

const { APP_NAME, TRAY_ICON_DARK, TRAY_ICON_LIGHT } = $config

export interface AppIconConfig {
  menus?: any
  title?: string
  icon?: string
}

export function creatAppTray({ menus = trayMenus, title = APP_NAME, icon }: AppIconConfig = {}): Tray {
  const iconPath =
    icon ??
    (process.platform === 'darwin'
      ? systemPreferences.isDarkMode()
        ? TRAY_ICON_LIGHT
        : TRAY_ICON_DARK
      : TRAY_ICON_LIGHT)

  const image = nativeImage.createFromPath(iconPath)
  image.isMacTemplateImage = true
  const tray = new Tray(image)
  tray.setToolTip(title)
  tray.setContextMenu(Menu.buildFromTemplate(menus))

  tray.on('double-click', () => {
    createWindow('home')
  })

  return tray
}
