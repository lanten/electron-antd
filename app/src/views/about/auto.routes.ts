const routes: RouteConfig[] = [
  {
    name: 'About',
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
      showTitlebar: true,
      hideMenus: true,
    },
  },
]

export default routes
