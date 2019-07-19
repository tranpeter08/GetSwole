import React from 'react';
import {shallow, mount} from 'enzyme';
import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';
import {reduxForm} from 'redux-form';
import {Provider} from 'react-redux';

import {WorkoutForm, mapStateToProps} from './WorkoutForm';
import {
  WORKOUT_ADD_REQUEST, WORKOUT_EDIT_REQUEST ,WORKOUT_CLEAR_ERRORS
} from '../workout-actions';

describe('<WorkoutForm />', () => {
  const setEditing = jest.fn();
  const defaultProps = {
    workout: {},
    handleSubmit: () => {},
    setEditing,
    action: '',
    form: 'workoutId',
  };

  const middlewares = [thunk];
  const mockStore = configMockStore(middlewares);
  const store = mockStore({auth: {userId: 'userId'}});

  beforeEach(() => {
    setEditing.mockReset();
    store.clearActions();
  });

  it('renders without crashing', () => {
    shallow(<WorkoutForm {...defaultProps} />);
  });

  it('adds a click event listener on mount', () => {
    const actionStack = store.getActions();
    const expectedAction = {type: WORKOUT_CLEAR_ERRORS};
    const outerNode = document.createElement('div');
    document.body.appendChild(outerNode);

    const map = {};
    document.addEventListener = jest.fn((event, callback) => 
      map[event]= callback
    );

    const Component = reduxForm({form: 'test'})(WorkoutForm);

    const wrapper = mount(
      <Provider store={store}>
        <Component
          dispatch={store.dispatch}
          {...defaultProps} />
      </Provider>
    );

    const innerNode = wrapper.getDOMNode();

    map.click({target: innerNode});
    expect(setEditing).not.toHaveBeenCalled();
    expect(actionStack).not.toContainEqual(expectedAction);; 

    map.click({target: outerNode});
    expect(setEditing).toHaveBeenCalledWith(false);
    expect(actionStack).toContainEqual(expectedAction);
  });

  it('dispatches the correct actions on onSubmit', () => {
    const actionStack = () => store.getActions();
    const data = {workoutName: 'workoutName'};
    const wrapper = shallow(
      <WorkoutForm dispatch={store.dispatch} {...defaultProps} />
    );
    const instance = () => wrapper.instance();

    expect(actionStack()).toEqual([]);

    fetch.mockResponse(JSON.stringify({message: 'success'}));
    wrapper.setProps({action: 'Adding'});
    instance().onSubmit(data);
    expect(actionStack()).toEqual([{type: WORKOUT_ADD_REQUEST}]);

    store.clearActions();

    wrapper.setProps({action: 'Editing'});
    instance().onSubmit(data);
    expect(actionStack()).toEqual([{type: WORKOUT_EDIT_REQUEST}]);
  });

  it('correctly calls setEdit after onSubmit is done', done => {
    const data = {workoutName: 'workoutName'};
    const successRes = () => Promise.resolve('');
    const errorRes = () => Promise.resolve('error');
    const wrapper = shallow(
      <WorkoutForm {...defaultProps} />
    );
    const instance = () => wrapper.instance();

    const userActions = ['Adding', 'Editing'];

    const testAction = action => {
      wrapper.setProps({dispatch: successRes, action});
      instance().onSubmit(data);
      expect(setEditing).not.toHaveBeenCalled();

      wrapper.setProps({dispatch: errorRes});
      instance().onSubmit(data);

      process.nextTick(() => {
        expect(setEditing).toHaveBeenCalledWith(false);
        done()
      });

    };

    userActions.forEach(testAction);
  });

  it('displays the correct status of the request', () => {
    const wrapper = shallow(<WorkoutForm {...defaultProps}/>);
    const statusContainer = () => wrapper.find('.workout-form-status');

    expect(statusContainer().children()).toHaveLength(0);

    let workout = {
      loading: false,
      error: {message: 'Failed request'}
    };

    wrapper.setProps({workout, anyTouched: true});
    expect(statusContainer().children()).toHaveLength(1);
    expect(statusContainer().exists('.error')).toBe(true);
    expect(statusContainer().text()).toEqual(workout.error.message);
  });

  it('maps the correct props from state', () => {
    const workout = {
      loading: false,
      error: ''
    };

    expect(mapStateToProps({workout})).toEqual({workout});
  });

});