import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home'
import Search from '../pages/search'
import Finance from '../pages/finance'
import Bids from '../pages/bids'

const Router = () => (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/bids" component={Bids} />
      <Route exact path="/finance" component={Finance} />
    </Switch>
);

export default Router;
