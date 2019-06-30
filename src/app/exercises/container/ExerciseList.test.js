import React from 'react';
import {shallow, mount} from 'enzyme';

import {ExerciseList} from './ExerciseList'; 

describe('<ExerciseList />', () => {
  const defaultProps = {
    exercise: {},
    match: {params: {workoutName: 'Arms'}},
    history: {goBack: () => {}},
    location: {state: {workoutId: 'workout1234'}}
  };

  it('render without crashing', () => {
    shallow(<ExerciseList dispatch={() => {}} {...defaultProps} />);
  });

  
});