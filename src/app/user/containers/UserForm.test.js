import React from 'react';
import {shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {UserForm, mapStateToProps} from './UserForm';
import SuccessStatus from '../../misc/components/SuccessStatus';
import ErrorMessage from '../../misc/components/ErrorMessage';
import {UPDATE_PROFILE_REQUEST} from '../user-actions';

describe('<UserForm />', () => {
  const props = {
    user: {
      profile: '',
      loading: false,
      error: ''
    },
    handleSubmit: jest.fn(),
    toggleForm: jest.fn()
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserForm {...props} />)
  })

  it('should render without crashing', () => {
    shallow(<UserForm {...props} />);
  });

  it('dispatches the correct actions on onSubmit', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const authState = {userId: 'testUser1234', username: 'testUser'}
    const store = mockStore({auth: authState});

    fetch.mockResponse(JSON.stringify({firstName: 'test'}));

    const wrapperWithStore = 
      shallow(<UserForm  dispatch={store.dispatch} {...props}/>);

    wrapperWithStore.instance().onSubmit({firstName: 'peter'});

    const expectedActions = [{type: UPDATE_PROFILE_REQUEST}];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('renders the right component on state change', () => {
    const successStatus = <SuccessStatus toggleForm={props.toggleForm} />;

    expect(wrapper.exists('#profile-form')).toEqual(true);

    wrapper.setState({success: true});

    expect(wrapper.contains(successStatus)).toEqual(true);
  });

  it('displays an error if there is an error', () => {
    const newProps = {
      user: {
        profile: '',
        loading: false,
        error: {message: 'fake error'}
      },
      handleSubmit: jest.fn(),
      toggleForm: jest.fn()
    };

    const errorComponent = <ErrorMessage message="fake error" />

    wrapper.setProps(newProps);

    expect(wrapper.contains(errorComponent)).toEqual(true);
  })
});