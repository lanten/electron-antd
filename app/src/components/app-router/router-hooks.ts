/**
 * 路由钩子,页面切切换时触发,返回一个 boolean 用于控制是否渲染组件
 * @param props
 * @param next 继续渲染
 * @this AppRouter
 */
export function beforeRouter(props: PageProps, next: Function): boolean | void | Promise<boolean | void> {
  console.log('routerHook', props)
  next()
}
