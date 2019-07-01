import React from 'react';
import {shallow} from 'enzyme';

import {MyRecipes} from './MyRecipes';

describe('<MyRecipes />', () => {
  const myRecipes = {
    recipes: []
  };

  const defaultProps = {
    match: {
      url: 'users/test/recipes/myrecipes'
    },
    myRecipes
  };

  it('renders without crashing', () => {
    shallow(<MyRecipes dispatch={() => {}} {...defaultProps} />);
  });
});