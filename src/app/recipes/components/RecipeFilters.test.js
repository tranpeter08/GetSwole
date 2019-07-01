import React from 'react';
import {shallow} from 'enzyme';

import {RecipeFilters} from './RecipeFilters';

describe('<RecipeFilters />', () => {
  const defaultProps = {
    filters: [],
    name: ''
  }

  it('renders without crashing', () => {
    shallow(<RecipeFilters {...defaultProps} />);
  });
});