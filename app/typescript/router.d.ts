import { RouteProps } from 'react-router-dom'

/**
 * 路由配置接口
 */
declare global {
  /**
   * 自定义路由参数
   */
  interface RouteParams {
    /** 页面标题 */
    title: string
    /** 是否显示侧边菜单 */
    sideMenu?: boolean
    /** menuKey 将与侧边菜单的 key 对应,全局唯一 */
    menuKey?: string
    /** 错误码 */
    code?: number
    /** 需要验证权限代码 */
    permissionsCode?: string

    /** 自定义参数, 视情况而定 */
    type?: string
  }

  /**
   * 路由配置规范
   */
  interface RouteConfig extends RouteProps, RouteParams {
    /**  给定路由的 name */
    pathName?: string
    /** 路由的 key 默认为 index */
    key?: number | string
    /** 异步导入组件 */
    asyncImport: ImportComponent
    /** 重定向 */
    redirectTo?: string
    /** 默认为 true */
    exact?: boolean
  }

  /**
   * 异步导入组件
   */
  interface ImportComponent {
    (): Promise<any>
  }

  /**
   * 路由钩子
   * 返回一个 boolean 控制组件是否渲染
   */
  interface RouterHook {
    /**
     * 如果是同步函数, return true 渲染页面
     * 如果是异步函数, 执行 next() 渲染页面
     * @param props
     * @param next
     */
    (props: PageProps, next: Function): boolean | Promise<void> | void
  }
}
