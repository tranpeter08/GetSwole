import React from 'react';
import {shallow} from 'enzyme';

import {Nutrition} from './Nutrition';

describe('<Nutrition />', () => {
  const defaultProps = {
    nutrition: {
      loading: false, 
      text: '', 
      results: '', 
      hasNext: false, 
      error: ''
    }
  };

  it('renders without crashing', () => {
    shallow(<Nutrition {...defaultProps} />);
  });
});