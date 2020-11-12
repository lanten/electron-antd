import * as tools from '@/core/tools'

declare global {
  type Tools = typeof tools

  /**
   * 全局工具集
   *
   * @来源 app/core/tools
   * @定义 build/webpack.config.base.ts#L38
   */
  const $tools: Tools

  namespace NodeJS {
    interface Global {
      __$tools: Tools
    }
  }
}
