import { remote } from 'electron'

export function initRenderer() {
  // @ts-ignore
  $tools = remote.getGlobal('__$tools')

  // @ts-ignore
  $logger = new $tools.SystemLogger('renderer')

  // @ts-ignore
  $api = remote.getGlobal('__$api')
}
