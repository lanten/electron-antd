import * as config from '@/app.config'
import * as tools from '@/core/tools'

declare global {
  type AppConfig = typeof config
  type ToolsT = typeof tools
  interface Tools extends ToolsT {
    config: AppConfig
  }

  const $tools: Tools

  namespace NodeJS {
    interface Global {
      __$tools: Tools
    }
  }
}
