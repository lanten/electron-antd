const routes: RouteConfig[] = [
  {
    path: '/alert-modal',
    key: 'AlertModal',
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
