const routes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    redirect: '/demo',
    saveWindowBounds: true,
    window: {
      title: '好的',
      width: 1200,
      height: 800,
    },
  },
]

export default routes
