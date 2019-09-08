import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';
import {
  NUTRITION_DETAIL_REQUEST, nutritionDetailReq,
  NUTRITION_DETAIL_SUCCESS, nutriDetailSuccess,
  NUTRITION_DETAIL_ERROR, nutriDetailError,
  getNutriData
} from './nutrition-detail-actions';
import {API_BASE_URL} from '../../misc/config';
import {fetchOptions} from '../../misc/utils';

export function testActionCreator(string, actionType, creator, args, expectedAction) {
  it('contains correct action type string', () => {
    expect(actionType).toEqual(string);
  });

  it('returns the correct action', () => {
    expect(creator(args)).toEqual(expectedAction);
  });
}

describe('nutrition-detail-actions', () => {
  const reqStr = 'NUTRITION_DETAIL_REQUEST';
  const successStr = 'NUTRITION_DETAIL_SUCCESS';
  const errStr = 'NUTRITION_DETAIL_ERROR';
  const data = {message: 'OK'};
  const error = {message: 'request failed'};

  describe('nutritionDetailReq', () => {
    const expectedAction = {
      type: reqStr
    };

    testActionCreator(
      reqStr, 
      NUTRITION_DETAIL_REQUEST, 
      nutritionDetailReq, 
      null, 
      expectedAction
    );
  });

  describe('nutriDetailSuccess', () => {
    
    const expectedAction = {
      type: successStr,
      data
    };

    testActionCreator(
      successStr,
      NUTRITION_DETAIL_SUCCESS,
      nutriDetailSuccess,
      data,
      expectedAction
    );
  });

  describe('nutriDetailError', () => {
    
    const expectedAction = {
      type: errStr,
      error
    };

    testActionCreator(
      errStr,
      NUTRITION_DETAIL_ERROR,
      nutriDetailError,
      error,
      expectedAction
    );
  });
});