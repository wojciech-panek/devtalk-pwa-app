import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './app.container';
import { Home } from './home';
import { NotFound } from './notFound';


export const ROUTES = {
  home: '/',
  notFound: '/404',
};

export default class RootContainer extends Component {
  render() {
    return (
      <App>
        <Switch>
          <Route exact path={`${ROUTES.home}`} component={Home} />

          <Route component={NotFound} />
        </Switch>
      </App>
    );
  }
}
