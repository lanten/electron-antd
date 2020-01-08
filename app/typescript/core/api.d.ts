import * as api from '@/core/api'
declare global {
  const $api: typeof api
  namespace NodeJS {
    interface Global {
      __$api: typeof $api
    }
  }
}
