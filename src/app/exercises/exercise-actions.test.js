import * as exerciseActions from './exercise-actions';

export const generateExercises = amount => {
  let arr = [];
  for (let i = 0; i < amount; i++ ) {
    const exercise = {
      exerciseName: `Exercise number ${i + 1}`
    }
  };
  return arr;
};

describe('exercise-actions', () => {
  
  describe('exerciseGetRequest', () => {
    const {EXERCISE_GET_REQUEST, exerciseGetRequest} = exerciseActions;
    it('returns the correct action', () => {
      const actionName = 'EXERCISE_GET_REQUEST';
      expect(EXERCISE_GET_REQUEST).toEqual(actionName);

      expect(exerciseGetRequest()).toEqual({type: actionName});
    });
  });

  describe('exerciseGetSuccess', () => {
    const {EXERCISE_GET_SUCCESS, exerciseGetSuccess} = exerciseActions;

    it('returns the correct action', () => {
      const actionName = 'EXERCISE_GET_SUCCESS';
      const exercises = generateExercises(10);
      const expectedAction = {
        type: actionName,
        exercises
      };

      expect(EXERCISE_GET_SUCCESS).toEqual(actionName);
      expect(exerciseGetSuccess(generateExercises(10))).toEqual(expectedAction);
    });
  });

  describe('exerciseAddRequest', () => {
    const {EXERCISE_ADD_REQUEST, exerciseAddRequest} = exerciseActions;
    it('returns the correct action', () => {
      const actionName = 'EXERCISE_ADD_REQUEST';

      expect(EXERCISE_ADD_REQUEST).toEqual(actionName);
      expect(exerciseAddRequest()).toEqual({type: actionName});
    });
  });

  describe('exerciseAddSuccess', () => {
    const {EXERCISE_ADD_SUCCESS, exerciseAddSuccess} = exerciseActions;
    it('returns the correct action', () => {
      const actionName = 'EXERCISE_ADD_SUCCESS';

      expect(EXERCISE_ADD_SUCCESS).toEqual(actionName);
      expect(exerciseAddSuccess()).toEqual({type: actionName});
    });
  });

  describe('exerciseEditRequest', () => {
    const {EXERCISE_EDIT_REQUEST, exerciseEditRequest} = exerciseActions;
    it('returns the correct action', () => {
      const actionName = 'EXERCISE_EDIT_REQUEST';

      expect(EXERCISE_EDIT_REQUEST).toEqual(actionName);
      expect(exerciseEditRequest()).toEqual({type: actionName});
    });
  });

  describe('exerciseEditSuccess', () => {
    const {EXERCISE_EDIT_SUCCESS, exerciseEditSuccess} = exerciseActions;
    it('returns the correct action', () => {
      const actionName = 'EXERCISE_EDIT_SUCCESS';

      expect(EXERCISE_EDIT_SUCCESS).toEqual(actionName);
      expect(exerciseEditSuccess()).toEqual({type: actionName});
    });
  });

  describe('exerciseDeleteRequest', () => {
    const {EXERCISE_DELETE_REQUEST, exerciseDeleteRequest} = exerciseActions;
    it('returns the correct action', () => {
      const actionName = 'EXERCISE_DELETE_REQUEST';

      expect(EXERCISE_DELETE_REQUEST).toEqual(actionName);
      expect(exerciseDeleteRequest()).toEqual({type: actionName});
    });
  });

  describe('exerciseDeleteSuccess', () => {
    const {EXERCISE_DELETE_SUCCESS, exerciseDeleteSuccess} = exerciseActions;
    it('returns the correct action', () => {
      const actionName = 'EXERCISE_DELETE_SUCCESS';

      expect(EXERCISE_DELETE_SUCCESS).toEqual(actionName);
      expect(exerciseDeleteSuccess()).toEqual({type: actionName});
    });
  });

  describe('exerciseError', () => {
    const {EXERCISE_ERROR, exerciseError} = exerciseActions;
    const error = {message: 'failed request'};
    it('returns the correct action', () => {
      const actionName = 'EXERCISE_ERROR';
      expect(EXERCISE_ERROR).toEqual(actionName);

      expect(exerciseError(error)).toEqual({type: actionName, error});
    });
  });

  describe('exerciseClearError', () => {
    const {EXERCISE_CLEAR_ERROR, exerciseClearError} = exerciseActions;
    it('returns the correct action', () => {
      const actionName = 'EXERCISE_CLEAR_ERROR';
      expect(EXERCISE_CLEAR_ERROR).toEqual(actionName);

      expect(exerciseClearError()).toEqual({type: actionName});
    });
  });
});