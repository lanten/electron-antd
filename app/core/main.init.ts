import * as tools from './tools'
import { store } from './store'
import * as api from './api'

export async function initMain(): Promise<void> {
  return new Promise(async (resolve) => {
    global.__$tools = tools
    global.__$api = api
    global.__$store = store

    resolve()
  })
}
