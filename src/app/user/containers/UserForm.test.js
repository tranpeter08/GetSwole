import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {UserForm, mapStateToProps} from './UserForm';

describe('<UserForm />', () => {
  const props = {
    user: {
      profile: '',
      loading: false,
      error: ''
    },
    handleSubmit: jest.fn()
  };

  it('should render without crashing', () => {
    shallow(<UserForm {...props} />)
  })
})