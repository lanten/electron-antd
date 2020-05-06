import fs from 'fs'
import path from 'path'

import { exConsole } from './console'
export * from './console'

/**
 * 清空文件夹
 *
 * @param {String} pathStr 要清空的文件夹路径
 * @param {Boolean} delDir 清空完成后是否删除文件夹
 * @param {Boolean} createDir 如果不存在,是否创建
 * @param {Boolean} log 是否输出日志
 */
export function clearDir(pathStr?: string, delDir?: boolean, createDir?: boolean, log?: boolean): void {
  if (!pathStr) return exConsole.warn('[clearDir]: Empty Path!')
  let files = []

  if (fs.existsSync(pathStr)) {
    files = fs.readdirSync(pathStr)
    files.forEach((file) => {
      const curPath = path.join(pathStr, file)

      if (fs.statSync(curPath).isDirectory()) {
        clearDir(curPath, true)
        if (log) exConsole.success(`[delete dir]: ${curPath}`)
      } else {
        fs.unlinkSync(curPath)
        if (log) exConsole.success(`[delete file]: ${curPath}`)
      }
    })

    if (delDir) fs.rmdirSync(pathStr)
  } else if (createDir) {
    fs.mkdirSync(pathStr)
  }
}
