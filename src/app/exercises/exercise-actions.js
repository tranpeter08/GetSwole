import {API_BASE_URL} from '../misc/config';
import {fetchOptions, normalizeRes} from '../misc/utils';
 
export const EXERCISE_GET_REQUEST = 'EXERCISE_GET_REQUEST';
export const exerciseGetRequest = () => ({
  type: EXERCISE_GET_REQUEST
});

export const EXERCISE_GET_SUCCESS = 'EXERCISE_GET_SUCCESS';
export const exerciseGetSuccess = exercises => ({
  type: EXERCISE_GET_SUCCESS,
  exercises
});

export const EXERCISE_ADD_REQUEST = 'EXERCISE_ADD_REQUEST';
export const exerciseAddRequest = () => ({
  type: EXERCISE_ADD_REQUEST
});

export const EXERCISE_ADD_SUCCESS = 'EXERCISE_ADD_SUCCESS';
export const exerciseAddSuccess = () => ({
  type: EXERCISE_ADD_SUCCESS
});

export const EXERCISE_EDIT_REQUEST = 'EXERCISE_EDIT_REQUEST';
export const exerciseEditRequest = () => ({
  type: EXERCISE_EDIT_REQUEST
});

export const EXERCISE_EDIT_SUCCESS = 'EXERCISE_EDIT_SUCCESS';
export const exerciseEditSuccess = () => ({
  type: EXERCISE_EDIT_SUCCESS
});

export const EXERCISE_DELETE_REQUEST = 'EXERCISE_DELETE_REQUEST';
export const exerciseDeleteRequest = () => ({
  type: EXERCISE_DELETE_REQUEST
});

export const EXERCISE_DELETE_SUCCESS = 'EXERCISE_DELETE_SUCCESS';
export const exerciseDeleteSuccess = () => ({
  type: EXERCISE_DELETE_SUCCESS
});

export const EXERCISE_ERROR = 'EXERCISE_ERROR';
export const exerciseError = (error) => ({
  type: EXERCISE_ERROR,
  error
});

export const EXERCISE_CLEAR_ERROR = 'EXERCISE_CLEAR_ERROR';
export const exerciseClearError = () => {
  return ({type: EXERCISE_CLEAR_ERROR})
};

export const EXERCISE_CLEAR = 'EXERCISE_CLEAR';
export const exerciseClear = () => ({type: EXERCISE_CLEAR});

export const getExercises = workoutId => (dispatch, getState) => {
  dispatch(exerciseGetRequest());
  const {userId} = getState().auth;

  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}`,
    fetchOptions('GET')
  )
  .then(normalizeRes)
  .then(({exercises}) => {
    dispatch(exerciseGetSuccess(exercises))
  })
  .catch(err => {
    console.error('GET EXERCISE ERROR:', err);
    dispatch(exerciseError(err));
  });
};

export const addExercise = (workoutId, data) => (dispatch, getState) => {
  dispatch(exerciseAddRequest());
  const {userId} = getState().auth;
  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises`,
    fetchOptions('POST', data)
  )
  .then(normalizeRes)
  .then(() => {
    dispatch(exerciseAddSuccess());
    dispatch(getExercises(workoutId));
    return true;
  })
  .catch(error => {
    console.error('ADD EXERCISE ERROR', error);
    dispatch(exerciseError(error));
  });
};

export const editExercise = (workoutId, exrcseId, data) => (dispatch, getState) => {
  dispatch(exerciseEditRequest());
  const {userId} = getState().auth;
  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises/${exrcseId}`,
    fetchOptions('PUT', data)
  )
  .then(normalizeRes)
  .then(() => {
    dispatch(exerciseEditSuccess());
    dispatch(getExercises(workoutId));
    return true;
  })
  .catch(err => {
    console.error('EDIT EXERCISE ERROR', err);
    dispatch(exerciseError(err));
  });
};

export const deleteExercise = (workoutId, exerciseId) => (dispatch, getState) => {
  dispatch(exerciseDeleteRequest());
  const {userId} = getState().auth;
  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}`,
    fetchOptions('DELETE', null))
    .then(normalizeRes)
    .then(() => {
      dispatch(exerciseDeleteSuccess());
      dispatch(getExercises(workoutId));
    })
    .catch( err => {
      console.error('DELETE EXERCISE ERROR', err);
      dispatch(exerciseError(err));
    });
};