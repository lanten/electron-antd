/**
 * 全局方法
 * $app
 */

/**
 * 中划线转驼峰
 * @param {String} str
 * @param {Boolean} c 首字母是否大写
 */
export function toCamel(str: string, c?: boolean): string {
  let strH = str.replace(/([^-])(?:-+([^-]))/g, (_, $1, $2) => $1 + $2.toUpperCase())
  if (c) strH = strH.slice(0, 1).toUpperCase() + strH.slice(1)
  return strH
}

// 获取 url 参数
export function getQuery() {
  const query: any = {}
  const { search } = window.location
  search
    .substr(1)
    .split('&')
    .forEach(str => {
      const strArr = str.split('=')
      query[strArr[0]] = decodeURIComponent(strArr[1])
    })
  return query
}

/**
 * 将对象转换成 search
 * @param {Object} obj
 */
getQuery.toSearch = (obj: any) => {
  const arr = Object.keys(obj).map(key => {
    return `${key}=${obj[key]}`
  })
  return '?' + arr.join('&')
}

/**
 * 格式化金额 千分符
 * @param value
 * @param fixed
 */
export function transformThousandth(value: number | string, fixed = 2): string {
  const num = Number(value)
  if (isNaN(num)) return (0).toFixed(fixed)
  return num.toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

/**
 * 监听事件
 * @param eventName
 * @param callback
 */
export function eventListen(eventName: EventTypes, callback: EventListener) {
  return new Promise(resolve => {
    window.addEventListener(eventName, callback || resolve)
  })
}

/**
 * 触发事件
 * @param eventName
 * @param detail
 */
export function eventDispatch(eventName: EventTypes, detail: any): boolean {
  return window.dispatchEvent(new CustomEvent(eventName, { detail }))
}

/**
 * 替换对象空属性
 * @param obj 对象
 * @param content 替换后的内容
 * @param recursive 是否递归替换 (如果遇到数组,性能消耗较大)
 */
export function replaceEmptyProperty(obj?: object, content: any = '', recursive = false) {
  if (!obj) return {}
  const newObj = {}
  for (const key in obj) {
    const val = obj[key]
    if ([null, undefined, ''].includes(val)) {
      newObj[key] = content
    } else if (recursive && typeof val === 'object') {
      if (Array.isArray(val)) {
        newObj[key] = val.map(v => replaceEmptyProperty(v, content, recursive))
      } else {
        newObj[key] = replaceEmptyProperty(val, content, recursive)
      }
    }
  }
  return Object.assign({}, obj, newObj)
}

/**
 * 替换对象空属性 (数组)
 * @param arr 数组
 * @param content 替换后的内容
 * @param recursive 是否递归替换 (如果遇到数组,性能消耗较大)
 */
export function replaceEmptyPropertyArray(arr?: any[], content: any = '', recursive = false): any[] {
  if (!arr) return []
  return arr.map(v => {
    if (Array.isArray(v)) {
      return replaceEmptyPropertyArray(v, content, recursive)
    } else {
      return replaceEmptyProperty(v, content, recursive)
    }
  })
}

/**
 * 判断对象是否为空
 * @param obj
 */
export function isEmptyObject(obj: object) {
  for (const key in obj) {
    return false
  }
  return true
}

/**
 * 删除指定值的属性
 * @param obj
 */
export function deleteProperty(obj: object, v: any = [undefined, null, '']) {
  const res = {}
  const isArray = Array.isArray(v)
  for (const key in obj) {
    if (isArray) {
      if (!v.includes(obj[key])) res[key] = obj[key]
    } else {
      if (obj[key] !== v) res[key] = obj[key]
    }
  }
  return res
}
