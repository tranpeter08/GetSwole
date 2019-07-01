import React from 'react';
import {shallow} from 'enzyme';

import NutriSearchForm from './NutriSearchForm';

describe('<NutriSearchForm />', () => {
  const showModal = jest.fn();
  const defaultProps = {
    food: {},
    showModal
  };

  it('renders without crashing', () => {
    shallow(<NutriSearchForm {...defaultProps} />);
  });
});