import * as React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import AsyncImport from '../async-import'
import { beforeRouter } from './router-hooks'
import pageResource from '@/src/page-resource'

interface AppRouterProps {
  routes: Map<string, RouteConfig>
  store: AppStore
}

export default class AppRouter extends React.Component<AppRouterProps, {}> {
  static defaultProps = {
    routes: [],
  }

  noMatch?: JSX.Element
  routeElements: JSX.Element[]

  constructor(props: AppRouterProps) {
    super(props)
    this.routeElements = this.createRoutes()

    console.log(this.routeElements)
  }

  render() {
    const { store } = this.props

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

    console.log(routes)

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
      const Comp = AsyncImport(pageResource[resource], beforeRouter.bind(this))
      routeProps.render = (props: any) => <Comp {...props} {...params} />
    } else {
      throw new Error('Route config error: resource or redirect must be set one.')
    }

    return <Route {...routeProps} />
  }
}
