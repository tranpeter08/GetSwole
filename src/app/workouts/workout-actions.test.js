import * as workoutActions from './workout-actions';

export const generateWorkouts = num => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push({
      workoutName: `Workout ${i+1}`,
      id: i
    });
  }
  return arr;
};

describe('workout-actions', () => {
  describe('workoutGetRequest', () => {
    const {WORKOUT_GET_REQUEST, workoutGetRequest} = workoutActions;

    it('returns the correct action', () => {
      const expectedString = 'WORKOUT_GET_REQUEST';
      expect(WORKOUT_GET_REQUEST).not.toEqual('WORKOUT_SUCCESS');
      expect(WORKOUT_GET_REQUEST).toEqual(expectedString);

      const action = workoutGetRequest();

      expect(action.type).toEqual(expectedString);
    });
  });
 
  describe('workoutGetSuccess', () => {
    const {WORKOUT_GET_SUCCESS, workoutGetSuccess} = workoutActions;
    
    it('returns the correct action', () => {
      const expectedString = 'WORKOUT_GET_SUCCESS';

      expect(WORKOUT_GET_SUCCESS).not.toEqual('WORKOUT_GET_REQUEST');
      expect(WORKOUT_GET_SUCCESS).toEqual(expectedString);

      let workouts = generateWorkouts(3)
      let action = workoutGetSuccess(workouts);

      const expectedAction = {
        type: expectedString,
        workouts
      }

      expect(action).toEqual(expectedAction);
      expect(action.type).toEqual(expectedString);
      expect(action.workouts).toEqual(workouts);

      workouts = generateWorkouts(6);
      action = workoutGetSuccess(workouts);

      expect(action.workouts).not.toEqual(generateWorkouts(3));
      expect(action.workouts).toEqual(workouts);
    });
  });

  describe('workoutAddRequest', () => {
    const {WORKOUT_ADD_REQUEST, workoutAddRequest} = workoutActions;

    it('returns the correct action', () => {
      const expectedString = 'WORKOUT_ADD_REQUEST';

      expect(WORKOUT_ADD_REQUEST).not.toEqual('WORKOUT_GET_REQUEST');
      expect(WORKOUT_ADD_REQUEST).toEqual(expectedString);

      const action = workoutAddRequest();

      expect(action.type).toEqual(expectedString);
    });
  });

  describe('workoutAddSuccess', () => {
    const {WORKOUT_ADD_SUCCESS, workoutAddSuccess,} = workoutActions;

    it('returns the correct action', () => {
      const expectedString = 'WORKOUT_ADD_SUCCESS';
      expect(WORKOUT_ADD_SUCCESS).not.toEqual('WORKOUT_SUCCESS');
      expect(WORKOUT_ADD_SUCCESS).toEqual(expectedString);

      const action = workoutAddSuccess();

      expect(action.type).toEqual(expectedString);
    });
  });

  describe('workoutEditRequest', () => {
    const {WORKOUT_EDIT_REQUEST, workoutEditRequest} = workoutActions;

    it('returns the correct action', () => {
      const expectedString = 'WORKOUT_EDIT_REQUEST';

      expect(WORKOUT_EDIT_REQUEST).not.toEqual('WORKOUT_GET_REQUEST');
      expect(WORKOUT_EDIT_REQUEST).toEqual(expectedString);

      const action = workoutEditRequest();

      expect(action.type).toEqual(expectedString);
    });
  });

  describe('workoutEditSuccess', () => {
    const {WORKOUT_EDIT_SUCCESS, workoutEditSuccess} = workoutActions;

    it('returns the correct action', () => {
      const expectedString = 'WORKOUT_EDIT_SUCCESS';
      expect(WORKOUT_EDIT_SUCCESS).not.toEqual('WORKOUT_SUCCESS');
      expect(WORKOUT_EDIT_SUCCESS).toEqual(expectedString);

      const action = workoutEditSuccess();

      expect(action.type).toEqual(expectedString);
    });
  });

  describe('workoutDeleteRequest', () => {
    const {WORKOUT_DELETE_REQUEST, workoutDeleteRequest} = workoutActions;

    it('returns the correct action', () => {
      const expectedString = 'WORKOUT_DELETE_REQUEST';

      expect(WORKOUT_DELETE_REQUEST).not.toEqual('WORKOUT_GET_REQUEST');
      expect(WORKOUT_DELETE_REQUEST).toEqual(expectedString);

      const action = workoutDeleteRequest();

      expect(action.type).toEqual(expectedString);
    });
  });

  describe('workoutDeleteSuccess', () => {
    const {WORKOUT_DELETE_SUCCESS, workoutDeleteSuccess} = workoutActions;

    it('returns the correct action', () => {
      const expectedString = 'WORKOUT_DELETE_SUCCESS';
      expect(WORKOUT_DELETE_SUCCESS).not.toEqual('WORKOUT_SUCCESS');
      expect(WORKOUT_DELETE_SUCCESS).toEqual(expectedString);

      const action = workoutDeleteSuccess();

      expect(action.type).toEqual(expectedString);
    });
  });

  describe('workoutError', () => {
    const {WORKOUT_ERROR, workoutError} = workoutActions;

    it('returns the correct action', () => {
      const expectedString = 'WORKOUT_ERROR';

      expect(WORKOUT_ERROR).not.toEqual('WORKOUT_GET_REQUEST');
      expect(WORKOUT_ERROR).toEqual(expectedString);

      const error = {message: 'Not Found', code: 404};
      
      const expectedAction = {
        type: expectedString,
        error
      };

      let action = workoutError(error);

      expect(action).toEqual(expectedAction);
      expect(action.type).toEqual(expectedString);
      expect(action.error.message).toEqual(error.message);
      expect(action.error.code).toEqual(error.code);

      error.message= 'User not found'; 
      error.code= 400;

      expect(action.error.message).toEqual(error.message);
      expect(action.error.code).toEqual(error.code);
    });
  });

  describe('clearErrors', () => {
    const {WORKOUT_CLEAR_ERRORS, clearErrors} = workoutActions;

    it('returns the correct action', () => {
      const expectedString = 'WORKOUT_CLEAR_ERRORS';
      expect(WORKOUT_CLEAR_ERRORS).not.toEqual('WORKOUT_SUCCESS');
      expect(WORKOUT_CLEAR_ERRORS).toEqual(expectedString);

      const action = clearErrors();

      expect(action.type).toEqual(expectedString);
    });
  });
});