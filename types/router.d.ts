import { RouteProps, Location, NavigateFunction } from 'react-router-dom'
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import * as pageResource from '@/src/page-resource'

declare global {
  /** 路由的 key, 与组件 class 名称对应 */
  type RouteName = keyof typeof pageResource

  /** 页面默认 props */
  interface PageProps<P = Record<string, unknown>, Q = Record<string, unknown>, LocationState = unknown>
    extends RouteContextType<Q, P, LocationState>,
      RouteConfig {
    /** 关闭当前窗口 */
    closeWindow: () => void
    /** 当前窗口 BrowserWindow 实例 */
    currentWindow: BrowserWindow
    /** 当前路由 key */
    name: RouteName
  }

  interface RouteLocation<S = unknown> extends Location {
    state: S
  }

  interface RouteContextType<Q = Record<string, unknown>, P = Record<string, unknown>, S = unknown> {
    /** 由 location.search 转换来的对象 */
    query: Q
    /** react-router location 对象 */
    location: RouteLocation<S>
    /** react-router 路由跳转方法 */
    navigate: NavigateFunction
    /** 路由参数 */
    params: P
  }

  /** 新窗口启动参数 */
  interface CreateConfig {
    /** 显示标题栏 默认 true */
    showTitlebar?: boolean
    /** 显示侧边栏 默认 false */
    showSidebar?: boolean
    /** 以新窗口打开时是否启动 DevTools */
    openDevTools?: boolean
    /** 记住窗口关闭时的位置和尺寸, 窗口打开时自动加载 */
    saveWindowBounds?: boolean
    /** 延迟执行 win.show() 单位：ms 默认：0 (适当的延迟避免 DOM 渲染完成前白屏或闪烁) */
    delayToShow?: number
    /** 创建完成后自动显示 默认：true */
    autoShow?: boolean
    /** 禁止重复创建窗口 默认：true */
    single?: boolean
    /** 隐藏菜单栏 默认：false */
    hideMenus?: boolean
    /** 窗口创建完成回调 */
    created?: (win: BrowserWindow) => void
  }

  /** 路由配置规范 */
  interface RouteConfig extends Omit<RouteProps, 'children' | 'element'>, CreateConfig {
    element?: Promise<any>
    /** 是否静态 */
    isStatic?: boolean
    /** 页面资源 name, 对应 page-resource 中的变量名 */
    name: RouteName
    /** 重定向 */
    redirectTo?: string
    /** 自定义参数, 视情况而定 */
    type?: string
    /** 以 createWindow 打开时, 加载的 BrowserWindow 选项 */
    windowOptions?: BrowserWindowConstructorOptions
    /** 新窗口启动参数 */
    createConfig?: CreateConfig
  }

  type RouterHook = (props: PageProps, next: () => void) => boolean | void | Promise<boolean | void>
}
