import * as React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { asyncImport } from '../async-import'
import { beforeRouter } from './router-hooks'
import pageResource from '@/src/page-resource'

interface AppRouterProps {
  routes: Map<string, RouteConfig>
  store: AppStore
}

interface AppRouterState {
  readyToClose: boolean
}

export class AppRouter extends React.Component<AppRouterProps, AppRouterState> {
  static defaultProps = {
    routes: [],
  }

  noMatch?: JSX.Element
  routeElements: JSX.Element[]

  readonly state: AppRouterState = {
    readyToClose: false,
  }

  constructor(props: AppRouterProps) {
    super(props)
    this.routeElements = this.createRoutes()

    // 保证组件正常卸载,防止 Redux 内存泄露
    window.onbeforeunload = () => {
      this.setState({ readyToClose: true })
    }
  }

  render() {
    const { store } = this.props
    const { readyToClose } = this.state
    if (readyToClose) return null
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {this.routeElements}
            {this.noMatch ?? null}
          </Switch>
        </Router>
      </Provider>
    )
  }

  createRoutes() {
    const { routes } = this.props
    const res: JSX.Element[] = []

    routes.forEach((conf, key) => {
      const routeEl = this.creatRoute(conf, key)
      if (conf.path) {
        res.push(routeEl)
      } else {
        this.noMatch = routeEl
      }
    })

    return res
  }

  creatRoute = (routeConfig: RouteConfig, key: string) => {
    const { name, path, exact = true, resource, redirect, ...params } = routeConfig

    const routeProps: any = {
      key: name ?? key,
      path,
      exact,
    }

    if (redirect) {
      routeProps.render = (props: any) => <Redirect to={{ pathname: redirect }} {...props} {...params} />
    } else if (resource) {
      const Comp = asyncImport(pageResource[resource], beforeRouter.bind(this))
      routeProps.render = (props: any) => <Comp {...props} {...params} />
    } else {
      throw new Error('Route config error: resource or redirect must be set one.')
    }

    return <Route {...routeProps} />
  }
}
