import React from 'react';
import {shallow} from 'enzyme';

import RecipeNutriSub from './RecipeNutritionSub';

describe('<RecipeNutriSub />', () => {
  const line = {
    sub: {}
  }
  const defaultProps = {
    line
  };

  it('renders without crashing', () => {
    shallow(<RecipeNutriSub {...defaultProps} />);
  });
});