export default [
  {
    path: '/',
    exact: true,
    redirectTo: '/demo',
  },
  {
    path: '/demo',
    exact: true,
    asyncImport: () => import(/* webpackChunkName:"demo" */ './demo'),
  },
] as RouteConfig[]
