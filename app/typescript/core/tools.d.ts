import * as tools from '@/core/tools'

declare global {
  type Tools = typeof tools

  const $tools: Tools

  namespace NodeJS {
    interface Global {
      __$tools: Tools
    }
  }
}
