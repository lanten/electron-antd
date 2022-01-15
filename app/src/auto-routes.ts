/**
 * @module $tools/auto-routes 自动化路由
 * @use $tools.routes
 *
 * - 自动导入 pages 文件夹下所有的 routes.tsx? 以生成路由
 * - 通过 `$tools.routes` 获取全局路由对象
 */

/** 默认路由配置 */
const DEFAULT_ROUTE_CONFIG: Partial<RouteConfig> = {}

const pages = require.context('@/src/views', true, /\/auto\.routes\.tsx?$/)

/** 以 name 为 key 的路由 Map */
const routes: Map<string, RouteConfig> = new Map()

pages.keys().forEach((path) => {
  const conf: RouteConfig | RouteConfig[] = pages(path).default
  flatRoutes(conf)
})

function flatRoutes(routes: RouteConfig | RouteConfig[], parent?: RouteConfig) {
  const routesH = Array.isArray(routes) ? routes : [routes]

  routesH.forEach((conf) => {
    if (parent) {
      conf.parentNamePath = parent.parentNamePath ? parent.parentNamePath.concat(parent.name) : [parent.name]
      conf.parent = parent
    }

    if (Array.isArray(conf.routes) && conf.routes.length) {
      // if (conf.path) {
      //   console.warn(`路由配置异常 [${conf.name}]：配有 routes 子路由的情况下不应存在 path 字段`)
      // }
      flatRoutes(conf.routes, conf)
    } else {
    }
    addRouteConfig(Object.assign({}, DEFAULT_ROUTE_CONFIG, conf))
  })
}

/**
 * 添加一个路由
 * @param conf
 */
function addRouteConfig(conf: RouteConfig) {
  routes.set(conf.name, conf)
}

export default routes
