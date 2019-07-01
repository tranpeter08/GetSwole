import React from 'react';
import {shallow} from 'enzyme';

import RecipeNutriLine from './RecipeNutritionLine';

describe('<RecipeNutriLine />', () => {
  it('renders without crashing', () => {
    shallow(<RecipeNutriLine />);
  });
});