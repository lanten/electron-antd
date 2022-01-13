const routes: RouteConfig[] = [
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
      showTitlebar: false,
      hideMenus: true,
    },
  },
]

export default routes
