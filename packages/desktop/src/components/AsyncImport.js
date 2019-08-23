import React from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = { comp: null }
    }

    componentDidMount() {
      importComponent().then(({ default: comp }) => {
        this.setState({ comp })
      })
    }

    render() {
      const { comp: Comp } = this.state
      return Comp ? <Comp {...this.props} /> : null
    }
  }

  return AsyncComponent
}