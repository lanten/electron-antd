import { remote, webFrame } from 'electron'

export function initRenderer() {
  // @ts-ignore
  $tools = remote.getGlobal('__$tools')

  // @ts-ignore
  $logger = new $tools.SystemLogger('renderer')
  $logger.info(`Window <${webFrame.routingId}> url: ${location.href} is open`)

  // @ts-ignore
  $api = remote.getGlobal('__$api')
}
