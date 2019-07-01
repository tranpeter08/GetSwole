import React from 'react';
import {shallow} from 'enzyme';

import RecipeButton from './RecipeButton';

describe('<RecipeButton />', () => {
  it('renders without crashing', () => {
    shallow(<RecipeButton />);
  });
});