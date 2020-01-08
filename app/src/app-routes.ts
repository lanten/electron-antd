const views = require.context('./views', true, /routes\.tsx?$/)
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

export type RouterKey = 'home' | 'demo' | 'no-match'
