import { RouteComponentProps } from 'react-router-dom'

// 全局导出
declare global {
  namespace JSX {
    // 自定义 jsx 标签 (全局组件)
    interface IntrinsicElements {
      // Navbar: any
    }
  }

  /**
   * 页面默认 props
   */
  interface PageProps<Params = {}> extends RouteComponentProps<Params>, RouteParams {}
}
