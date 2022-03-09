import { Notification, BrowserWindow } from 'electron'

/**
 * 网络请求发生错误时的处理
 * 注意这个函数运行在主进程中, 请不要使用 Document API
 *
 * @param err
 * @param sendData
 * @param options
 */
export async function errorActionHandler<T extends RequestRes>(
  err: T,
  sendData: RequestOptions,
  options: RequestOptions
): Promise<void> {
  const { code, message, isAxiosError } = err
  const { errorType } = options

  $tools.log.error(`[request:${code}] [${errorType}]`, { sendData, response: isAxiosError ? message : err })

  switch (code) {
    // 跳转到未登录页
    case 30000:
      // TODO do something or delete ...
      break

    // 无权限跳转
    case 30002:
      // TODO do something or delete ...
      break

    default:
      const title = `Request Error: [${code}]`
      if (errorType === 'notification') {
        const n = new Notification({
          icon: $tools.APP_ICON,
          title,
          body: message,
        })
        n.show()
      } else {
        await $tools.createWindow('AlertModal', {
          windowOptions: {
            modal: true,
            parent: BrowserWindow.getFocusedWindow() || undefined,
            title,
          },
          createConfig: {
            delayToShow: 100, // DESC 避免无边框窗口闪烁
          },
          query: {
            type: 'error',
            title,
            message,
          },
        })
      }
      break
  }
}
