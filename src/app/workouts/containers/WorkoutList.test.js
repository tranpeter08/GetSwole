import React from 'react';
import {shallow, mount} from 'enzyme';
import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';

import {WorkoutList, mapStateToProps} from './WorkoutList';
import {WORKOUT_GET_REQUEST} from '../workout-actions';

describe('<WorkoutList />', () => {
  const generateWorkouts = amount => {
    const arr = [];
    for (let i = 0; i < amount ; i++) {
      let workout = {
        workoutName: `Workout Number ${i + 1}`,
        _id: i
      };
      arr.push(workout);
    };
    return arr;
  };

  const mockStore = configMockStore([thunk]);
  
  const auth = {userId: 'userId'};
  const store = mockStore({auth});

  afterEach(() => {
    store.clearActions();
    fetch.mockReset();
  });

  it('should render without creashing', () => {
    shallow(<WorkoutList dispatch={jest.fn()} />);
  });

  it('dispatches getWorkouts() when component mounts', () => {
    fetch.mockResponse(JSON.stringify({message: 'success'}));

    shallow(<WorkoutList dispatch={store.dispatch} />);
    expect(store.getActions()).toEqual([{type: WORKOUT_GET_REQUEST}]);
  });

  it('renders a list of workouts', () => {
    const wrapper = shallow(<WorkoutList dispatch={jest.fn()} />);
    const list = () => wrapper.find('ul');

    expect(list().children()).toHaveLength(1);

    const workouts = generateWorkouts(10);
    wrapper.setProps({workouts})

    expect(list().children()).toHaveLength(11);
  });

  it('maps the correct props from state', () => {
    const workout = {
      workouts: '',
      loading: false,
      error: ''
    };

    const test = () => 
      expect(mapStateToProps({workout})).toEqual({workouts: workout.workouts});

    test();

    workout.workouts = generateWorkouts(10);

    test();
  });
})