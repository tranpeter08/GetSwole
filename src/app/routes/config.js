import {Route, withRouter, Switch} from 'react-router-dom';
import Navigation from './navigation/containers/Navigation';
import Landing from './landing/components/Landing';
import Login from './user/containers/Login';
import Register from './user/containers/Register';
import UserPage from './user/containers/UserPage';
import RefreshModal from './RefreshModal';
import NotAuthorized from './auth/container/NotAuthorized';
import NotFound from './misc/components/NotFound';
import {} from './config';

const landingLoc = {
  pathname: '/',
  state: {loggedIn}
};

const locations = {
  landingLoc
};

const config = [
  {path: 'login', component: Login},
  {path: '/register', component: Register},
  {path: '/user/:username', component: UserPage},
  {path: '/unauthorized', component: NotAuthorized},
  {location: locations.landingLoc, component: Landing},
  {path: '', component: NotFound}
];

export default config;