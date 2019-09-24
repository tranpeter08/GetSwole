import {
  NUTRITION_DETAIL_REQUEST,
  NUTRITION_DETAIL_SUCCESS,
  NUTRITION_DETAIL_ERROR
} from '../actions/nutrition-detail-actions';
import {initialState, nutriDetailReducer} from './nutrition-details-reducer';

describe('nutrition-details-reducer', () => {
  const expectInitState = {
    loading: false,
    data: '',
    error: ''
  }

  it('has initial state', () => {
    expect(initialState).toEqual(expectInitState);
  });

  it('returns the correct state', () => {
    const req = {type: NUTRITION_DETAIL_REQUEST};
    const loadingState = {
      loading: true,
      data: '',
      error: ''
    };

    const data = {message: 'foo'};
    const success = {
      type: NUTRITION_DETAIL_SUCCESS,
      data
    };
    const successState = {
      loading: false,
      data,
      error: ''
    };

    const error = {message: 'DANGER'};
    const err = {
      type: NUTRITION_DETAIL_ERROR,
      error
    };
    const errState = {
      loading: false,
      data: '',
      error
    }
    
    expect(nutriDetailReducer(undefined, {})).toEqual(expectInitState);
    expect(nutriDetailReducer(undefined, req)).toEqual(loadingState);

    expect(nutriDetailReducer(undefined, success)).not.toEqual(loadingState);
    expect(nutriDetailReducer(undefined, success)).toEqual(successState);

    expect(nutriDetailReducer(undefined, err)).not.toEqual(loadingState);
    expect(nutriDetailReducer(undefined, err)).toEqual(errState);
  });
});