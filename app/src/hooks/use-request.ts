import { useState, useEffect } from 'react'

type ApiListType = Omit<typeof $api, 'request'>
type ApiPromiseRes<ApiName extends keyof ApiListType> = Awaited<ReturnType<ApiListType[ApiName]>>

// type FixRequestRes<ResData extends Partial<RequestRes>> = ResData['data'] extends undefined
//   ? RequestRes<ResData>
//   : ResData

interface RequestErrorType<SendData = Record<string, unknown>, ResData = Partial<RequestRes>> {
  path: string
  sendData: SendData
  resData: ResData & RequestRes
}

export interface UseRequestReturnType<ApiName extends keyof ApiListType> {
  /** 请求状态 */
  loading: boolean
  /** 错误信息 */
  error: RequestErrorType<Parameters<ApiListType[ApiName]>[0], ApiPromiseRes<ApiName>>
  /** 返回数据 */
  data: ApiPromiseRes<ApiName>
  /** 重新发起请求 */
  reRequest: (...requestPrams: Parameters<ApiListType[ApiName]>) => Promise<ApiPromiseRes<ApiName>>
}

/**
 * Request Hook
 * $api 的 Hooks 封装
 *
 * @param apiName [$api.handlers](../../core/api/handlers/index.ts) 中的API名称
 * @param requestNow 是否立即发起请求
 * @param ...params 对应 API 函数要求传入的参数
 */
export function useRequest<ApiName extends keyof ApiListType>(
  apiName: ApiName,
  requestNow: boolean,
  ...params: Parameters<ApiListType[ApiName]>
): UseRequestReturnType<ApiName> {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState() as [
    ApiPromiseRes<ApiName>,
    React.Dispatch<React.SetStateAction<ApiPromiseRes<ApiName>>>
  ]
  const [error, setError] = useState<any>()

  function requestFn(...requestParams: Parameters<ApiListType[ApiName]>): Promise<ApiPromiseRes<ApiName>> {
    setLoading(true)
    console.log(requestParams[0])
    return $api[apiName](...requestParams)
      .then((res: any) => {
        setData(res)
        return res
      })
      .catch((err) => {
        setError(err)
        return err
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (requestNow) requestFn(...params)
  }, [])

  return {
    reRequest: requestFn,
    loading,
    error,
    data,
  }
}
