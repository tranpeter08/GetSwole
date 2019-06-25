import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS,
  getProfileRequest, getProfileSuccess,
  UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS,
  updateProfileRequest, updateProfileSuccess,
  USER_ERROR,
  userError,
  getProfile, updateProfile
} from './user-actions';
import {API_BASE_URL} from '../misc/config';
import {fetchOptions} from '../misc/utils';

describe('user-actions', () => {
  describe('getProfileRequest', () => {

    it('returns the correct string for action GET_PROFILE_REQUEST', () => {
      expect(GET_PROFILE_REQUEST).not.toEqual('GET_PROFILE_SUCCESS');
      expect(GET_PROFILE_REQUEST).toEqual('GET_PROFILE_REQUEST');
    });

    it('returns the correct action for userRequest', () => {
      expect(getProfileRequest()).not.toEqual({type: GET_PROFILE_SUCCESS});
      expect(getProfileRequest()).toEqual({type: GET_PROFILE_REQUEST});
    });
  });

  describe('getProfileSuccess', () => {
    const profile = {username: 'test'};

    it('returns the correct string for action GET_PROFILE_SUCCESS', () => {
      expect(GET_PROFILE_SUCCESS).not.toEqual('GET_PROFILE_REQUEST');
      expect(GET_PROFILE_SUCCESS).toEqual('GET_PROFILE_SUCCESS');
    });

    it('returns the correct action for getProfileSuccess', () => {
      expect(getProfileSuccess()).not.toEqual({type: GET_PROFILE_SUCCESS, username: ''});
      expect(getProfileSuccess()).toEqual({type: GET_PROFILE_SUCCESS});
      expect(getProfileSuccess(profile)).not.toEqual({type: GET_PROFILE_SUCCESS, username: 'test'});
      expect(getProfileSuccess(profile)).toEqual({type: GET_PROFILE_SUCCESS, profile});
    });
  });

  describe('updateProfileRequest', () => {

    it('returns the correct string for action UPDATE_PROFILE_REQUEST', () => {
      expect(UPDATE_PROFILE_REQUEST).not.toEqual('GET_PROFILE_REQUEST');
      expect(UPDATE_PROFILE_REQUEST).toEqual('UPDATE_PROFILE_REQUEST');
    });

    it('returns the correct action for updateProfileRequest', () => {
      expect(updateProfileRequest()).not.toEqual({type: GET_PROFILE_SUCCESS});
      expect(updateProfileRequest()).toEqual({type: UPDATE_PROFILE_REQUEST});
    });
  });

  describe('updateProfileSuccess', () => {
    const profile = {username: 'test'};

    it('returns the correct string for action UPDATE_PROFILE_SUCCESS', () => {
      expect(UPDATE_PROFILE_SUCCESS).not.toEqual('GET_PROFILE_SUCCESS');
      expect(UPDATE_PROFILE_SUCCESS).toEqual('UPDATE_PROFILE_SUCCESS');
    });

    it('returns the correct action for updateProfileSuccess', () => {
      expect(updateProfileSuccess()).not.toEqual({type: GET_PROFILE_SUCCESS});
      expect(updateProfileSuccess()).toEqual({type: UPDATE_PROFILE_SUCCESS});
    });
  });

  describe('userError action creator', () => {
    const USERS_ERROR = 'USERS_ERROR';
    const error = {message: 'test message', code: 400};
    const wrongAction = {type: USERS_ERROR, error: 'test'};


    it('returns the correct string for action USER_ERROR', () => {
      expect(USER_ERROR).not.toEqual(USERS_ERROR);
      expect(USER_ERROR).toEqual('USER_ERROR');
    });

    it('returns the correct action for userRequest', () => {
      expect(userError()).not.toEqual(wrongAction);
      expect(userError()).toEqual({type: USER_ERROR});
      expect(userError(error)).not.toEqual(wrongAction);
      expect(userError(error)).toEqual({type: USER_ERROR, error});
    });
  });

  describe('async actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const userId = 'fakeId1234'
    
    describe('getProfile', () => {
      const profile = {firstname: 'test1', lastName: 'test2'};
      const store = mockStore({auth: {userId}, users: ''});
      beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
      })

      it('returns the correct actions on successful fetch request', () => {
        fetch.mockResponse(JSON.stringify(profile));

        const expectedActions = [
          {type: GET_PROFILE_REQUEST},
          {type: GET_PROFILE_SUCCESS, profile}
        ];
  
        return (
          store.dispatch(getProfile())
            .then(()=> {
              expect(fetch).toHaveBeenCalled();

              const fetchArgs = fetch.mock.calls[0];

              expect(fetchArgs[0])
                .not.toEqual(`${API_BASE_URL}/user/profile/0001`);
              expect(fetchArgs[0])
                .toEqual(`${API_BASE_URL}/users/profile/${userId}`);
              expect(fetchArgs[1])
                .not.toEqual(fetchOptions('POST'));
              expect(fetchArgs[1]).toEqual(fetchOptions('GET'));

              expect(store.getActions()).not.toEqual([]);
              expect(store.getActions()).toEqual(expectedActions);
            })
        );
      });

      it('returns the correct actions on a failed fetch request', () => {
        const error = {message: 'mock error'};
  
        fetch.mockReject(error);
  
        const expectedActions = [
          {type: GET_PROFILE_REQUEST},
          {type: USER_ERROR, error}
        ];

        const wrongActions = [
          {type: GET_PROFILE_REQUEST},
          {type: USER_ERROR, profile: error}
        ];
  
        return store.dispatch(getProfile())
          .then(() => {
            expect(store.getActions()).not.toEqual(wrongActions);
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    describe('updateProfile', () => {
      const profile = {firstName: 'test1', lastName: 'test2'};
      const newProfile = {firstName: 'testA', lastName: 'testB'};
      const store = mockStore({
        auth: {userId},
        users: profile
      });

      beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
      });

      it('returns the correct actions on successful fetch request', () => {
        fetch.mockResponse(JSON.stringify(newProfile));

        const expectedActions = [
          {type: UPDATE_PROFILE_REQUEST},
          {type: UPDATE_PROFILE_SUCCESS},
          {type: GET_PROFILE_REQUEST}
        ];

        const wrongActions = [
          {type: UPDATE_PROFILE_REQUEST},
          {type: GET_PROFILE_SUCCESS, profile}
        ];

        return store.dispatch(updateProfile(newProfile))
          .then(() => {
            expect(fetch).toHaveBeenCalled();

            const fetchArgs = fetch.mock.calls[0];

            expect(fetchArgs[0])
              .not.toEqual(`${API_BASE_URL}/user/profile/${userId}`);
            expect(fetchArgs[0])
              .toEqual(`${API_BASE_URL}/users/profile/${userId}`);
            expect(fetchArgs[1]).not.toEqual(fetchOptions('POST', newProfile));
            expect(fetchArgs[1]).toEqual(fetchOptions('PUT', newProfile));

            expect(store.getActions()).not.toEqual(wrongActions);
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('returns the correct actions on a failed fetch request', () => {
        const error = {message: 'fake error message'};

        fetch.mockReject(error);

        const expectedActions = [
          {type: UPDATE_PROFILE_REQUEST},
          {type: USER_ERROR, error}
        ];

        const wrongActions = [
          {type: UPDATE_PROFILE_REQUEST},
          {type: UPDATE_PROFILE_SUCCESS},
          {type: GET_PROFILE_REQUEST}
        ];

        return store.dispatch(updateProfile(newProfile))
          .then(() => {

            expect(store.getActions()).not.toEqual(wrongActions);  
            expect(store.getActions()).toEqual(expectedActions);
          })
      });
    });
  });
});