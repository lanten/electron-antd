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
 * @returns
 */
export function getQuery(search = window.location.search) {
  const query: AnyObj = {}

  const searchH = search[0] === '?' ? search.substr(1) : search

  searchH.split('&').forEach((str) => {
    const strArr = str.split('=')
    const key = strArr[0]

    if (!key) return

    const val = decodeURIComponent(strArr[1])

    query[key] = val
  })
  return query
}

/**
 * 转换成 url search
 * @param obj
 * @param hasQuestionMark
 * @returns
 */
export function toSearch<T = AnyObj>(obj: T, hasQuestionMark = true) {
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
  return (hasQuestionMark ? '?' : '') + arr.join('&')
}
