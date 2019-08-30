import React from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import Navigation from './navigation/containers/Navigation';
import Landing from './landing/components/Landing';
import Login from './user/containers/Login';
import Register from './user/containers/Register';
import UserPage from './user/containers/UserPage';
import RefreshModal from './RefreshModal';
import NotAuthorized from './auth/container/NotAuthorized';
import NotFound from './misc/components/NotFound';
import config from './config';

function Routes() {
  const routes = config.map(({path, location,component}) => (
    <Route path={path} location={location} component={component}/>
  ));

  return (
    <Switch>
      {routes}
    </ Switch>
  );
}