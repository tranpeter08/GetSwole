import React from 'react';
import {shallow} from 'enzyme';

import ExerciseAdd from './ExerciseAdd';

describe('<ExerciseAdd />', () => {
  it('renders without crashing', () => {
    shallow(<ExerciseAdd />);
  });
});

