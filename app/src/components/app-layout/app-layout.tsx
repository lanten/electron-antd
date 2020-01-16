import React from 'react'
import $c from 'classnames'

import { AppTitlebar, AppSidebar } from '../'

import './app-layout.less'

interface AppLayoutProps {
  children: any
}

export class AppLayout extends React.Component<AppLayoutProps> {
  render() {
    return (
      <div className={$c('flex app-layout', process.platform)}>
        <AppSidebar />
        <div className="flex-1 app-content-wrap">
          <AppTitlebar />
          <div className="app-content">{this.props.children}</div>
        </div>
      </div>
    )
  }
} // class AppLayout end
