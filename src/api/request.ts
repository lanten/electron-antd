import axios, { AxiosRequestConfig } from 'axios'
import { handleResponse, errorAction } from './handle-response'

// axios 跨域请求携带 cookie
axios.defaults.withCredentials = true

// api 绝对地址
const { API_BASE_PATH } = process.env

const DEFAULT_CONFIG = {
  method: 'POST',
  baseUrl: API_BASE_PATH,
  timeout: 30000,
  loading: false,
  errorType: 'toast',
  checkStatus: true,
  headers: {
    'Content-Type': 'application/json',
    // 'shebao-boss-token': '',
  },
}

// 默认传递的参数
const DEFAULT_PARAMS = {}

/**
 * 发起一个请求
 * @param service
 * @param params
 * @param optionsSource
 */
export default function request(path: string, params?: RequestParams, optionsSource?: RequestOptions) {
  const options: RequestOptions = Object.assign({}, DEFAULT_CONFIG, optionsSource)
  const { method, baseUrl, headers, responseType, checkStatus, formData } = options
  const sendData: AxiosRequestConfig = {
    url: `${baseUrl}${path}`,
    method,
    headers,
    responseType,
  }

  const paramsData = Object.assign({}, DEFAULT_PARAMS, params)

  if (method === 'GET') {
    const paramsStr = $app.getQuery.toSearch(paramsData)
    sendData.url = sendData.url + paramsStr
  } else if (formData) {
    const formData = new FormData()
    Object.keys(paramsData).forEach(key => {
      formData.append(key, paramsData[key])
    })
    sendData.data = formData
  } else {
    sendData.data = paramsData
  }

  return axios(sendData)
    .then(res => {
      const resH = handleResponse(res.data)

      if (!checkStatus || resH.status) {
        return resH
      } else {
        return Promise.reject(resH)
      }
    })
    .catch((err: any) => {
      console.error({ sendData, err })
      errorAction(err, sendData, options)
      return Promise.reject({ ...err, path, sendData, resData: err })
    })
}
