import fs from 'fs'
import path from 'path'

export interface LogFile {
  name: string
  fileName: string
  absolutePath: string
}

export interface LogDetailLine {
  date: string
  type: string
  env: string
  message: string
}

export class LogReader {
  private watcher?: fs.FSWatcher
  private oldLogDetail = ''

  /** 获取文件列表 */
  getLogFiles(): LogFile[] {
    let files
    try {
      files = fs.readdirSync($tools.LOGS_PATH)
    } catch (error) {
      $tools.log.error('Failed to read log file list.')
      return []
    }

    const res: LogFile[] = []
    files.forEach(fileName => {
      const ext = fileName.replace(/.+(\..+)$/, '$1')
      if (ext !== '.log') return

      res.unshift({
        fileName,
        name: fileName.replace(ext, ''),
        absolutePath: path.resolve($tools.LOGS_PATH, fileName),
      })
    })

    return res
  }

  /** 打开并监听日志文件 */
  openLogFile(file: LogFile, listener: (detail: LogDetailLine[]) => void) {
    listener(this.getLogDetail(file))

    if (this.watcher) {
      this.watcher.close()
      this.watcher = undefined
    }

    this.watcher = fs.watch(file.absolutePath, (event, filename) => {
      console.log('文件刷新', { event, filename })
      listener(this.getLogDetail(file))
    })
  }

  /** 获取日志详情 */
  getLogDetail(file: LogFile): LogDetailLine[] {
    let detailStr = ''
    try {
      detailStr = fs.readFileSync(file.absolutePath, { encoding: 'utf-8' })
    } catch (error) {
      $tools.log.error('Failed to read log file detail.')
    }

    const res: LogDetailLine[] = []

    if (detailStr) {
      detailStr
        .replace(this.oldLogDetail, '')
        .split(/\n/)
        .forEach(str => {
          if (!str) return
          if (str[0] !== '[') {
            res.push({ date: '', type: '', env: '', message: str })
          } else {
            str.replace(
              /^\[([^\]]*)\]\s*\[([^\]]*)\]\s*\[([^\]]*)\]\s*(.*)$/,
              (_, date, type, env, message) => {
                res.push({ date, type, env, message })
                return ''
              }
            )
          }
        })
      this.oldLogDetail = detailStr
    }

    return res
  }
}
