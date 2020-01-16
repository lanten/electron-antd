const routes: RouteConfig[] = [
  {
    name: 'demo',
    path: '/demo',
    resource: 'demo',
  },
  {
    name: 'page-params',
    path: '/page-params/:test',
    resource: 'page-params',
  },
]

export default routes
