import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Router from './shared/router';
import './styles/index.less'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="app">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    )
  }

} // class App end