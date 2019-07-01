import React from 'react';
import {shallow, mount} from 'enzyme';

import RecipeDetail from './RecipeDetail';

describe('<RecipeDetail />', () => {
  const details = {
    image: '',
    calories: '',
    label: '',
    source: '',
    url: '',
    yield: '',
    ingredientLines: '',
    digest: []
  };

  const defaultProps = {
    details
  };

  it('renders without crashing', () => {
   shallow(<RecipeDetail {...defaultProps} />);
  });
});