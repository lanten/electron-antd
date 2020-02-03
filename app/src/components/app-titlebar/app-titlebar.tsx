import React from 'react'

import './app-titlebar.less'

interface State {
  path: string
}

export class AppTitlebar extends React.Component<{}, State> {
  state: State = {
    path: '',
  }

  componentDidMount() {
    window.addEventListener('router_update', (e: any) => {
      const routeProps: PageProps = e.detail
      this.setState({ path: routeProps.location.pathname })
    })
  }

  render() {
    const { path } = this.state
    return (
      <header className="pl-16 pr-16 app-titlebar">
        <p>{path}</p>
      </header>
    )
  }
} // class AppTitlebar end
