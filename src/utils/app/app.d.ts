declare namespace $app {
  /**
   * 中划线转驼峰
   * @param {String} str
   * @param {Boolean} c 首字母是否大写
   */
  function toCamel(str: string, c?: boolean): string

  /**
   * 获取 url 参数
   */
  function getQuery(): AnyObj

  /**
   * 将对象转换为 url search
   */
  namespace getQuery {
    function toSearch(obj: AnyObj): string
  }

  /**
   * 格式化金额 千分符
   * @param value
   * @param fixed
   */
  function transformThousandth(value: number | string, fixed?: number): string

  /**
   * 监听事件
   * @param eventName
   * @param callback
   */
  function eventListen(eventName: EventTypes, callback?: EventListenCallback): Promise<CustomEvent>

  /**
   * 触发事件
   * @param eventName
   * @param detail
   */
  function eventDispatch(eventName: EventTypes, detail?: AnyObj): boolean

  /**
   * 替换空属性
   * @param obj 对象
   * @param content 替换后的内容
   * @param recursive 是否递归替换 (如果遇到数组,性能消耗较大)
   */
  function replaceEmptyProperty(obj?: AnyObj, content?: AnyObj, recursive?: boolean): AnyObj

  /**
   * 替换对象空属性 (数组)
   * @param arr 数组
   * @param content 替换后的内容
   * @param recursive 是否递归替换 (如果遇到数组,性能消耗较大)
   */
  function replaceEmptyPropertyArray(
    arr?: AnyObj[],
    content?: AnyObj | string | JSX.Element,
    recursive?: boolean
  ): AnyObj[]

  /**
   * 判断对象是否为空
   * @param obj
   */
  function isEmptyObject(obj: object): boolean

  /**
   * 删除指定值的属性
   * @param obj
   */
  function deleteProperty<T>(obj: T, v?: unknown): T
}

// 所有自定义事件类型
type EventTypes = 'navbar_init' | 'router_update'

interface EventListenCallback {
  (e: CustomEvent): void
}
