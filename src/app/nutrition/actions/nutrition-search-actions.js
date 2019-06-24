import {API_BASE_URL} from '../../misc/config';
import {fetchOptions, normalizeRes} from '../../misc/utils';

export const NUTRITION_SEARCH_REQUEST = 'NUTRITION_SEARCH_REQUEST';
export const nutritionSearchReq = () => ({type: NUTRITION_SEARCH_REQUEST});

export const NUTRITION_SEARCH_MORE_REQ = 'NUTRITION_SEARCH_MORE_REQ';
export const nutriSearchMoreReq = () => ({type: NUTRITION_SEARCH_MORE_REQ});

export const NUTRITION_DATA_REQUEST = 'NUTRITION_DATA_REQUEST';
export const nutriDataReq = () => ({type: NUTRITION_DATA_REQUEST})

export const NUTRITION_SEARCH_SUCCESS = 'NUTRITION_SEARCH_SUCCESS';
export const nutriSearchSuccess = results => ({
  type: NUTRITION_SEARCH_SUCCESS,
  results
});

export const NUTRI_SEARCH_MORE_SUCCESS = 'NUTRI_SEARCH_MORE_SUCCESS';
export const nutriSearchMoreSuccess = results => ({
  type: NUTRI_SEARCH_MORE_SUCCESS,
  results
});

export const NUTRITION_ERROR = 'NUTRITION_ERROR';
export const nutritionError = error => ({type: NUTRITION_ERROR, error});

export const getNutrition = term => dispatch => {
  dispatch(nutritionSearchReq());
  return fetch(`${API_BASE_URL}/nutrition?ingr=${term}`,
    fetchOptions('GET')
  )
  .then(normalizeRes)
  .then(results => dispatch(nutriSearchSuccess(results)))
  .catch(error => dispatch(nutritionError(error)));
}

export const getMoreNutri = () => dispatch => {
  dispatch(nutriSearchMoreReq());
  return fetch(`${API_BASE_URL}/nutrition/next`,
    fetchOptions('GET')
  )
  .then(normalizeRes)
  .then(results => dispatch(nutriSearchMoreSuccess(results)))
  .catch(error => dispatch(nutritionError(error)));
}

export const getNutriData = data => dispatch => {
  // dispatch();
}