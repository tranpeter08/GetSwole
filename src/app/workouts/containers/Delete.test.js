import React from 'react';
import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';
import {shallow, mount} from 'enzyme';
import {Delete, mapStateToProps} from './Delete';
import {WORKOUT_DELETE_REQUEST} from '../../workouts/workout-actions';
import {EXERCISE_REQUEST} from '../../exercises/exercise-actions';

describe('<Delete />', () => {
  const setDelete = jest.fn();
  const defaultProps = { 
    type: 'workout',
    workout: {},
    exercise: {},
    setDelete
  };

  const middlewares = [thunk];
  const mockStore = configMockStore(middlewares);

  fetch.mockResponse(JSON.stringify({message: 'success'}));

  beforeEach(() => {
    setDelete.mockReset();
  });

  it('renders without crashing', () => {
    shallow(<Delete {...defaultProps} />);
  });

  it('adds a click event listener on mount to handle clicks outside', () => {
    const outerNode = document.createElement('div');
    document.body.appendChild(outerNode);

    const map = {};
    document.addEventListener = jest.fn((event, callback) => 
      map[event]= callback
    );

    const wrapper = mount(<Delete {...defaultProps} />);
    const innerNode = wrapper.getDOMNode();

    map.click({target: innerNode});
    expect(setDelete).not.toHaveBeenCalled();

    map.click({target: outerNode});
    expect(setDelete).toHaveBeenCalledWith(false);
  });

  it('dipatches the correct action when clicking the Yes button', ()=> {
    const store = mockStore({auth: {userId: 'userId'}});
    const props = {
      dispatch: store.dispatch,
      type: '',
      workoutId: 'workoutId', 
      itemId: 'itemId',
      exercise: {},
      workout: {
        loading: false,
        error: ''
    }};

    const wrapper = shallow(<Delete {...props} />);

    const yesButton = wrapper.find('button:first-child');

    const testArgs = [
      ['workout', WORKOUT_DELETE_REQUEST],
      ['exercise', EXERCISE_REQUEST]
    ];

    testArgs.forEach(arg => {

      wrapper.setProps({type: arg[0]});
      yesButton.simulate('click');

      expect(store.getActions()).not.toEqual([]);
      expect(store.getActions()).toEqual([{type: arg[1]}]);

      store.clearActions();
    });
  });

  it('calls setDelete on "No" button click', () => {
    const wrapper = shallow(<Delete {...defaultProps} />);

    expect(setDelete).not.toHaveBeenCalled();

    wrapper.find('button:last-child').simulate('click');

    expect(setDelete).toHaveBeenCalledWith(false);
  });

  it('displays the right status of the request', () => {
    const wrapper = shallow(<Delete {...defaultProps} />);
    let workout = {
      loading: true,
      error: ''
    };

    const container = () => wrapper.find('.delete-status');

    expect(container().children()).toHaveLength(0);

    wrapper.setProps({workout});
    
    expect(container().children()).toHaveLength(1);
    expect(container().text()).toEqual('Deleting...');

    workout = {
      loading: false,
      error: {message: 'workout error'}
    };

    wrapper.setProps({workout});
    
    expect(container().children()).toHaveLength(1);
    expect(container().exists('.error')).toBe(true);
    expect(container().text()).toEqual(workout.error.message);

    const type = 'exercise';
    const exercise = {
      loading: false,
      error: {message: 'exercise error'}
    };

    wrapper.setProps({type, exercise});
    
    expect(container().children()).toHaveLength(1);
    expect(container().exists('.error')).toBe(true);
    expect(container().text()).toEqual(exercise.error.message);
  });

  it('maps the right props from state', () => {
    const workout = {
      workouts: [],
      loading: false,
      error: ''
    }; 

    const exercise = {
      exercises: [],
      loading: true,
      error: ''
    };

    expect(mapStateToProps({workout, exercise})).toEqual({workout, exercise});
  });
});