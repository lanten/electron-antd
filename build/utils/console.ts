import chalk from 'chalk'

const config = {
  INFO: { color: 'bgCyan' },
  WARN: { color: 'bgYellow' },
  SUCCESS: { color: 'bgGreen' },
  ERROR: { color: 'bgRed' },
}

export type LogTypes = keyof typeof config

export class Console {
  info(message: string) {
    this.log('INFO', message)
  }
  warn(message: string) {
    this.log('WARN', message)
  }
  error(message: string) {
    this.log('ERROR', message)
  }
  success(message: string) {
    this.log('SUCCESS', message)
  }

  log(type: LogTypes, message: string) {
    const conf = config[type]
    const str = `[ ${chalk.gray(this.getDateStr())} ] : ${chalk.white[conf.color].bold(
      this.center(type)
    )} ${message}\n`

    console.log(str)
    return str
  }

  center(str: string, width = 10) {
    const lack = width - str.length

    if (lack <= 0) return str

    const offsetLeft = parseInt(String(lack / 2))
    const offsetRight = lack - offsetLeft

    return `${this.getSpaceStr(offsetLeft)}${str}${this.getSpaceStr(offsetRight)}`
  }

  getSpaceStr(count: number) {
    let str = ''
    for (let i = 0; i < count; i++) {
      str += ' '
    }
    return str
  }

  getDateStr() {
    const date = new Date()

    const Y = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()
    const H = date.getHours()
    const MIN = date.getMinutes()
    const S = date.getSeconds()

    const p = (n: number) => {
      if (n < 10) {
        return `0${n}`
      } else {
        return n
      }
    }

    return `${Y}-${p(M)}-${p(D)} ${p(H)}:${p(MIN)}:${p(S)}`
  }
}

export const exConsole = new Console()
