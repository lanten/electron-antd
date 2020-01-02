import { message as Message, Modal } from 'antd'

export function errorAction(err: any, sendData: any, options: RequestOptions) {
  const { code, message } = err
  const { errorType } = options

  const { origin, pathname, search, hash } = window.location

  switch (code) {
    // 跳转到未登录页
    case 30000:
      const regexp = /(^|\?|&|)redirect_url=([^&]*)/gi
      let redirectURL = (origin + pathname + search).replace(regexp, '') + hash
      redirectURL = window.encodeURIComponent(redirectURL)
      redirectURL = `${process.env.SSO_LOGIN_URL}?redirect_url=${redirectURL}`
      window.location.replace(redirectURL)
      break

    // 无权限跳转
    case 30002:
      window.location.replace(`${origin}${pathname}#/403`)
      break

    default:
      if (errorType === 'toast') {
        Message.error(message)
      } else if (errorType === 'modal') {
        Modal.error({ title: '提示', content: message })
      }
      break
  }
}

/**
 * errorCode 处理
 * @param res
 * @param sendData
 */
export function handleResponse(res: RequestRes): RequestRes {
  return res
}
