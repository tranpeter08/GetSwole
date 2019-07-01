import React from 'react';
import {shallow} from 'enzyme';

import {RecipeSearch} from './RecipeSearch';

describe('<RecipeSearch />', () => {
  const recipes = {
    q: '',
    from: '', 
    to: '', 
    more: '', 
    count: '', 
    loading: false,
    error: ''
  }; 

  const defaultProps = {
    recipes
  };

  it('renders without crashing', () => {
    shallow(<RecipeSearch {...defaultProps} />);
  });
});