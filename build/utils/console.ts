import pc from 'picocolors'

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
    this.log('WARN', pc.yellow(message))
  }
  error(message: string | Error, showDetail = false) {
    let messageH: string
    if (message instanceof Error) {
      messageH = `${pc.bold(message.name)}: ${message.message}`
      if (showDetail) messageH = `Detail: ${messageH}\n${message.stack}`
    } else {
      messageH = message
    }
    this.log('ERROR', pc.red(messageH))
  }
  success(message: string) {
    this.log('SUCCESS', pc.green(message))
  }

  log(type: LogTypes, message: string | Error) {
    const conf = config[type]
    const str = `[${this.getDateStr()}] ${pc.bold(pc[conf.color](pc.white(this.center(type))))} ${message}`

    console.log(str)
    return str
  }

  center(str: string, width = 9) {
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

    const obj = {
      H: date.getHours().toString().padStart(2, '0'),
      I: date.getMinutes().toString().padStart(2, '0'),
      S: date.getSeconds().toString().padStart(2, '0'),
      MS: date.getMilliseconds().toString().padStart(3, '0'),
    }

    return `${pc.yellow(`${obj.H}:${obj.I}:${obj.S}`)}.${pc.gray(obj.MS)}`
  }
}

export const exConsole = new Console()
