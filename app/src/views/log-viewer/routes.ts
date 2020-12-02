const routes: RouteConfig[] = [
  {
    key: 'LogViewer',
    path: '/log-viewer',
    windowOptions: {
      title: 'LogViewer',
    },
    createConfig: {
      saveWindowBounds: true,
    },
  },
]

export default routes
