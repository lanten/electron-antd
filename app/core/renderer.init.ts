import { getGlobal } from '@electron/remote'

export function initRenderer(): void {
  global.__$tools = getGlobal('__$tools')

  // global.__$api = require('./api') // 渲染进程独立加载API函数
  global.__$api = getGlobal('__$api') // 共享主进程函数，这将导致devtools无法调试

  global.__$store = getGlobal('__$store')
}
