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
    showCustomTitlebar?: boolean
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

  interface RouteMenuConfig {
    /** 菜单文字说明 */
    tooltip?: string
    /** 菜单图标 https://remixicon.com/ */
    icon?: string
    /** 排序控制 */
    index?: number
  }

  /** 路由配置规范 */
  interface RouteConfig extends Omit<RouteProps, 'children' | 'element'>, CreateConfig {
    /** 页面资源 name, 对应 page-resource 中的变量名 */
    name: RouteName
    /** 是否静态 */
    isStatic?: boolean
    /** 重定向 */
    redirectTo?: string
    /** 自定义参数, 视情况而定 */
    type?: string

    /** 以 createWindow 打开时, 加载的 BrowserWindow 选项 */
    windowOptions?: BrowserWindowConstructorOptions
    /** 新窗口启动参数 */
    createConfig?: CreateConfig

    /**
     * 侧边菜单相关配置
     * 设为 false 不显示
     * 默认：void
     */
    sideMenu?: RouteMenuConfig | boolean
    /**
     * 子路由
     * 子路由 path 与父级不存在嵌套关系
     */
    routes?: RouteConfig[]
    /**
     * 父级路由
     * 用于控制菜单层级
     * auto-routes 会根据 RouteConfig 层级自动注入，无需手动声明
     */
    parent?: RouteConfig
    /**
     * 嵌套层级路径，路由 name 的数组
     * 用明确路由嵌套层级
     * auto-routes 会根据 RouteConfig 层级自动注入，无需手动声明
     */
    parentNamePath?: string[]
  }

  type RouterHook = (props: PageProps, next: () => void) => boolean | void | Promise<boolean | void>
}
