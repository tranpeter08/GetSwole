'use strict';
import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Login, mapStateToProps} from './Login';
import {AUTH_LOGIN_REQUEST, AUTH_CREATE_USER_REQUEST} from '../../auth/auth-actions';

describe('<Login />', () => {

  const props = {
    auth: {
      error: '',
      username: '',
      loading: ''
    },
    handleSubmit: jest.fn(),
    dispatch: jest.fn(),
    invalid: false
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login {...props} />);

  });

  it('should render without crashing', ()=> {
      shallow(<Login {...props} />);
  });

  it('onSubmit dispatches the correct actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({auth: {loading: '', error: '', username: ''}})
    const wrapperWithStore = shallow(<Login {...props} dispatch={store.dispatch} />),
    username = 'hello123',
    password = 'person123',
    instance = wrapperWithStore.instance();

    const expectedActions = [{type: AUTH_LOGIN_REQUEST}];

    const wrongActions = [{type: AUTH_CREATE_USER_REQUEST}];
    
    instance.onSubmit({username, password});

    expect(store.getActions()).not.toEqual(wrongActions);
    expect(store.getActions()).toEqual(expectedActions);
  })

  it('displays the error if there is an error', () => {
    expect(wrapper.exists('.error')).toBe(false);
    
    const authErr = {
      auth: {
        error: {
          message: 'test error message'
        }
      },
      invalid: true
    };

    wrapper.setProps(authErr);
    expect(wrapper.exists('.error')).toBe(true);

    let errorMessage = wrapper.find('.error');
    expect(errorMessage.text().includes(authErr.auth.error.message)).toBe(true);

  });

  it('redirects once user is logged in', () => {
    const mainClass = '.login-main';

    expect(wrapper.exists(mainClass)).toBe(true);

    wrapper.setProps({auth: {username: 'testUser', error: ''}});
    expect(wrapper.exists(mainClass)).toBe(false);
  });

  it('maps the correct props from store', () => {
      const state = { 
        auth: {
          username: 'testUser',
          userId: 'user1234',
          token: 'fakeJWT',
          loading: false,
          error: ''
      }};

      const {auth: {token, ...expectedProps}}  = state;

      expect(mapStateToProps(state)).not.toEqual({auth: state.auth});
      expect(mapStateToProps(state)).toEqual({auth: expectedProps});
  });
});