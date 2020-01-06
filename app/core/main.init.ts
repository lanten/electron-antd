import * as tools from './tools'

export async function initMain() {
  return new Promise(async resolve => {
    // @ts-ignore
    $tools = tools

    // @ts-ignore
    $logger = new $tools.SystemLogger('main')

    // @ts-ignore
    $api = { a: 1 }

    resolve()
  })
}
