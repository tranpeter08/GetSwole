import Landing from '../landing/components/Landing';
import Login from '../user/containers/Login';
import Register from '../user/containers/Register';
import UserPage from '../user/containers/UserPage';
import NotAuthorized from '../auth/container/NotAuthorized';

export const config = [
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/user/:username', component: UserPage},
  {path: '/unauthorized', component: NotAuthorized},
  {path: '/', component: Landing}
];