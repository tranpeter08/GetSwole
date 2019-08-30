import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import RecipeResult from '../../recipes/components/RecipeResult';
import Spinner from '../../misc/components/Spinner';
import {getMyRecipes, deleteRecipe} from '../myRecipes-actions';
import '../styling/myRecipes.css';

export class MyRecipes extends React.Component{
  componentDidMount() {
    this.props.dispatch(getMyRecipes())
  }

  handleRemove = uri => {
    let recipes = this.props.myRecipes.recipes.filter(item => 
      item.uri !== uri
    )
    ;
    this.props.dispatch(deleteRecipe(uri, recipes));
  }

  renderResults = () => {
    return this.props.myRecipes.recipes.map(item =>
      <RecipeResult 
        key={item.uri} 
        recipe={item} 
        handleRemove={this.handleRemove} />
    )
  }

  render() {
    const {recipes, loading, error} = this.props.myRecipes;
    const {url} = this.props.match;
    const urlArr = url.split('/').splice(-1, 1, 'search');

    return <section className='myRecipes'>
      <h2>My Recipes</h2>
      {
        loading ? 
          <div style={{textAlign: 'center'}}>
            <Spinner 
              height={'60px'} 
              thickness={'6px'}
              color='#195078'
              className='my-recipes_spinner'
            />
          </div> :
        error ? <p className='error'>{error.message}</p> :
        recipes.length > 0 ? 
          <ul>{this.renderResults()}</ul> 
          : 
          <p className='no-recipes'>
            You have no recipes saved.{' '}
            <Link to={urlArr.join('/')}>Search</Link>{' '}
            for recipes and add them here.
          </p>
      }
    </section>
  }
}

const mapStateToProps = ({myRecipes}) => ({myRecipes});

export default connect(mapStateToProps)(MyRecipes);