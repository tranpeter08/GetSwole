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

describe('nutrtion detail async actions', () => {
  const reqStr = 'NUTRITION_DETAIL_REQUEST';
  const successStr = 'NUTRITION_DETAIL_SUCCESS';
  const errStr = 'NUTRITION_DETAIL_ERROR';
  const data = {message: 'OK'};
  const error = {message: 'request failed'};
  
  describe('getNutriData', () => {
    const userId = 'userId';
    const mockStore = configMockStore([thunk]);
    const store = mockStore({auth : {userId}});
    const query = {test: 'test'};
    const url = `${API_BASE_URL}/nutrition`;


    afterEach(() => {
      store.clearActions();
      fetch.mockReset();
    });

    it('dispatches correct actions on successful request', () => {
      const expectedActions = [
        {type: reqStr},
        {type: successStr, data}
      ];

      fetch.mockResponse(JSON.stringify(data));

      return store.dispatch(getNutriData(query))
        .then(() => {
          
          expect(fetch).toHaveBeenCalled();

          const fetchArgs = fetch.mock.calls[0];

          expect(fetchArgs[0]).toEqual(url);
          expect(fetchArgs[1]).toEqual(fetchOptions('POST', query));

          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches correct actions on failed request', () => {
      const expectedActions = [
        {type: reqStr},
        {type: errStr, error}
      ];

      fetch.mockReject(error);

      return store.dispatch(getNutriData(query))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});