import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {AUTH_CREATE_USER_REQUEST, AUTH_LOGIN_REQUEST} from '../../auth/auth-actions';
import {Register, mapStateToProps} from './Register';

describe('<Register />', () => {
  let props,
    wrapper;

  beforeAll(() => {
    props = { 
      heightUnitValue: '', 
      handleSubmit: jest.fn(),
      pristine: true,
      submitting: false,
      user: {
        error: '', 
        loading: false, 
        username: ''
      }
    };

    wrapper = shallow(<Register {...props} />);
  });

  
  it('renders without crashing', () => {
    shallow(<Register {...props}/>)
  });

  it('dispatches the correct actions on onSubmit', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    const wrapperWithStore = shallow(<Register dispatch={store.dispatch} {...props}/>);

    wrapperWithStore.instance().onSubmit({});

    const expectedActions = [
      {type: AUTH_CREATE_USER_REQUEST}
    ];

    const wrongActions = [
      {type: AUTH_LOGIN_REQUEST}
    ];

    expect(store.getActions()).not.toEqual(wrongActions);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('redirects once a user is logged in', () => {

    let newProps = {
      user : {
        username: 'testUser',
        error: '',
        loading: false
      }
    };

    expect(wrapper.exists('.register-main')).toBe(true);

    wrapper.setProps(newProps);
    expect(wrapper.exists('.register-main')).toBe(false);
  });

  it('displays an error if there is an error', () => {
    const error = {
      message: 'test message',
      location: ['Field 1'],
      reason: 'serverError'
    };

    const newProps = {
      user: {
        error,
        username: '',
        loading: false
      }
    };

    const _errorMessage = `* ${error.message} at ${error.location[0]}`;

    expect(wrapper.exists('.error')).toBe(false);

    wrapper.setProps(newProps);

    let errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toEqual(_errorMessage);
  });

  it('maps the correct props from store', () => {

    const mockState = {
      auth: {
        username: 'tester',
      },
      user: {
        loading: false,
        error: ''
      }
    };

    const {auth: {username}, user: {loading, error}} = mockState;

    const _mappedProps = {
      heightUnitValue: undefined,
      user: {
        username,
        loading,
        error
      }
    };
    
    
    expect(mapStateToProps(mockState)).toEqual(_mappedProps);
  });
});