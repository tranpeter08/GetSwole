import React from 'react';
import {shallow} from 'enzyme';

import {RecipeResult} from './RecipeResult';

describe('<RecipeResult />', () => {
  const recipe = {
    label: '', 
      calories: '', 
      image: '', 
      healthLabels: [], 
      yield: '', 
      dietLabels: [],
      uri: ''
  }
  const defaultProps = {
    recipe,
    match: {url: ''}
  };

  it('renders without crashing', () => {
    shallow(<RecipeResult {...defaultProps} />);
  });
});