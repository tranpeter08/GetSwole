// import actions 
import {
  WORKOUT_GET_REQUEST, WORKOUT_GET_SUCCESS,
  WORKOUT_ADD_REQUEST, WORKOUT_ADD_SUCCESS,
  WORKOUT_EDIT_REQUEST, WORKOUT_EDIT_SUCCESS,
  WORKOUT_DELETE_REQUEST, WORKOUT_DELETE_SUCCESS,
  WORKOUT_ERROR,
  WORKOUT_CLEAR_ERRORS
  } from './workout-actions';

const initialState = {
  workouts: '',
  loading: '',
  error: '',
}
  
const workoutReducer = (state = initialState, action) => {
  switch(action.type){
    case WORKOUT_GET_REQUEST:
    case WORKOUT_ADD_REQUEST:  
    case WORKOUT_EDIT_REQUEST:
    case WORKOUT_DELETE_REQUEST:
      return {...state, loading: true}
    case WORKOUT_GET_SUCCESS:
      return {...state, workouts: action.workouts, loading: false, error: null}
    case WORKOUT_ADD_SUCCESS || WORKOUT_EDIT_SUCCESS || WORKOUT_DELETE_SUCCESS:
      return {...state, loading: false, error: null}
    case WORKOUT_ERROR:
      return {...state, loading: false, error: action.error}
    case WORKOUT_CLEAR_ERRORS:
      return {...state, error: ''}
    default:
      return state;
  }
}

export default workoutReducer;