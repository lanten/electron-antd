const routes: RouteConfig[] = [
  {
    path: '/alert-modal',
    key: 'AlertModal',
    windowOptions: {
      title: 'Alert',
      width: 400,
      height: 240,
      resizable: false,
    },
    createConfig: {
      showTitlebar: false,
    },
  },
];

export default routes;
