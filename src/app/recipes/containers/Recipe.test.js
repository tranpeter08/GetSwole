import React from 'react';
import {shallow} from 'enzyme';

import {Recipe} from './Recipe';

describe('<Recipe />', () => {
  const location = {
    state: ''
  };

  const match = {
    params: {
      username: ''
    }
  };

  const defaultProps = {
    location,
    loading: '',
    match
  };

  it('renders without crashing', () => {
    shallow(<Recipe dispatch={() => Promise.resolve('')} {...defaultProps} />);
  });
});