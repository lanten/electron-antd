import { RouteComponentProps } from 'react-router-dom'

// 全局导出
declare global {
  /**
   * 页面默认 props
   */
  interface PageProps<Params = {}> extends RouteComponentProps<Params>, RouteParams {}
}
