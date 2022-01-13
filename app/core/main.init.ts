import * as tools from './tools'
import { store } from './store'
import * as api from './api'

export async function initMain(): Promise<void> {
  return new Promise(async (resolve) => {
    // @ts-ignore
    global.__$tools = tools
    // @ts-ignore
    global.__$api = api
    // @ts-ignore
    global.__$store = store

    resolve()
  })
}
