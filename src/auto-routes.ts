// 自动导入 views 文件夹下所有的 routes.tsx? 以生成路由
const views = require.context('./views', true, /routes\.tsx?$/)

let routes: Array<RouteConfig> = []
let notFoundIndex: number | undefined = undefined

views.keys().map(path => {
  const conf = views(path).default
  if (Array.isArray(conf)) {
    routes = routes.concat(conf)
  } else {
    routes.push(conf)
  }
})

/** 一个以 path 为 key 的对象 */
export const BREADCRUMB_MAP: { [key: string]: RouteConfig } = {}

routes = routes.map((route, index) => {
  if (route.path && typeof route.path === 'string') {
    BREADCRUMB_MAP[route.path] = route || {}
  }
  if (!route.path) {
    notFoundIndex = index
  }
  return route
})

// 将 404 置于栈底
if (notFoundIndex !== undefined) {
  const notFound = routes[notFoundIndex]
  routes.splice(notFoundIndex, 1)
  routes.push(notFound)
}

export default routes
