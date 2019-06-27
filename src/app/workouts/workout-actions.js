import {API_BASE_URL} from '../misc/config';
import {fetchOptions, normalizeRes} from '../misc/utils';

export const WORKOUT_GET_REQUEST = 'WORKOUT_GET_REQUEST';
export const workoutGetRequest = () => ({type: WORKOUT_GET_REQUEST});

export const WORKOUT_GET_SUCCESS = 'WORKOUT_GET_SUCCESS';
export const workoutGetSuccess = workouts => ({
  type: WORKOUT_GET_SUCCESS,
  workouts
});

export const WORKOUT_ADD_REQUEST = 'WORKOUT_ADD_REQUEST';
export const workoutAddRequest = () => ({type: WORKOUT_ADD_REQUEST});

export const WORKOUT_ADD_SUCCESS = 'WORKOUT_ADD_SUCCESS';
export const workoutAddSuccess = () => ({type: WORKOUT_ADD_SUCCESS});

export const WORKOUT_EDIT_REQUEST = 'WORKOUT_EDIT_REQUEST';
export const workoutEditRequest = () => ({type: WORKOUT_EDIT_REQUEST});

export const WORKOUT_EDIT_SUCCESS = 'WORKOUT_EDIT_SUCCESS';
export const workoutEditSuccess = () => ({type: WORKOUT_EDIT_SUCCESS});

export const WORKOUT_DELETE_REQUEST = 'WORKOUT_DELETE_REQUEST';
export const workoutDeleteRequest = () => ({type: WORKOUT_DELETE_REQUEST});

export const WORKOUT_DELETE_SUCCESS = 'WORKOUT_DELETE_SUCCESS';
export const workoutDeleteSuccess = () => ({type: WORKOUT_DELETE_SUCCESS});

export const WORKOUT_ERROR = 'WORKOUT_ERROR';
export const workoutError = error => ({
  type: WORKOUT_ERROR,
  error
});

export const WORKOUT_CLEAR_ERRORS = 'WORKOUT_CLEAR_ERRORS';
export const clearErrors = () => ({type: WORKOUT_CLEAR_ERRORS});

export const getWorkouts = () => (dispatch, getState) => {
  dispatch(workoutGetRequest());
  const userId = getState().auth.userId;

  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts`,
    fetchOptions('GET')
  )
  .then(normalizeRes)
  .then(res => dispatch(workoutGetSuccess(res)))
  .catch(err => {
    console.error('GET WORKOUT ERROR: ',err);
    dispatch(workoutError(err));
  });
}

export const addWorkout = data => (dispatch, getState) => {
  dispatch(workoutAddRequest());
  const userId = getState().auth.userId;

  return fetch(
      `${API_BASE_URL}/users/${userId}/workouts`, 
      fetchOptions('POST', data)
    )
    .then(normalizeRes)
    .then(() => {
      dispatch(workoutAddSuccess());
      dispatch(getWorkouts());
    })
    .catch(err => {
      console.error('CREATE WORKOUT ERROR:', err);
      dispatch(workoutError(err))
      return err
    });
};

export const editWorkout = (data, workoutId) => (dispatch, getState )=> {
  dispatch(workoutEditRequest());
  const userId = getState().auth.userId;
  
  return fetch(
      `${API_BASE_URL}/users/${userId}/workouts/${workoutId}`,
      fetchOptions('PUT', data)
    )
    .then(res => normalizeRes(res))
    .then(() => {
      dispatch(workoutEditSuccess())
      dispatch(getWorkouts());
    })
    .catch(err => {
      console.error('WORKOUT EDIT ERROR:', err);
      dispatch(workoutError(err));
      return err;
    })
};

export const deleteWorkout = workoutId => (dispatch, getState ) => {
  dispatch(workoutDeleteRequest());
  const userId = getState().auth.userId;

  return fetch(
      `${API_BASE_URL}/users/${userId}/workouts/${workoutId}`,
      fetchOptions('DELETE')
    )
    .then(res => normalizeRes(res))
    .then(() => {
      dispatch(workoutDeleteSuccess())
      dispatch(getWorkouts());
    })
    .catch(err => {
      console.error('WORKOUT Delete ERROR:', err);
      dispatch(workoutError(err));
      return err;
    })
}