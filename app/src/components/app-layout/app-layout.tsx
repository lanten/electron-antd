import React from 'react'
import clsx from 'clsx'

import { AppTitlebar, AppSidebar } from '../'

import './app-layout.less'

interface AppLayoutProps {
  createConfig: CreateConfig
  children: JSX.Element
}

export class AppLayout extends React.Component<AppLayoutProps> {
  render(): JSX.Element {
    const { createConfig } = this.props
    return (
      <div
        className={clsx(
          'flex app-layout',
          { 'has-titlebar': createConfig.showCustomTitlebar, 'has-sidebar': createConfig.showSidebar },
          process.platform
        )}
      >
        {createConfig.showSidebar ? <AppSidebar /> : null}
        <div className="flex-1 app-content-wrap">
          {createConfig.showCustomTitlebar ? <AppTitlebar /> : null}
          <div className="app-content">{this.props.children}</div>
        </div>
      </div>
    )
  }
} // class AppLayout end
