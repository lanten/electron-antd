import * as React from 'react'

interface RouterHook {
  (props: PageProps, next: Function): boolean | void | Promise<boolean | void>
}

interface State {
  comp: React.ComponentClass | null
}

export function asyncImport(importComponent: Promise<any>, hook?: RouterHook) {
  class AsyncComponent extends React.Component<PageProps, State> {
    constructor(props: PageProps) {
      super(props)
      this.state = { comp: null }
    }

    componentDidMount(): void {
      importComponent.then(({ default: comp }: any) => {
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
