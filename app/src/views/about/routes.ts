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
      vibrancy: 'fullscreen-ui',
    },
    createConfig: {
      showTitlebar: true,
      hideMenus: true,
    },
  },
]

export default routes
