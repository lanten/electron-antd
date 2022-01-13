const routes: RouteConfig[] = [
  {
    name: 'LogViewer',
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
