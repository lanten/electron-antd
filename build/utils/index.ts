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
    files.forEach(file => {
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

/**
 * 固定字符串长度
 * @param n 要转换的内容
 * @param p 固定长度
 * @param r 补齐字符
 */
export function fixedStringLength(n: number | string, p?: number, r = '0'): string {
  let str = String(n)
  if (p && str.length !== p) {
    if (str.length >= p) {
      str = str.replace(new RegExp(`^(.{${p}})(.*)$`), '$1')
    } else {
      const lost = p - str.length
      if (lost > 0) {
        for (let i = 0; i < lost; i++) {
          str = r + str
        }
      }
    }
  } else {
    str = String(n)
  }

  return str
}
