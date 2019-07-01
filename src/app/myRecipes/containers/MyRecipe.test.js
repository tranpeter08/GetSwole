import React from 'react';
import {shallow} from 'enzyme';

import {MyRecipe} from './MyRecipe';

describe('<MyRecipe />', () => {
  const location = {
    state: {
      state: {uri: 'simpleRecipe.com'}
    }
  };

  const match = {
    params: {
      username: 'user1234'
    }
  };

  const defaultProps = {
    location,
    match
  };
  
  it('renders without crashing', () => {
    shallow(<MyRecipe {...defaultProps} />);
  });
});