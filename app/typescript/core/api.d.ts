import * as api from '@/core/api'
declare global {
  /**
   * 各种网络请求
   *
   * @来源 app/core/api
   * @定义 build/webpack.config.base.ts#L37
   */
  const $api: typeof api
  namespace NodeJS {
    interface Global {
      __$api: typeof $api
    }
  }
}
