import { MenuItemConstructorOptions } from 'electron'

export const trayMenus: MenuItemConstructorOptions[] = [
  { label: 'home', click: () => $tools.createWindow('Home') },

  { type: 'separator' },

  {
    label: 'page-params',
    click: () =>
      $tools.createWindow('PageParams', {
        params: { test: 'test-params' },
        query: { testObj: { aa: ['bb', 'cc'] } },
      }),
  },
  { label: 'demo2', click: () => $tools.createWindow('Demo') },

  { type: 'separator' },

  { label: 'about', click: () => $tools.createWindow('Demo') },
  { label: 'quit', role: 'quit' },
]
