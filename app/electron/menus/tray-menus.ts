export const trayMenus = [
  { label: 'home', click: () => $tools.createWindow('home') },

  { type: 'separator' },

  {
    label: 'page-params',
    click: () =>
      $tools.createWindow('page-params', {
        params: { test: 'test-params' },
        query: { testObj: { aa: ['bb', 'cc'] } },
      }),
  },
  { label: 'demo2', click: () => $tools.createWindow('demo') },

  { type: 'separator' },

  { label: 'about', click: () => $tools.createWindow('demo') },
  { label: 'quit', role: 'quit' },
]
