import React from 'react'

import './app-titlebar.less'

interface State {
  routeProps: Partial<PageProps>
}

export class AppTitlebar extends React.Component<unknown, State> {
  state: State = {
    routeProps: {},
  }

  componentDidMount(): void {
    window.addEventListener('router_update', (e: any) => {
      const routeProps: PageProps = e.detail
      this.setState({ routeProps })
    })
  }

  render(): JSX.Element {
    const { routeProps } = this.state
    return (
      <header className="app-titlebar">
        <img src={$tools.APP_ICON} height="18" className="mr-4" />
        <span>{routeProps.currentWindow?.title}</span>
        <span className="text-orange ml-16">{routeProps.location?.pathname}</span>
      </header>
    )
  }
} // class AppTitlebar end
