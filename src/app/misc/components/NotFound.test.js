import React from 'react';
import {shallow} from 'enzyme';

import NotFound from './NotFound';

describe('<NoutFound />', () => {
  it('renders without crashing', () => {
    shallow(<NotFound />);
  });
});