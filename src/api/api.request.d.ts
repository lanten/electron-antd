/**
 * 网络请求参数
 */
declare interface RequestParams {
  [key: string]: any
}

/**
 * 网络请求返回值
 */
declare interface RequestRes {
  /** 状态码,成功返回 200 */
  code: number
  /** 错误消息 */
  message: string
  /** 请求是否成功 */
  status: boolean
  /** 返回数据 */
  data: any
}

/**
 * 请求选项
 */
declare interface RequestOptions {
  /** 请求类型: [POST | GET] 默认: POST */
  method?: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH'
  /** 基本 url, 没有特殊需求无需传递 */
  baseUrl?: string
  /** 使用 formData 传递参数 */
  formData?: boolean
  /** 接口分组 */
  group?: string
  /** 超时时间,单位: ms */
  timeout?: number
  /** 请求过程中是否显示 Loading */
  loading?: boolean
  /** 发生错误时提示框类型: [toast | modal] 默认: toast */
  errorType?: 'toast' | 'modal' | false
  /** 自定义请求头 */
  headers?: any
  /** 类型动态设置 */
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | undefined
  /** 是否校验请求状态 */
  checkStatus?: boolean
}
