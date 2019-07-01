import React from 'react';
import {shallow} from 'enzyme';

import {NutriModal} from '../containers/NutriModal';

describe('<NutriModal />', () => {
  const closeModal = jest.fn();
  const defaultProps = {
    food: {
      label: 'Sandwich',
      image: '',
      brand: ''
    },
    closeModal,
    nutriDetail: {
      loading: false,
      data: '',
      error: ''
    },
    measures: [{uri: ''}]
  };

  it('renders without crashing', () => {
    shallow(<NutriModal dispatch={() => {}} {...defaultProps} />);
  });
});