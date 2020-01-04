import fs from 'fs'
import { execSync } from 'child_process'

export * from './console'

/**
 * 同步执行命令
 * @param {String} path
 * @param {String} bash
 * @param {String} msg
 */
export function syncExec(cwd: string, bash: string, msg?: string): void {
  try {
    execSync(bash, { cwd })
    console.log(`=> ${msg || bash}成功`)
  } catch (ex) {
    console.log(`=> ${msg || bash}失败\n`, ex)
  }
}

/**
 * 清空文件夹
 *
 * @param {String} path 要清空的文件夹路径
 * @param {Boolean} delDir 清空完成后是否删除文件夹
 * @param {Boolean} createDir 如果不存在,是否创建
 * @param {Boolean} log 是否输出日志
 */
export function clearDir(path: string, delDir?: boolean, createDir?: boolean, log?: boolean): void {
  let files = []

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(file => {
      const curPath = path + '/' + file

      if (fs.statSync(curPath).isDirectory()) {
        clearDir(curPath, true)
        if (log) console.log(`[删除目录] - ${curPath}`)
      } else {
        fs.unlinkSync(curPath)
        if (log) console.log(`[删除文件] - ${curPath}`)
      }
    })

    if (delDir) fs.rmdirSync(path)
  } else if (createDir) syncExec(process.cwd(), `mkdir -p ${path}`)
}
