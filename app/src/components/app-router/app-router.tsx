import React from 'react'
import { getCurrentWindow } from '@electron/remote'
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  RouteProps,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import * as pageResource from '@/src/page-resource'
import { RouteContext } from '@/src/context'
import { AsyncImport } from '../async-import'
import { beforeRouter } from './router-hooks'

interface AppRouterProps {
  routes: Map<string, RouteConfig>
  store: AppStore
}

interface AppRouterState {
  readyToClose: boolean
}

const currentWindow = getCurrentWindow()

export class AppRouter extends React.Component<AppRouterProps, AppRouterState> {
  static defaultProps = {
    routes: [],
  }

  /** 路由容器 ref */
  public readonly contentRef = React.createRef<HTMLDivElement>()

  readonly state: AppRouterState = {
    readyToClose: false,
  }

  constructor(props: AppRouterProps) {
    super(props)

    // 保证组件正常卸载,防止 Redux 内存泄露
    window.onbeforeunload = () => {
      this.setState({ readyToClose: true })
    }
  }

  render(): JSX.Element | null {
    const { store, routes } = this.props
    const { readyToClose } = this.state

    const routesElement = this.createRoutes(routes)

    if (readyToClose) return null
    return (
      <Provider store={store}>
        <Router>
          <Routes>{routesElement}</Routes>
        </Router>
      </Provider>
    )
  }

  createRoutes(routes: Map<string, RouteConfig> | RouteConfig[]): JSX.Element[] {
    const res: JSX.Element[] = []
    let noMatch: JSX.Element | undefined = undefined

    routes.forEach((conf) => {
      const routeEl = this.creatRouteItem(conf)
      if (!routeEl) return

      if (conf.path === '*') {
        noMatch = routeEl
      } else if (routeEl) {
        res.push(routeEl)
      }
    })

    if (noMatch) res.push(noMatch)

    return res
  }

  creatRouteItem = (routeConfig: RouteConfig) => {
    const { path, redirectTo, name, ...params } = routeConfig
    const element = pageResource[name] as unknown as Promise<any> | undefined
    const routeProps: RouteProps = { path }
    const nextProps = {
      name,
      contentRef: this.contentRef,
      currentWindow,
      closeWindow: this.closeWindow,
      ...params,
    }

    if (redirectTo) {
      routeProps.element = <Navigate to={redirectTo} {...nextProps} />
    } else if (element instanceof Promise) {
      routeProps.element = (
        <RouteCtx>
          {(routeHooksParams) => {
            return <AsyncImport {...routeHooksParams} element={element} hook={beforeRouter} {...nextProps} />
          }}
        </RouteCtx>
      )
    } else {
      throw new Error(`Route config error! \n ${JSON.stringify(routeConfig, undefined, 2)}`)
    }

    return <Route key={name} {...routeProps} />
  }

  closeWindow = (): void => {
    this.setState({ readyToClose: true }, () => {
      currentWindow.close()
    })
  }
}

interface RouterContextProps {
  children: (props: RouteContextType) => React.ReactNode
}

function RouteCtx({ children }: RouterContextProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const query = Object.assign($tools.getQuery(window.location.search), $tools.getQuery(location.search))

  const ctxValue: RouteContextType = { location, navigate, query, params }

  return <RouteContext.Provider value={ctxValue}>{children(ctxValue)}</RouteContext.Provider>
}
