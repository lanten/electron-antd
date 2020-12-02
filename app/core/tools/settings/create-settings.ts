import fs from 'fs'
import path from 'path'
import { USER_DATA_PATH } from '../paths'
import { log } from '../log'

export class CreateSettings<T extends AnyObj = AnyObj> {
  public filePath: string
  public settingsPath: string

  /**
   * 创建一个设置项集合 (json)
   * @param name 集合名称
   * @param folderPath 存放 json 的文件夹
   */
  constructor(public readonly name: string, public readonly folderPath?: string) {
    this.settingsPath = folderPath ?? path.resolve(USER_DATA_PATH, 'settings')
    this.filePath = path.resolve(this.settingsPath, `${name}.settings.json`)
  }

  hasSettingsFile(): boolean {
    const hasFile = fs.existsSync(this.filePath)

    if (hasFile) {
      return true
    } else if (!fs.existsSync(this.settingsPath)) {
      fs.mkdirSync(this.settingsPath, { recursive: true })
    }
    return false
  }

  createSettingsFile(): void {
    fs.writeFileSync(this.filePath, '{}')
    log.info(`Create settings file <${this.name}> path: ${this.filePath}`)
  }

  /** 获取全部配置 */
  get(): Partial<T>
  /** 通过 key 获取单个配置 */
  get<K extends keyof T>(key: K): T[K]
  /** 通过 key 获取单个配置 */
  get(key?: keyof T): unknown {
    let config: Partial<T> = {}
    if (this.hasSettingsFile()) {
      const configStr = fs.readFileSync(this.filePath, 'utf-8')
      try {
        config = JSON.parse(configStr)
      } catch (error) {
        log.error(error)
      }
    } else {
      config = {}
      this.createSettingsFile()
    }

    if (key) {
      return config[key]
    } else {
      return config
    }
  }

  /**
   * 写入配置项
   * @param key
   * @param config
   */
  set<K extends keyof T>(key: K | Partial<T>, config?: Partial<T> | Partial<T[K]>): boolean {
    const jsonConfig = this.get()
    let confH: Partial<T>

    if (typeof key === 'string') {
      if (config) {
        confH = config
      } else {
        return false
      }
    } else if (key) {
      confH = key as Partial<T>
    } else {
      return false
    }

    let flg = false
    try {
      let saveStr: string
      let logMessage: string
      if (typeof key === 'string') {
        saveStr = JSON.stringify(Object.assign({}, jsonConfig, { [key]: confH }), undefined, 2)
        logMessage = `Set settings <${this.name}> - <${key}> : `
      } else {
        saveStr = JSON.stringify(Object.assign({}, jsonConfig, confH), undefined, 2)
        logMessage = `Set settings <${this.name}> : `
      }
      fs.writeFileSync(this.filePath, saveStr, 'utf-8')
      log.info(logMessage, confH)
      flg = true
    } catch (error) {
      log.error(error)
    }

    return flg
  }
}
