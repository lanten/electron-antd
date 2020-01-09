/** 自动导入 views 文件夹下所有的 routes.tsx? 以生成路由 */
const views = require.context('./views', true, /routes\.ts$/)
const routes: Map<string, RouteConfig> = new Map()

views.keys().forEach(path => {
  const conf: RouteConfig | RouteConfig[] = views(path).default
  if (Array.isArray(conf)) {
    conf.forEach(v => addRouteConfig(v))
  } else {
    addRouteConfig(conf)
  }
})
function addRouteConfig(conf: RouteConfig) {
  routes.set(conf.name, conf)
}

export default routes

/** createWindow 时使用的 key, 必须手动设置, 与路由的 name 对应 */
export type RouterKey = 'home' | 'demo' | 'alert-modal' | 'no-match'
