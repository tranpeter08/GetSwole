'use strict';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {Login} from './Login';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {AUTH_LOGIN_REQUEST} from '../../auth/auth-actions';

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

  it('should render without crashing', ()=> {
      shallow(<Login {...props} />);
  });

  it('onSubmit dispatches the correct actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({auth: {loading: '', error: '', username: ''}})
    let wrapper = shallow(<Login {...props} dispatch={store.dispatch} />),
    username = 'hello123',
    password = 'person123',
    instance = wrapper.instance();

    const expectedActions = [
      {type: AUTH_LOGIN_REQUEST}
    ];
    
    instance.onSubmit({username, password});
    expect(store.getActions()).toEqual(expectedActions);
  })

  it('displays the error if there is an error', () => {
    const wrapper = shallow(<Login {...props} />);
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

  })
});