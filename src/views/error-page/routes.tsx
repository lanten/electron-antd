export default [
  {
    path: '/403',
    title: '没有权限',
    code: 403,
    asyncImport: () => import(/* webpackChunkName:"error-page" */ './error-page'),
  },
  {
    title: '页面未找到',
    code: 404,
    asyncImport: () => import(/* webpackChunkName:"error-page" */ './error-page'),
  },
] as RouteConfig[]
