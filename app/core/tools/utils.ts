/**
 * 格式化日期
 * @param d
 * @param format 'YYYY-MM-DD H:I:S.MS'
 */
export function formatDate(date: Date = new Date(), format = 'YYYY-MM-DD H:I:S.MS'): string {
  const obj = {
    YYYY: date.getFullYear().toString().padStart(4, '0'),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    H: date.getHours().toString().padStart(2, '0'),
    I: date.getMinutes().toString().padStart(2, '0'),
    S: date.getSeconds().toString().padStart(2, '0'),
    MS: date.getMilliseconds().toString().padStart(3, '0'),
  }

  return format.replace(/(YYYY|MM|DD|H|I|S|MS)/g, (_, $1) => {
    return obj[$1]
  })
}

/**
 * 获取 url 参数
 * @param search
 */
export function getQuery(search: string) {
  const query: Record<string, any> = {}

  const searchH = search[0] === '?' ? search.substring(1) : search

  searchH
    .trim()
    .split('&')
    .forEach((str) => {
      const strArr = str.split('=')
      const key = strArr[0]

      if (!key) return

      let val = decodeURIComponent(strArr[1])

      try {
        if ((val.startsWith('{') || val.startsWith('[')) && (val.endsWith('}') || val.endsWith(']'))) {
          val = JSON.parse(val)
        }
      } catch (err) {
        $tools.log.error(err)
      }
      query[key] = val
    })
  return query
}

/**
 * 转换成 url search
 * @param obj
 */
export function toSearch(obj: Record<string, any>): string {
  if (typeof obj === 'string') return obj

  const arr = Object.keys(obj).map((key) => {
    let val = obj[key]

    if (typeof val !== 'string') {
      try {
        val = JSON.stringify(val)
      } catch (err) {
        console.error(err)
      }
    }

    return `${key}=${encodeURIComponent(val)}`
  })
  return '?' + arr.join('&')
}
