import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';
import {
  getNutrition,
  getMoreNutri,
} from './nutrition-search-actions';
import {API_BASE_URL} from '../../misc/config';
import {fetchOptions} from '../../misc/utils';

describe('nutrition search async actions', () => {
  const searchReq = 'NUTRITION_SEARCH_REQUEST';
  const searchSuccess = 'NUTRITION_SEARCH_SUCCESS';
  const searchResults = [1,2,3,4];

  const searchMoreReq = 'NUTRITION_SEARCH_MORE_REQ';
  const searchMoreSuccess = 'NUTRI_SEARCH_MORE_SUCCESS';
  const searchMoreResults = [5,6,7,8];

  const errStr = 'NUTRITION_ERROR';
  const error = {message: 'mock error'};

  const mockStore = configMockStore([thunk]);

  describe('getNutrition', () => {
    const term = 'test';
    const url = `${API_BASE_URL}/nutrition?ingr=${term}`;
    const store = mockStore({});

    afterEach(() => {
      store.clearActions();
      fetch.mockReset();
    })

    it('dispatches the correct actions on successful fetch request', () => {
      const expectedActions = [
        {type: searchReq},
        {type: searchSuccess, results: searchResults}
      ];

      fetch.mockResponse(JSON.stringify(searchResults));

      return store.dispatch(getNutrition(term))
        .then(() => {
          const fetchArgs = fetch.mock.calls[0];

          expect(fetch).toHaveBeenCalled();
          expect(fetchArgs[0]).toEqual(url);
          expect(fetchArgs[1]).toEqual(fetchOptions('GET'));

          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches the correct actions on a failed request', () => {
      const expectedActions = [
        {type: searchReq},
        {type: errStr, error}
      ];

      fetch.mockReject(error);

      return store.dispatch(getNutrition(term))
        .then(() => {
          expect(fetch).toHaveBeenCalled();

          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getMoreNutri', () => {
    const store = mockStore({});
    const url = `${API_BASE_URL}/nutrition/next`;

    afterEach(() => {
      store.clearActions();
      fetch.mockReset();
    });

    it('dispatches the correct acitons on a successful request', () => {
      const expectedActions = [
        {type: searchMoreReq},
        {type: searchMoreSuccess, results: searchMoreResults}
      ];

      fetch.mockResponse(JSON.stringify(searchMoreResults));

      return store.dispatch(getMoreNutri())
        .then(() => {
          const fetchArgs = fetch.mock.calls[0];

          expect(fetch).toHaveBeenCalled();
          expect(fetchArgs[0]).toEqual(url);
          expect(fetchArgs[1]).toEqual(fetchOptions('GET'));

          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches the correct actions on a failed request', () => {
      const expectedActions = [
        {type: searchMoreReq},
        {type: errStr, error}
      ];

      fetch.mockReject(error);

      return store.dispatch(getMoreNutri())
        .then(() => {
          expect(fetch).toHaveBeenCalled();

          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});