import userReducer from './user-reducer'; 
import {
  getProfileRequest, getProfileSuccess,
  updateProfileRequest, updateProfileSuccess,
  userError
} from './user-actions';

describe('userReducer', () => {
  const initialState = {
    loading: false,
    error: '',
    profile: ''
  };

  let expectedState;

  beforeEach(() => {
    expectedState = {...initialState};
  });

  it('returns the correct initial state', () => {
    const wrongState = {
      loading: false,
      error: null,
      profile: null
    };

    expect(userReducer(undefined, {})).not.toEqual(wrongState);
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('returns the correct state on getProfileRequest', () => {
    expectedState.loading = true;

    const state = userReducer(undefined, getProfileRequest());

    expect(state).not.toEqual(initialState);
    expect(state).toEqual(expectedState);
  });

  it('returns the correct state on getProfileSuccess', () => {
    const profile = {firstName: 'test1', lastName: 'test2'};
    expectedState.profile = profile;

    const state = userReducer(undefined, getProfileSuccess(profile));

    expect(state).not.toEqual(initialState);
    expect(state).toEqual(expectedState);
  });

  it('returns the correct state on userError', () => {
    const error = {message: 'fake error'};
    expectedState.error = error;

    const state = userReducer(undefined, userError(error));

    expect(state).not.toEqual(initialState);
    expect(state).toEqual(expectedState);
  })
});