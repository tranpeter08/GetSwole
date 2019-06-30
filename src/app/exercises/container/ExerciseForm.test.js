import React from 'react';
import {shallow, mount} from 'enzyme';

import {ExerciseForm} from './ExerciseForm'; 

describe('<ExerciseForm />', () => {
  const defaultProps = {
    exercise: {},
    handleSubmit: () => {}
  };

  it('render without crashing', () => {
    shallow(<ExerciseForm {...defaultProps} />);
  });

  
});