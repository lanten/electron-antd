import * as api from '@/core/api'
declare global {
  type ApiType = typeof api
  /**
   * 网络请求
   *
   * @source app/core/api
   * @define build/webpack.config.base.ts#L37
   */
  const $api: ApiType

  // eslint-disable-next-line no-var
  var __$api: ApiType
}
