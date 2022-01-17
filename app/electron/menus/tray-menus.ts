import { MenuItemConstructorOptions } from 'electron'

export const trayMenus: MenuItemConstructorOptions[] = [
  {
    label: 'Home',
    click: (): void => {
      $tools.createWindow('Home')
    },
  },

  {
    label: 'Page Params',
    click: (): void => {
      $tools.createWindow('PageParams', {
        params: { test: 'test-params' },
        query: { testObj: JSON.stringify({ aa: ['bb', 'cc'] }) },
      })
    },
  },

  {
    label: 'Demo - Custom Titlebar',
    click: (): void => {
      $tools.createWindow('Demo')
    },
  },

  {
    label: 'Help',
    submenu: [
      {
        label: 'Log Viewer',
        click: (): void => {
          $tools.createWindow('LogViewer')
        },
      },
      { type: 'separator' },
      {
        label: 'About',
        click: (): void => {
          $tools.createWindow('About')
          // app.setAboutPanelOptions({
          //   applicationName: $tools.APP_NAME,
          //   applicationVersion: $tools.APP_VERSION,
          //   copyright: 'lanten',
          //   authors: ['lanten'],
          //   website: 'https://github.com/lanten/electron-antd',
          //   iconPath: $tools.APP_ICON,
          // })
          // app.showAboutPanel()
        },
      },
    ],
  },

  { type: 'separator' },

  { label: 'Quit', role: 'quit' },
]
