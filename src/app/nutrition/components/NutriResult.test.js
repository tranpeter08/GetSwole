import React from 'react';
import {shallow} from 'enzyme';

import NutriResult from './NutriResult';

describe('<NutriResult />', () => {
  const showModal = jest.fn();
  const defaultProps = {
    food: {},
    showModal
  };

  it('renders without crashing', () => {
    shallow(<NutriResult {...defaultProps} />);
  });
});