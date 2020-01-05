import * as config from '@/core/config'

declare global {
  type AppConfig = typeof config

  const $config: AppConfig

  namespace NodeJS {
    interface Global {
      __$config: AppConfig
    }
  }
}
