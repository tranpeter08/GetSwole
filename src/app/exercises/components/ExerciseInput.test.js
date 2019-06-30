import React from 'react';
import {shallow, mount} from 'enzyme';

import ExerciseInput from './ExerciseInput';

describe('<ExerciseInput />', () => {
  const defaultProps = {
    input: {
      name: 'exerciseName'
    }
  };

  it('renders without crashing', () => {
    shallow(<ExerciseInput {...defaultProps} />);
  });
});