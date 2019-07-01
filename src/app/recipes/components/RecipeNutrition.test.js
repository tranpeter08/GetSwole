import React from 'react';
import {shallow} from 'enzyme';

import {RecipeNutri} from './RecipeNutrition';

describe('<RecipeNutri />', () => {
  const data = {
    digest: [],
    servings: ''
  }
  const defaultProps = {
    data
  };

  it('renders without crashing', () => {
    shallow(<RecipeNutri {...defaultProps} />);
  });
});