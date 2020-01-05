import * as React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import AsyncImport from '../async-import'

interface AppRouterProps {
  routes: RouteConfig[]
  store: AppStore
}

export default class AppRouter extends React.Component<AppRouterProps, {}> {
  static defaultProps = {
    routes: [],
  }

  render() {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <Router>
          <Switch>{routes.map(this.creatRoute)}</Switch>
        </Router>
      </Provider>
    )
  }

  creatRoute = (routeConfig: RouteConfig, i: number) => {
    const { key = i, path, exact = true, asyncImport, redirectTo, ...params } = routeConfig

    const routeProps: any = {
      key,
      path,
      exact,
    }

    if (redirectTo) {
      routeProps.render = (props: any) => <Redirect to={{ pathname: redirectTo }} {...props} {...params} />
    } else {
      const Comp = AsyncImport(asyncImport, this.routerHook.bind(this))
      routeProps.render = (props: any) => <Comp {...props} {...params} />
    }

    return <Route {...routeProps} />
  }

  /**
   * 路由钩子,页面切切换时触发,返回一个 boolean 用于控制是否渲染组件
   * @param props
   */
  async routerHook(props: PageProps, next: Function) {
    console.log('routerHook', props)
    const { permissionsCode, history } = props

    let nextFlg = true

    // 校验用户权限
    if (permissionsCode) {
      console.log(history)
      nextFlg = false
    }

    if (nextFlg) next()
  }
}
