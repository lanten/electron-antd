import { remote } from 'electron'
import { SystemLogger } from '@/core/tools/system-logger'

export async function initRenderer() {
  // @ts-ignore
  $tools = remote.getGlobal('__$tools')

  // @ts-ignore
  $config = remote.getGlobal('__$config')

  // @ts-ignore
  $logger = new SystemLogger('renderer')

  // @ts-ignore
  $api = remote.getGlobal('__$api')
}
