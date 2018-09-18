import React from 'react'
import Router from './Router'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        App is ok
        <hr/>
        <Router />
      </div>
    )
  }

} // class App end