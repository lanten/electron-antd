import React from 'react'
import { remote } from 'electron'
import { HashRouter as Router, Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { Provider } from 'react-redux'
import { asyncImport } from '../async-import'
import { beforeRouter } from './router-hooks'
import * as pageResource from '@/src/page-resource'

interface AppRouterProps {
  routes: Map<string, RouteConfig>
  store: AppStore
}

interface AppRouterState {
  readyToClose: boolean
}

const currentWindow = remote.getCurrentWindow()

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

  render(): JSX.Element | null {
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

  createRoutes(): JSX.Element[] {
    const { routes } = this.props
    const res: JSX.Element[] = []

    routes.forEach((conf, key) => {
      const routeEl = this.creatRoute(conf, key)
      if (!routeEl) return
      if (conf.path) {
        res.push(routeEl)
      } else {
        this.noMatch = routeEl
      }
    })

    return res
  }

  creatRoute = (routeConfig: RouteConfig, key: string): JSX.Element | void => {
    const { path, exact = true, redirect, ...params } = routeConfig
    const routeProps: any = { key, name: key, path, exact }

    if (redirect) {
      routeProps.render = (props: RouteComponentProps) => <Redirect {...redirect} {...props} />
    } else {
      const resource = pageResource[key]
      if (!resource) return

      const Comp = resource.constructor === Promise ? asyncImport(resource, beforeRouter) : resource

      routeProps.render = (props: RouteComponentProps) => {
        const nextProps = {
          name: key,
          currentWindow,
          closeWindow: this.closeWindow,
          query: $tools.getQuery(props.location.search),
          ...props,
          ...params,
        }
        return <Comp {...nextProps} />
      }
    }

    return <Route {...routeProps} />
  }

  closeWindow = (): void => {
    this.setState({ readyToClose: true }, () => {
      currentWindow.close()
    })
  }
}
