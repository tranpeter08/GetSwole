import React from 'react';
import RecipeNutriLine from './RecipeNutritionLine';
import RecipeNutriSub from './RecipeNutritionSub';

export class RecipeNutri extends React.Component{ 
  state = {
    value: 1
  }

  renderNutri = digest => {
    return digest.map((line, index) => {
      if (line.sub) {
        return <RecipeNutriSub key={index} line={line} />;
      };

      return <li key={index} >
        <RecipeNutriLine {...line} />
      </li>;
    });
  }

  handleChange = ({target: {value}}) => {
    this.setState({value});
  }

  renderOptions = servings => (
    <select onChange={this.handleChange} value={this.state.value} >
      <option value={1}>Recipe</option>
      <option value={servings}>Serving</option>
    </select>
  );

  render() {
    const {digest, servings} = this.props.data;
    return (
      <section className='recipeDetail-nutrition'>
        <h3>
          <label>Nutrition Facts Per {this.renderOptions(servings)}</label>
        </h3>
        <h4>
          <div className='nutrient-label'>Nutrient</div>
          <div className='nutrient-qty'>Weight</div>
          <div className='nutrient-daily'>Daily%</div>        
        </h4>
        <ul> 
          <RecipeNutriContext.Provider value={this.state.value}>
            {this.renderNutri(digest)}
          </RecipeNutriContext.Provider>
        </ul>
      </section>
    )
  }
}

export const RecipeNutriContext = React.createContext();

export default RecipeNutri;