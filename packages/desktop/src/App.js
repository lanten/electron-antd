import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Router from './shared/router';
import './styles/index.less'

const App = () => {
  return (
    <div id="app">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  )
}

export default App;
