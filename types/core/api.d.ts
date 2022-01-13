import * as api from '@/core/api'
declare global {
  /**
   * 各种网络请求
   *
   * @source app/core/api
   * @define build/webpack.config.base.ts#L37
   */
  const $api: typeof api
}
