const routes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    redirect: '/demo',
    saveWindowBounds: true,
    window: {
      title: 'App Home (redirect to demo)',
      width: 1200,
      height: 800,
    },
  },
]

export default routes
