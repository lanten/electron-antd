import { MenuItemConstructorOptions } from 'electron'

export const trayMenus: MenuItemConstructorOptions[] = [
  { label: 'Home', click: () => $tools.createWindow('Home') },
  {
    label: 'Page Params',
    click: () =>
      $tools.createWindow('PageParams', {
        params: { test: 'test-params' },
        query: { testObj: { aa: ['bb', 'cc'] } },
      }),
  },
  { label: 'Demo', click: () => $tools.createWindow('Demo') },

  {
    label: 'Help',
    submenu: [
      { label: 'Log Viewer', click: () => $tools.createWindow('LogViewer') },
      { type: 'separator' },
      { label: 'About', click: () => $tools.createWindow('About') },
    ],
  },

  { type: 'separator' },

  { label: 'Quit', role: 'quit' },
]
