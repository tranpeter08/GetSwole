import {generateExercises} from './exercise-actions.test';
import exerciseReducer from './exercise-reducer';
import * as exerciseActions from './exercise-actions';

describe('exerciseReducer', () => {
  const initialState = {
    exercises: '',
    error: '',
    loading: false
  };

  it('returns the correct initial state', () => {
    expect(exerciseReducer(undefined, {})).toEqual(initialState);
  });

  it('returns the correct state on request actions', ()=> {
    const {
      exerciseGetRequest, 
      exerciseAddRequest, 
      exerciseEditRequest,
      exerciseDeleteRequest
    } = exerciseActions;

    const actions = [
      exerciseGetRequest, 
      exerciseAddRequest, 
      exerciseEditRequest,
      exerciseDeleteRequest
    ];

    const expectedState = {
      exercises: '',
      error: '',
      loading: true
    };

    const testAction = action => {
      const state = exerciseReducer(initialState, action());

      expect(state).not.toEqual(initialState);
      expect(state).toEqual(expectedState);
    };

    actions.forEach(testAction);
  });

  it('returns the correct state on exerciseGetSuccess', () => {
    const {exerciseGetSuccess} = exerciseActions;
    const exercises = generateExercises(10);
    const expectedState = {
      exercises,
      loading: false,
      error: ''
    };
    const action = exerciseGetSuccess(exercises);
    const state = exerciseReducer(initialState, action)

    expect(state).not.toEqual(initialState);
    expect(state).toEqual(expectedState);
  });

  it('returns the correct state on other success actions', () => {
    const {
      exerciseAddSuccess,
      exerciseEditSuccess,
      exerciseDeleteSuccess
    } = exerciseActions;

    const actions = [
      exerciseAddSuccess,
      exerciseEditSuccess,
      exerciseDeleteSuccess
    ];

    const testAction = action => {
      const state = exerciseReducer(initialState, action());
      expect(state).toEqual(initialState);
    };

    actions.forEach(testAction);
  });

  it('returns the correct state on exerciseError', () => {
    const {exerciseError} = exerciseActions;
    const error = {message: 'request error'};
    const action = exerciseError(error);

    const expectedState = {
      loading: false,
      exercises: '',
      error
    };

    expect(exerciseReducer(initialState, action)).toEqual(expectedState);
  });

  it('returns the correct state on exerciseClear', () => {
    const {exerciseClearError} = exerciseActions;
    const error = {message: 'request error'};
    const currentState = {
      exercises: generateExercises(10),
      loading: false,
      error
    };

    const action = exerciseClearError();
    const expectedState = {...currentState, error: ''};

    const state = exerciseReducer(currentState, action);

    expect(state).toEqual(expectedState);
  });
});