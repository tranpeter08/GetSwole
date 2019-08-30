import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {config} from './config';

export default function Routes(props) {
  const routes = config.map(({path,component}) => (
    <Route key={path} path={path} component={component}/>
  ));

  return <Switch>{routes}</ Switch>;
}