import React from 'react';
import {shallow, mount} from 'enzyme';


import Exercise from './Exercise';

describe('<Exercise />', () => {
  it('renders without crashing', () => {
    shallow(<Exercise />);
  });
});