import * as tools from './tools'
import { store } from './store'

export async function initMain() {
  return new Promise(async resolve => {
    global.__$tools = tools
    global.__$api = { a: '1' }
    global.__$store = store

    resolve()
  })
}
