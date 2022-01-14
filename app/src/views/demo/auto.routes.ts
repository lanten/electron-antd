const routes: RouteConfig[] = [
  {
    name: 'Demo',
    path: '/demo',
    createConfig: {
      single: false,
    },
  },
  {
    name: 'PageParams',
    path: '/page-params/:test',
  },
]

export default routes
