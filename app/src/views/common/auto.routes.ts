const routes: RouteConfig[] = [
  {
    name: 'NoMatch',
    path: '*',
    windowOptions: {
      title: 'Page Error',
    },
  },
  {
    name: 'AlertModal',
    path: '/alert-modal',
    windowOptions: {
      title: 'Alert',
      width: 460,
      height: 240,
      resizable: false,
    },
    createConfig: {
      hideMenus: true,
    },
  },
]

export default routes
