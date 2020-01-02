import React from 'react'
import { Breadcrumb } from 'antd'
import { RouteComponentProps, Link } from 'react-router-dom'

import { BREADCRUMB_MAP } from '@src/auto-routes'

import './breadcrumb.less'

interface Props {
  match: RouteComponentProps['match']
  title?: string
}

const baseTitle: string = document.title

export class AppBreadcrumb extends React.Component<Props> {
  shouldComponentUpdate() {
    // 此组件无视状态刷新
    return false
  }

  componentDidMount() {
    const { match, title } = this.props

    if (title) {
      document.title = `${title} - ${baseTitle}`
    } else {
      const routeInfo = BREADCRUMB_MAP[match.path]
      if (routeInfo && routeInfo.title) {
        document.title = `${routeInfo.title} - ${baseTitle}`
      }
    }
  }

  renderBreadcrumbItem() {
    const { path } = this.props.match
    const pathSnippets = path.split(/\/(?=[^:])/).filter(x => x)

    return pathSnippets.map((name, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      const route = BREADCRUMB_MAP[url]
      if (!route || !route.title || route.title === '/') return null
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{route.title}</Link>
        </Breadcrumb.Item>
      )
    })
  }

  render() {
    return (
      <div className="rc-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">首页</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/">{process.env.PROJECT_TITLE}</Link>
          </Breadcrumb.Item>
          {this.renderBreadcrumbItem()}
        </Breadcrumb>
      </div>
    )
  }
} // class Breadcrumb end

/**
 * 面包屑导航
 * @param Component
 */
export function withBreadcrumb(Component: React.ComponentClass<any>): any {
  return class extends React.Component<PageProps> {
    render() {
      return (
        <>
          <AppBreadcrumb match={this.props.match} title={this.props.title || ''} />
          <Component {...this.props} />
        </>
      )
    }
  }
}
