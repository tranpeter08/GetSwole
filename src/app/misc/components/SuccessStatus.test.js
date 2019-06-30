import React from 'react';
import {shallow} from 'enzyme';

import SuccessStatus from './SuccessStatus';

describe('<SuccessStatus />', () => {
  it('renders without crashing', () => {
    shallow(<SuccessStatus />);
  });
});