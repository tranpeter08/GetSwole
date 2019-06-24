import {
  NUTRITION_DETAIL_REQUEST,
  NUTRITION_DETAIL_SUCCESS,
  NUTRITION_DETAIL_ERROR
} from '../actions/nutrition-detail-actions';

const initialState = {
  loading: false,
  data: '',
  error: ''
};

export const nutriDetailReducer = (
  state = initialState, 
  {type, data, error}
) => {

  switch(type) {
    case NUTRITION_DETAIL_REQUEST:
      return {...state, loading: true};
    case NUTRITION_DETAIL_SUCCESS:
      return {...state, loading: false, data};
    case NUTRITION_DETAIL_ERROR:
      return {...state, loading: false, error};
    default:
      return state;
  }
};

export default nutriDetailReducer;