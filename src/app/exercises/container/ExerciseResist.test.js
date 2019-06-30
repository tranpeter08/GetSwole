import React from 'react';
import {shallow, mount} from 'enzyme';

import ExerciseResist from './ExerciseResist';

describe('<ExerciseResist />', () => {
  it('renders without crashing', () => {
    shallow(<ExerciseResist />);
  });
});