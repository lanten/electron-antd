import * as tools from './tools'

export async function initMain() {
  return new Promise(async resolve => {
    // @ts-ignore
    $tools = tools

    // @ts-ignore
    $logger = new $tools.SystemLogger('main')
    $logger.info(`Application <${$tools.APP_NAME}> launched.`)

    // @ts-ignore
    $api = { a: 1 }

    resolve()
  })
}
