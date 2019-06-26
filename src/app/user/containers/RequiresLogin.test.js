import React from 'react';
import {shallow, mount} from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {MemoryRouter, Redirect} from 'react-router-dom';
import requiresLogin from './RequiresLogin';

describe('<RequiresLogin />', () => {
  const Component = props => <div className='test-component'>Test Component</div>
  const TestComponent = requiresLogin(Component);

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it('renders the correct component if authenticating', () => {
    const state = {
      auth: {
        token: '',
        loading: true,
        error: ''
      }
    };

    const store = mockStore(state);
    const wrapper = mount(<MemoryRouter><TestComponent store={store} /></MemoryRouter>);

    expect(wrapper).not.toBeNull();
    expect(wrapper.contains(<Redirect to='/' push={false} />)).toBe(false);
    expect(wrapper.exists('.reqLogin-error')).toBe(false);
    expect(wrapper.exists('.authenticating')).toBe(true);
    expect(wrapper.exists('.test-component')).toBe(false);
  });

  it('renders the correct component if there is an error', () => {
    const state = {
      auth: {
        token: '',
        loading: false,
        error: {message: 'fake error'}
      }
    };

    const store = mockStore(state);
    const wrapper = mount(<MemoryRouter><TestComponent store={store} /></MemoryRouter>);

    expect(wrapper).not.toBeNull();
    expect(wrapper.contains(<Redirect to='/' push={false} />)).toBe(false);
    expect(wrapper.exists('.reqLogin-error')).toBe(true);
    expect(wrapper.exists('.authenticating')).toBe(false);
    expect(wrapper.exists('.test-component')).toBe(false);
  });

  it('renders the correct component if there is an auth token', () => {
    const state = {
      auth: {
        token: 'fakeJWT',
        loading: false,
        error: ''
      }
    };

    const store = mockStore(state);
    const wrapper = mount(<MemoryRouter><TestComponent store={store} /></MemoryRouter>);

    expect(wrapper).not.toBeNull();
    expect(wrapper.contains(<Redirect to='/' push={false} />)).toBe(false);
    expect(wrapper.exists('.reqLogin-error')).toBe(false);
    expect(wrapper.exists('.authenticating')).toBe(false);
    expect(wrapper.exists('.test-component')).toBe(true);
  });

  it('renders the correct component if an auth token is not stored', () => {
    const state = {
      auth: {
        token: '',
        loading: false,
        error: ''
      }
    };

    const store = mockStore(state);
    const wrapper = 
      mount(<MemoryRouter><TestComponent store={store} /></MemoryRouter>);

      expect(wrapper).not.toBeNull();
      expect(wrapper.contains(<Redirect to='/' push={false} />)).toBe(true);
      expect(wrapper.exists('.reqLogin-error')).toBe(false);
      expect(wrapper.exists('.authenticating')).toBe(false);
      expect(wrapper.exists('.test-component')).toBe(false);
  });
});