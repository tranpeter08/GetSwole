import {
  EXERCISE_GET_REQUEST, EXERCISE_GET_SUCCESS, 
  EXERCISE_ADD_REQUEST, EXERCISE_ADD_SUCCESS, 
  EXERCISE_EDIT_REQUEST, EXERCISE_EDIT_SUCCESS, 
  EXERCISE_DELETE_REQUEST, EXERCISE_DELETE_SUCCESS, 
  EXERCISE_ERROR,
  EXERCISE_CLEAR_ERROR
} from './exercise-actions';

const initialState = {
  exercises: '',
  error: '',
  loading: false
};

const exerciseReducer = (state = initialState, action) => {
  switch(action.type){
    case EXERCISE_GET_REQUEST:
    case EXERCISE_ADD_REQUEST:
    case EXERCISE_EDIT_REQUEST:
    case EXERCISE_DELETE_REQUEST:
      return {...state, loading: true};

    case EXERCISE_GET_SUCCESS:
      return {
        ...state, 
        exercises: action.exercises,
        loading: false, 
        error: ''
      };

    case EXERCISE_ADD_SUCCESS:
    case EXERCISE_EDIT_SUCCESS:
    case EXERCISE_DELETE_SUCCESS:
      return {...state, loading: false};

    case EXERCISE_ERROR:
      return {...state, loading: false, error: action.error};

    case EXERCISE_CLEAR_ERROR:
      return {...state, error: ''};

    default:
      return state;
  };
};

export default exerciseReducer;