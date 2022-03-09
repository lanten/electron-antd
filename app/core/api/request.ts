import axios, { AxiosRequestConfig } from 'axios'
import { errorActionHandler } from './handle-response'

// axios 跨域请求携带 cookie
axios.defaults.withCredentials = true

const DEFAULT_CONFIG: RequestOptions = {
  method: 'GET',
  baseURL: process.env.API_BASE,
  timeout: 30000, // 30 秒超时
  errorType: 'notification',
  checkStatus: true,
  errorAction: true,
  formData: false,
  headers: {
    'Content-Type': 'application/json',
  },
}

// 默认传递的参数
const DEFAULT_PARAMS = {}

/**
 * 发起一个请求
 * @param apiPath
 * @param params
 * @param optionsSource
 */
export async function request<T extends RequestRes>(
  path: string,
  params?: RequestParams,
  optionsSource?: RequestOptions
): Promise<T> {
  const options: RequestOptions = Object.assign({}, DEFAULT_CONFIG, optionsSource)
  const { method, headers = {}, checkStatus, errorAction, formData, ...axiosOptions } = options
  const sendData: AxiosRequestConfig = {
    url: path,
    headers,
    method,
    ...axiosOptions,
  }

  const paramsData = Object.assign({}, DEFAULT_PARAMS, params)

  if (method === 'GET') {
    const paramsStr = $tools.toSearch(paramsData)
    sendData.url = sendData.url + paramsStr
  } else if (formData) {
    const formData = new FormData()
    Object.keys(paramsData).forEach((key) => {
      formData.append(key, paramsData[key])
    })
    sendData.data = formData
  } else {
    sendData.data = paramsData
  }

  return axios(sendData)
    .then((res) => {
      const data: T = res.data

      // TODO 根据后端接口设定成功条件, 例如此处 `data.code == 200`
      if (!checkStatus || data.code == 200) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
    .catch((err) => {
      let errH = err
      if (err.isAxiosError && err.toJson) {
        errH = err.toJson()
      }

      if (typeof err !== 'object') {
        errH = {
          message: err,
        }
      }

      if (errorAction) {
        errorActionHandler<T>(errH, sendData, options)
        return Promise.reject({ ...errH, path, sendData, resData: err })
      } else {
        return Promise.resolve(errH)
      }
    })
}

declare global {
  /**
   * 网络请求参数
   */
  type RequestParams = Record<string, any>

  /**
   * 网络请求返回值
   * TODO: 各种返回值格式层出不穷, 请根据实际内容重新定义类型
   */
  interface RequestRes<T = Record<string, any>> {
    /** 是否 axios 错误 */
    isAxiosError?: boolean
    /** 状态码,成功返回 200 */
    code: number
    /** 错误消息 */
    message: string
    /** 返回数据 */
    data: T
  }

  /** 请求选项 */
  interface RequestOptions extends AxiosRequestConfig {
    /** 使用 formData 传递参数 */
    formData?: boolean
    /** 返回错误时是否执行 errorAction 默认: true */
    errorAction?: boolean
    /** 请求过程中是否显示 Loading */
    showLoading?: boolean
    /** 发生错误时提示框类型, 默认: notification */
    errorType?: 'notification' | 'modal' | false
    /** 是否校验请求状态 */
    checkStatus?: boolean
  }
}
