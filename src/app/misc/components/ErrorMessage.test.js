import React from 'react';
import {shallow} from 'enzyme';

import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  it('renders without crashing', () => {
    shallow(<ErrorMessage />);
  });
});