import * as tools from '@/core/tools'

declare global {
  type ToolsType = typeof tools

  /**
   * @source app/core/tools
   * @define build/webpack.config.base.ts#L38
   */
  const $tools: ToolsType

  // eslint-disable-next-line no-var
  var __$tools: ToolsType
}
