import { getGlobal } from '@electron/remote'

export function initRenderer(): void {
  // @ts-ignore
  global.__$tools = getGlobal('__$tools')
  // @ts-ignore
  global.__$api = getGlobal('__$api')
  // @ts-ignore
  global.__$store = getGlobal('__$store')
}
