import React from 'react'
import { remote } from 'electron'

import './app-titlebar.less'

interface State {
  /** 当前路由 props */
  routeProps: Partial<PageProps>
  /** 是否最大化 */
  maximized: boolean
}

export class AppTitlebar extends React.Component<unknown, State> {
  currentWindow = remote.getCurrentWindow()

  state: State = {
    routeProps: {},
    maximized: this.currentWindow.isMaximized(),
  }

  componentDidMount(): void {
    window.addEventListener('router_update', (e: any) => {
      const routeProps: PageProps = e.detail
      this.setState({ routeProps })
    })

    this.currentWindow.on('maximize', () => {
      console.warn('maximize!')
      this.setState({ maximized: true })
    })

    this.currentWindow.on('unmaximize', () => {
      console.warn('unmaximize!')
      this.setState({ maximized: false })
    })
  }

  renderWindowController(): JSX.Element | void {
    const { routeProps, maximized } = this.state

    // 最大化按钮
    const maxSizeBtn = this.currentWindow.isMaximizable() ? (
      maximized ? (
        <div className="titlebar-btn" onClick={() => this.currentWindow.unmaximize()}>
          <i className="ri-checkbox-multiple-blank-line fs-14"></i>
        </div>
      ) : (
        <div className="titlebar-btn" onClick={() => this.currentWindow.maximize()}>
          <i className="ri-checkbox-blank-line fs-14"></i>
        </div>
      )
    ) : (
      void 0
    )

    return (
      <div className="titlebar-controller flex">
        {/* 最小化按钮 */}
        {this.currentWindow.isMinimizable() && (
          <div className="titlebar-btn" onClick={() => this.currentWindow.minimize()}>
            <i className="ri-subtract-line fs-16"></i>
          </div>
        )}

        {/* 最大化按钮 */}
        {maxSizeBtn}

        {/* 关闭按钮 */}
        {this.currentWindow.isClosable() && (
          <div className="titlebar-btn titlebar-btn-close" onClick={routeProps.closeWindow}>
            <i className="ri-close-line fs-18"></i>
          </div>
        )}
      </div>
    )
  }

  render(): JSX.Element {
    const { routeProps } = this.state
    return (
      <header className="app-titlebar flex center-v">
        <div className="flex-1 title-content drag flex center-v">
          <img src={$tools.APP_ICON} height="18" className="mr-4" />
          <span>{routeProps.currentWindow?.title}</span>
          <span className="text-orange ml-16">{routeProps.location?.pathname}</span>
        </div>

        {process.platform !== 'darwin' && this.renderWindowController()}
      </header>
    )
  }
} // class AppTitlebar end
