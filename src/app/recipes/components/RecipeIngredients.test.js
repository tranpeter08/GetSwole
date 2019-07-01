import React from 'react';
import {shallow} from 'enzyme';

import RecipeIngrdnts, {Recipe} from './RecipeIngredients';

describe('<RecipeIngredients />', () => {
  const defaultProps = {
    ingredientLines: []
  };

  it('renders without crashing', () => {
    shallow(<RecipeIngrdnts {...defaultProps} />);
  });
});