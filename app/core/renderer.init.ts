import { remote } from 'electron'

export function initRenderer(): void {
  global.__$tools = remote.getGlobal('__$tools')
  global.__$api = remote.getGlobal('__$api')
  global.__$store = remote.getGlobal('__$store')
}
