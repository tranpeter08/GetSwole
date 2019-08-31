import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';
import {
  NUTRITION_SEARCH_REQUEST, nutritionSearchReq,
  NUTRITION_SEARCH_SUCCESS, nutriSearchSuccess,
  NUTRITION_SEARCH_MORE_REQ, nutriSearchMoreReq,
  NUTRI_SEARCH_MORE_SUCCESS, nutriSearchMoreSuccess,
  NUTRITION_DATA_REQUEST, nutriDataReq,
  NUTRITION_ERROR, nutritionError
} from './nutrition-search-actions';
import {testActionCreator} from './nutrition-detail-actions.test';

describe('nutrition-search-actions', () => {
  const searchReq = 'NUTRITION_SEARCH_REQUEST';
  const searchSuccess = 'NUTRITION_SEARCH_SUCCESS';
  const searchResults = [1,2,3,4];

  const searchMoreReq = 'NUTRITION_SEARCH_MORE_REQ';
  const searchMoreSuccess = 'NUTRI_SEARCH_MORE_SUCCESS';
  const searchMoreResults = [5,6,7,8];

  const errStr = 'NUTRITION_ERROR';
  const error = {message: 'mock error'};

  describe('nutritionSearchReq', () => {
    const expectedAction = {
      type: searchReq
    };

    testActionCreator(
      searchReq, 
      NUTRITION_SEARCH_REQUEST,
      nutritionSearchReq,
      null,
      expectedAction
    );
  });

  describe('nutriSearchSuccess', () => {
    const expectedAction = {
      type: searchSuccess,
      results: searchResults
    };

    testActionCreator(
      searchSuccess,
      NUTRITION_SEARCH_SUCCESS,
      nutriSearchSuccess,
      searchResults,
      expectedAction
    );
  });
});