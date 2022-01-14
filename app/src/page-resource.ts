/**
 * 页面资源集合，请不要在主进程中引用
 */

// common
export const NoMatch = import('./views/common/no-match')
export const AlertModal = import('./views/common/alert-modal')

// 设为 undefined 将不会创建路由，一般用于重定向
export const Home = undefined

export const Demo = import('./views/demo/demo')
export const PageParams = import('./views/demo/page-params')
export const LogViewer = import('./views/log-viewer/log-viewer')
export const About = import('./views/about/about')
