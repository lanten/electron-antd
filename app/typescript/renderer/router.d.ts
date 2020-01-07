import { RouteProps } from 'react-router-dom'
import { BrowserWindowConstructorOptions } from 'electron'
import pageResource from '@/src/page-resource'

/**
 * 路由配置接口
 */
declare global {
  /**
   * 自定义路由参数
   */
  interface RouteParams {
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

    /** 以 createWindow 打开时, 加载的 BrowserWindow 选项 */
    window?: BrowserWindowConstructorOptions
  }

  /**
   * 路由配置规范
   */
  interface RouteConfig extends RouteProps, RouteParams {
    /** 路由的名称 */
    name: string
    /** 页面资源 key */
    resource?: keyof typeof pageResource
    /** 重定向 */
    redirect?: string
    /** 默认为 true */
    exact?: boolean
  }
}
