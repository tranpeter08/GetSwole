import {
  NUTRITION_SEARCH_REQUEST,
  NUTRITION_SEARCH_MORE_REQ,
  NUTRITION_SEARCH_SUCCESS,
  NUTRI_SEARCH_MORE_SUCCESS,
  NUTRITION_ERROR
} from '../actions/nutrition-search-actions';

const initialState = {
  loading: false,
  text: '',
  results: '',
  hasNext: false,
  error: ''
};

export const nutriReducer = (
  state = initialState, 
  {type, results = {}, error}
) => {

  const {text, hints, hasNext} = results;

  switch(type) {
    case NUTRITION_SEARCH_REQUEST:
      return {...state, loading: true, text: '', results: ''};
    case NUTRITION_SEARCH_MORE_REQ:
      return {...state, loading: true};
    case NUTRITION_SEARCH_SUCCESS:
      return {
        ...state, 
        loading: false, 
        text, 
        results: hints, 
        hasNext, 
        error: ''
      };
    case NUTRI_SEARCH_MORE_SUCCESS:
      const [first, ...rest] = hints;
      return {
        ...state,
        loading: false,
        results: [...state.results, ...rest], 
        hasNext
      };
    case NUTRITION_ERROR:
      return {...state, hasNext: false, error};
    default:
      return state;
  }
};

export default nutriReducer;