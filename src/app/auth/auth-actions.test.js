import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {SubmissionError} from 'redux-form';
import {
  AUTH_LOGIN_REQUEST, AUTH_CREATE_USER_REQUEST, AUTH_REFRESH_REQUEST,
  authLoginRequest, authCreateUserReq, authRefreshRequest,
  AUTH_SET, AUTH_CLEAR,
  authSet, authClear,
  AUTH_SUCCESS, AUTH_ERROR,
  authSuccess, authError,
  logIn, createUser, authPersist, 
} from './auth-actions';
import {API_BASE_URL} from '../misc/config';
import {fetchOptions, TEST_AUTH_TOKEN} from '../misc/utils';

describe('auth-actions', () => {
  describe('authLoginRequest', () => {
    it('returns the correct string for AUTH_LOGIN_REQUEST', () => {
      expect(AUTH_LOGIN_REQUEST).toEqual('AUTH_LOGIN_REQUEST');
      expect(AUTH_LOGIN_REQUEST).not.toEqual('AUTH_SUCCESS');
    });

    it('returns the correct action', () => {
      const expectedAction = {type: AUTH_LOGIN_REQUEST};
      const wrongAction = {type: AUTH_SUCCESS};

      expect(authLoginRequest()).toEqual(expectedAction);
      expect(authLoginRequest()).not.toEqual(wrongAction);
    });
  });

  describe('authCreateUserReq', () => {
    it('returns the correct string for AUTH_CREATE_USER_REQUEST', () => {
      expect(AUTH_CREATE_USER_REQUEST).toEqual('AUTH_CREATE_USER_REQUEST');
      expect(AUTH_CREATE_USER_REQUEST).not.toEqual('AUTH_SUCCESS');
    });

    it('returns the correct action', () => {
      const expectedAction = {type: AUTH_CREATE_USER_REQUEST};
      const wrongAction = {type: AUTH_SUCCESS};

      expect(authCreateUserReq()).toEqual(expectedAction);
      expect(authCreateUserReq()).not.toEqual(wrongAction);
    });
  });

  describe('authRefreshRequest', () => {
    it('returns the correct string for AUTH_CREATE_USER_REQUEST', () => {
      expect(AUTH_REFRESH_REQUEST).toEqual('AUTH_REFRESH_REQUEST');
      expect(AUTH_REFRESH_REQUEST).not.toEqual('AUTH_SUCCESS');
    });

    it('returns the correct action', () => {
      const expectedAction = {type: AUTH_REFRESH_REQUEST};
      const wrongAction = {type: AUTH_SUCCESS};

      expect(authRefreshRequest()).toEqual(expectedAction);
      expect(authRefreshRequest()).not.toEqual(wrongAction);
    });
  });

  describe('authSet', () => {
    it('returns the correct string for AUTH_SET', () => {
      expect(AUTH_SET).toEqual('AUTH_SET');
      expect(AUTH_SET).not.toEqual('AUTH_SUCCESS');
    });

    it('returns the correct action', () => {
      const token = '123456';
      const expectedAction = {
        type: AUTH_SET,
        token
      };
      const wrongAction = {type: AUTH_SET};

      expect(authSet(token)).toEqual(expectedAction);
      expect(authSet(token)).not.toEqual(wrongAction);
    });
  });

  describe('authClear', () => {
    it('returns the correct string for AUTH_CLEAR', () => {
      expect(AUTH_CLEAR).toEqual('AUTH_CLEAR');
      expect(AUTH_CLEAR).not.toEqual('AUTH_SUCCESS');
    });

    it('returns the correct action', () => {
      const expectedAction = {type: AUTH_CLEAR};
      const wrongAction = {type: AUTH_SUCCESS};

      expect(authClear()).toEqual(expectedAction);
      expect(authClear()).not.toEqual(wrongAction);
    });
  });

  describe('authSuccess', () => {
    it('returns the correct string for AUTH_CLEAR', () => {
      expect(AUTH_SUCCESS).toEqual('AUTH_SUCCESS');
      expect(AUTH_SUCCESS).not.toEqual('AUTH_CLEAR');
    });

    it('returns the correct action', () => {
      const username = 'test1';
      const userId = '1234abcd';
      const expectedAction = {
        type: AUTH_SUCCESS,
        username,
        userId
      };
      const wrongAction = {type: AUTH_SUCCESS};

      expect(authSuccess(username, userId)).toEqual(expectedAction);
      expect(authSuccess(username, userId)).not.toEqual(wrongAction);
    });
  });

  describe('authError', () => {
    it('returns the correct string for AUTH_CLEAR', () => {
      expect(AUTH_ERROR).toEqual('AUTH_ERROR');
      expect(AUTH_ERROR).not.toEqual('AUTH_SUCCESS');
    });

    it('returns the correct action', () => {
      const error = {message: 'fake error'};
      const expectedAction = {
        type: AUTH_ERROR,
        error
      };
      const wrongAction = {type: AUTH_ERROR};

      expect(authError(error)).toEqual(expectedAction);
      expect(authError(error)).not.toEqual(wrongAction);
    });
  });

  describe('async actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    
    const username = 'testUser';
    const password = 'testPassword';
    const userId = 'testUser1234';
    const authToken = TEST_AUTH_TOKEN;

    describe('logIn', () => {
      const store = mockStore();

      afterEach(() => {
        fetch.resetMocks();
        store.clearActions();
      })

      it('returns the corrects actions on a successful fetch request', () => {
        fetch.mockResponse(JSON.stringify({authToken}));

        const expectedActions = [
          {type: AUTH_LOGIN_REQUEST},
          {type: AUTH_SET, token: authToken},
          {type: AUTH_SUCCESS, username, userId}
        ];

        const wrongActions = [
          {type: AUTH_LOGIN_REQUEST},
          {type: AUTH_SET, token: authToken + 'opps'},
          {type: AUTH_SUCCESS, username}
        ];

        return store.dispatch(logIn(username, password))
          .then(() => {
            expect(fetch).toHaveBeenCalled();

            const fetchArgs = fetch.mock.calls[0];

            expect(fetchArgs[0]).not.toEqual(`${API_BASE_URL}/auth/refresh`);
            expect(fetchArgs[0]).toEqual(`${API_BASE_URL}/auth/login`);
            expect(fetchArgs[1])
              .not.toEqual(fetchOptions('GET', {username, password}, true));
            expect(fetchArgs[1])
              .toEqual(fetchOptions('POST', {username, password}, true));

            expect(store.getActions()).not.toEqual(wrongActions);
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('returns the correct actions on a failed fetch request', () => {
        const error = {message: 'username already being used', code: 400};
        fetch.mockReject(error);

        const expectedActions = [
          {type: AUTH_LOGIN_REQUEST},
          {type: AUTH_ERROR, error}
        ];

        const wrongActions = [
          {type: AUTH_LOGIN_REQUEST},
          {type: AUTH_SET, token: authToken},
          {type: AUTH_SUCCESS, username, userId}
        ];

        return store.dispatch(logIn(username, password))
          .then(() => {
            expect(store.getActions()).not.toEqual(wrongActions);
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    describe('createUser', () => {
      const store = mockStore();
      const newUser = {username, password};

      afterEach(() => {
        fetch.resetMocks();
        store.clearActions();
      })

      it('returns the correct actions on a successful fetch request', () => {
        fetch.mockResponse(JSON.stringify({authToken}));

        const expectedActions = [
          {type: AUTH_CREATE_USER_REQUEST},
          {type: AUTH_SET, token: authToken},
          {type: AUTH_SUCCESS, username, userId}
        ];

        const wrongActions = [
          {type: AUTH_CREATE_USER_REQUEST},
          {type: AUTH_SET, token: authToken},
          {type: AUTH_SUCCESS, userId}
        ];

        return (
          store.dispatch(createUser(newUser))
            .then(() => {
              expect(fetch).toHaveBeenCalled();

              const fetchArgs = fetch.mock.calls[0];

            expect(fetchArgs[0]).not.toEqual(`${API_BASE_URL}/auth/login`);
            expect(fetchArgs[0]).toEqual(`${API_BASE_URL}/users`);
            expect(fetchArgs[1])
              .not.toEqual(fetchOptions('PUT', newUser, true));
            expect(fetchArgs[1])
              .toEqual(fetchOptions('POST', newUser, true));

              expect(store.getActions()).not.toEqual(wrongActions);
              expect(store.getActions()).toEqual(expectedActions);
            })
        );
      });

      it('returns the correct actions on a failed fetch request', () => {
        const error = {message: 'incorrect password', code: 400};
        fetch.mockReject(error);

        const expectedActions = [
          {type: AUTH_CREATE_USER_REQUEST},
          {type: AUTH_ERROR, error}
        ];

        const wrongActions = [
          {type: AUTH_CREATE_USER_REQUEST},
          {type: AUTH_SET, token: authToken},
          {type: AUTH_SUCCESS, username, userId}
        ];

        return store.dispatch(createUser(newUser))
          .then(() => {
            expect(store.getActions()).not.toEqual(wrongActions);
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });
});