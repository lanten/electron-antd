export const trayMenus = [
  { label: 'home', click: () => $tools.createWindow('home') },

  { type: 'separator' },

  { label: 'demo1', click: () => $tools.createWindow('demo') },
  { label: 'demo2', click: () => $tools.createWindow('demo') },

  { type: 'separator' },

  { label: 'about', click: () => $tools.createWindow('demo') },
  { label: 'quit', role: 'quit' },
]
