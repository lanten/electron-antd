import { SystemLogger } from '@/core/tools/system-logger'

declare global {
  const $logger: SystemLogger

  namespace NodeJS {
    interface Global {
      __$logger: SystemLogger
    }
  }
}
