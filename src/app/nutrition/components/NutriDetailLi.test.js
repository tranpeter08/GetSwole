import React from 'react';
import {shallow} from 'enzyme';

import NutriDetailLi from './NutriDetailLi';

describe('<NutriDetailLi />', () => {
  it('renders without crashing', () => {
    shallow(<NutriDetailLi />);
  });
});