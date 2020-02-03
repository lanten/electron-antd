const routes: RouteConfig[] = [
  {
    key: 'About',
    path: '/about',
    windowOptions: {
      title: 'About',
      resizable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      width: 300,
      height: 240,
    },
    createConfig: {
      showTitlebar: false,
      created(win) {
        win.setMenuBarVisibility(false)
      },
    },
  },
]

export default routes
