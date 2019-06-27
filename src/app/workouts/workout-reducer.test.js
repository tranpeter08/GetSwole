import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';
import {workoutReducer} from './workout-reducer';
import * as workoutActions from './workout-actions';
import {generateWorkouts} from './workout-actions.test';

describe('workoutReducer', () => {
  const initialState = {
    workouts: '',
    loading: false,
    error: ''
  };

  let state; 

  beforeEach(() => {
    state = {...initialState};
  });

  it('returns the correct initial state', () => {
    expect(workoutReducer(undefined, {})).toEqual(initialState);
  });

  it('returns the correct state on requests', () => {
    const {
      workoutAddRequest,
      workoutGetRequest,
      workoutEditRequest,
      workoutDeleteRequest
    } = workoutActions;

    state.loading = true;

    const actions = [
      workoutAddRequest,
      workoutGetRequest,
      workoutEditRequest,
      workoutDeleteRequest
    ];

    actions.forEach(action => {
      expect(workoutReducer(undefined, action())).not.toEqual(initialState);
      expect(workoutReducer(undefined, action())).toEqual(state);
    });
  
  });

  it('returns the correct state on workoutGetSuccess', () => {
    const {workoutGetSuccess} = workoutActions;
    const workouts = generateWorkouts(4);
    const action = workoutGetSuccess(workouts);


    expect(workoutReducer(undefined, action)).not.toEqual(state);

    state.workouts = workouts;

    expect(workoutReducer(undefined, action)).toEqual(state);
  });

  it('returns the correct state on other success actions', () => {
    const {
      workoutAddSuccess, 
      workoutEditSuccess, 
      workoutDeleteSuccess
    } = workoutActions;

    const actions = [
      workoutAddSuccess, 
      workoutEditSuccess, 
      workoutDeleteSuccess
    ];

    actions.forEach(action => {
      expect(workoutReducer(undefined, action())).toEqual(initialState);
      expect(workoutReducer(undefined, action())).toEqual(state);
    });
  });

  it('returns the correct state for workoutError', () => {
    const {workoutError} = workoutActions;
    const error = {message: 'failed request'};
    const action = workoutError(error);

    state.loading = true;

    expect(workoutReducer(undefined, action)).not.toEqual(state);

    state.loading = false;
    state.error = error;

    expect(workoutReducer(undefined, action)).toEqual(state);
  });

  it('returns the correct state for clearErrors', () => {
    const {clearErrors} = workoutActions;
    const action = clearErrors();
    const error = {message: 'failed request'};
    const workouts = generateWorkouts(4);
    const currentState = {
      workouts,
      loading: false,
      error: ''
    };
   
    state.error = error;
    state.workouts = workouts;
    
    expect(workoutReducer(currentState, action)).not.toEqual(state);

    state.error = '';
    
    expect(workoutReducer(currentState, action)).toEqual(state);
  });
});