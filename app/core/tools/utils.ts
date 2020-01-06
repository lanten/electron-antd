/**
 * 格式化日期
 * @param format
 */
export function formatDate(format = 'YYYY-MM-DD H:I:S.MS') {
  const date = new Date()

  const obj = {
    YYYY: fixedStringLength(date.getFullYear(), 4),
    MM: fixedStringLength(date.getMonth() + 1, 2),
    DD: fixedStringLength(date.getDate(), 2),
    H: fixedStringLength(date.getHours(), 2),
    I: fixedStringLength(date.getMinutes(), 2),
    S: fixedStringLength(date.getSeconds(), 2),
    MS: fixedStringLength(date.getMilliseconds(), 3),
  }

  return format.replace(/(YYYY|MM|DD|H|I|S|MS)/g, (_, $1) => {
    return obj[$1]
  })
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
