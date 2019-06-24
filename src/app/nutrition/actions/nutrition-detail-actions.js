import {API_BASE_URL} from '../../misc/config';
import {fetchOptions, normalizeRes} from '../../misc/utils';

export const NUTRITION_DETAIL_REQUEST = 'NUTRITION_DETAIL_REQUEST';
export const nutritionDetailReq = () => ({type: NUTRITION_DETAIL_REQUEST});

export const NUTRITION_DETAIL_SUCCESS = 'NUTRITION_DETAIL_SUCCESS';
export const nutriDetailSuccess = data => ({
  type: NUTRITION_DETAIL_SUCCESS,
  data
});

export const NUTRITION_DETAIL_ERROR = 'NUTRITION_DETAIL_ERROR';
export const nutriDetailError = error => ({type: NUTRITION_DETAIL_ERROR, error});

export const getNutriData = data => dispatch => {
  dispatch(nutritionDetailReq());
  return fetch(`${API_BASE_URL}/nutrition`,
    fetchOptions('POST', data)
  )
  .then(normalizeRes)
  .then(res => dispatch(nutriDetailSuccess(res)))
  .catch(error => dispatch(nutriDetailError(error)));
}