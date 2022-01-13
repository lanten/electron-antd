import * as tools from '@/core/tools'

declare global {
  type Tools = typeof tools

  // eslint-disable-next-line no-var
  var __$tools: Tools

  /**
   * @source app/core/tools
   * @define build/webpack.config.base.ts#L38
   */
  const $tools: Tools
}
