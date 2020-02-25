const routes: RouteConfig[] = [
  {
    key: 'LogViewer',
    path: '/log-viewer',
    windowOptions: {
      title: 'LogViewer',
    },
    createConfig: {
      showTitlebar: false,
      saveWindowBounds: true,
    },
  },
]

export default routes
