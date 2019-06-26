import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import requiresLogin from './RequiresLogin';
import UserInfo from './UserInfo';
import WorkoutList from '../../workouts/containers/WorkoutList';
import ExerciseList from '../../exercises/container/ExerciseList';
import Nutrition from '../../nutrition/components/Nutrition';
import Recipe from '../../recipes/containers/Recipe';
import RecipeSearch from '../../recipes/containers/RecipeSearch';
import MyRecipe from '../../myRecipes/containers/MyRecipe';
import MyRecipes from '../../myRecipes/containers/MyRecipes';
import NotFound from '../../misc/components/NotFound';
import '../style/userPage.css';

export class UserPage extends React.Component {
  render() {
    const {path} = this.props.match;
    // const routes = [
    //   {
    //     path: "/sandwiches",
    //     component: Sandwiches
    //   },
    //   {
    //     path: "/tacos",
    //     component: Tacos,
    //     routes: [
    //       {
    //         path: "/tacos/bus",
    //         component: Bus
    //       },
    //       {
    //         path: "/tacos/cart",
    //         component: Cart
    //       }
    //     ]
    //   }
    // ];


// function RouteConfigExample() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/tacos">Tacos</Link>
//           </li>
//           <li>
//             <Link to="/sandwiches">Sandwiches</Link>
//           </li>
//         </ul>

//         {routes.map((route, i) => (
//           <RouteWithSubRoutes key={i} {...route} />
//         ))}
//       </div>
//     </Router>
//   );
// }
    return (
      <main className='userPage-main'>
        <Switch>
          <Route path={`${path}/recipes/myRecipes/details`} component={MyRecipe}/>
          <Route path={`${path}/recipes/myRecipes`} component={MyRecipes} />
          <Route path={`${path}/recipes/search/details`} component={Recipe} />
          <Route path={`${path}/recipes/search`} component={RecipeSearch} />
          <Route path={`${path}/nutrition`} component={Nutrition} />
          <Route path={`${path}`} component={UserInfo} />
          <Route path='' component={NotFound}/>
        </Switch>
        <Switch>
          <Route 
            path={`${path}/workouts/:workoutName/exercises`}
            component={ExerciseList} />
          <Route path={`${path}/workouts`} component={WorkoutList} />
        </Switch>
      </main>
    )
  }
};

export default requiresLogin(withRouter(UserPage));