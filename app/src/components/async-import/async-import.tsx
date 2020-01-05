import * as React from 'react'

interface State {
  comp: React.ComponentClass | null
}

export default function asyncComponent(importComponent: ImportComponent, hook?: RouterHook) {
  class AsyncComponent extends React.Component<PageProps, State> {
    constructor(props: PageProps) {
      super(props)
      this.state = { comp: null }
    }

    componentDidMount(): void {
      importComponent().then(({ default: comp }: any) => {
        const next = () => this.setState({ comp })
        if (hook) {
          const hookRes = hook(this.props, next)
          if (typeof hookRes === 'boolean' && hookRes) {
            next()
          }
        } else {
          this.setState({ comp })
        }
      })
    }

    render() {
      const { comp: Comp }: any = this.state
      return Comp ? <Comp {...this.props} /> : null
    }
  }

  return AsyncComponent
}
