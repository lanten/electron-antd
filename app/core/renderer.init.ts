import { remote } from 'electron'

export function initRenderer() {
  // @ts-ignore
  $tools = remote.getGlobal('__$tools')

  // @ts-ignore
  $api = remote.getGlobal('__$api')
}
