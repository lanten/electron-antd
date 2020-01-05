import electronLog, { ElectronLog } from 'electron-log'

/**
 * 创建一个 electron-log 记录器
 * 参考：https://github.com/megahertz/electron-log
 */
export class SystemLogger {
  public logger: ElectronLog
  public logId: string

  /**
   * @param logId 记录器 ID
   */
  constructor(logId: string) {
    this.logId = logId
    this.logger = electronLog.create(logId)

    this.logger.info(`SystemLogger [${logId}] created.`)
  }

  log(...params: any[]) {
    return this.logger.log(...params)
  }

  info(...params: any[]) {
    return this.logger.info(...params)
  }

  warn(...params: any[]) {
    return this.logger.warn(...params)
  }

  error(...params: any[]) {
    return this.logger.error(...params)
  }

  debug(...params: any[]) {
    return this.logger.debug(...params)
  }

  verbose(...params: any[]) {
    return this.logger.verbose(...params)
  }
}
