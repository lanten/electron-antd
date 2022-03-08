export async function initMain(): Promise<void> {
  return new Promise(async (resolve) => {
    global.__$tools = require('./tools')

    global.__$api = require('./api')

    global.__$store = require('./store').store

    resolve()
  })
}
