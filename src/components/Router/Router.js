import React from "react"
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

export default class AppRouter extends React.Component {
  static defaultProps = {
    routes: []
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { routes } = this.props
    return (
      <Router>
        <Switch>
          {routes.map(this.creatRoute)}
        </Switch>
      </Router>
    )
  }

  creatRoute = (routeConfig, i) => {
    const { key = i, path, exact, component: Comp, params } = routeConfig
    return (
      <Route
        key={key}
        exact={exact}
        path={path}
        render={props => <Comp {...props} params={params} />}
      />
    )
  }

}