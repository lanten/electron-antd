import * as config from '../app.config'
import * as tools from './tools'

/** 挂载全局模块 */
function mapProvide() {
  // @ts-ignore
  $tools = { ...tools, config }

  // @ts-ignore
  $logger = new $tools.SystemLogger('main')

  // @ts-ignore
  $api = { a: 1 }
}

mapProvide()
