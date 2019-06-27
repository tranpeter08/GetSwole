import React from 'react';
import {shallow, mount} from 'enzyme';
import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';
import {UserInfo, mapStateToProps} from './UserInfo';
import {GET_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST} from '../user-actions';

describe('<UserInfo />', () => {
  const middleware = [thunk];
  const mockStore = configMockStore(middleware);
  const auth = {userId: 'testUser'};
  const store = mockStore({auth});
  const defaultProps = {
    user: {
      profile: '',
      loading: '',
      error: ''
    }
  };

  fetch.mockResponse(JSON.stringify({firstName: 'textName'}));

  let defaultWrapper;

  beforeEach(() => {
    store.clearActions();

    defaultWrapper = 
      shallow(<UserInfo dispatch={jest.fn()} {...defaultProps}/>);
  });

  it('renders without crashing', () => {
    shallow(<UserInfo dispatch={jest.fn()} {...defaultProps} />);
  });

  it('dispatches the correct action when mounting', () => {
    const wrapperWithStore = 
      shallow(<UserInfo dispatch={store.dispatch} {...defaultProps}/>);

    const expectedActions = [{type: GET_PROFILE_REQUEST}];
    const wrongActions = [{type: UPDATE_PROFILE_REQUEST}]
    
    expect(store.getActions()).not.toEqual(wrongActions);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('changes state correctly on toggleForm()', () => {
    expect(defaultWrapper.state('edit')).toEqual(false);

    const instance = defaultWrapper.instance();

    instance.toggleForm();
    expect(defaultWrapper.state('edit')).toEqual(true);
   
    instance.toggleForm();
    expect(defaultWrapper.state('edit')).toEqual(false);
  });

  it('renders a component on renderForm()', () => {
    const instance = defaultWrapper.instance();

    let result = instance.renderForm();
    expect(result).toBeNull();

    defaultWrapper.setState({edit: true});
    
    result = instance.renderForm();
    expect(result).not.toBeNull();
  });

  it('renders profile information', () => {
    expect(defaultWrapper.exists('h2')).toBe(false);
    expect(defaultWrapper.exists('.full-height')).toBe(false);
    expect(defaultWrapper.exists('.full-weight')).toBe(false);
    expect(defaultWrapper.exists('.bodyFat')).toBe(false);

    const profile = {
      firstName: 'Jane',
      lastName: 'Doe',
      height: 5,
      heightUnit: 'ft',
      weight: 150,
      weightUnit: 'lb',
      inches: 8,
      bodyFat: 18
    };

    const newProps = {
      user: {
        profile,
        loading: '',
        error: ''
      }
    };

    defaultWrapper.setProps(newProps);

    const {
      firstName, lastName,
      height, inches,
      weight, weightUnit,
      bodyFat
    } = profile;

    expect(defaultWrapper.find('h2').text())
      .toEqual(`Name: ${firstName} ${lastName}`);
    expect(defaultWrapper.find('.full-height').text())
      .toEqual(`${height}' ${inches}"`);
    expect(defaultWrapper.find('.full-weight').text())
      .toEqual(`${weight} ${weightUnit}`);
    expect(defaultWrapper.find('.bodyFat').text())
      .toEqual(`${bodyFat}`);
  });

  it('renders the correct height', () => {
    let profile = {};
    const instance = defaultWrapper.instance();
    const heightVal = profile => instance.normalizeHeight(profile);

    expect(heightVal(profile)).toEqual('');

    profile.height = 4;
    profile.heightUnit = 'ft';

    expect(heightVal(profile)).toEqual(`${profile.height}'`);

    profile.inches = 2;

    expect(heightVal(profile))
      .toEqual(`${profile.height}' ${profile.inches}"`);

    profile.height = '';

    expect(heightVal(profile))
    .toEqual(`${profile.inches}"`);

    profile.height = 80;
    profile.heightUnit = 'cm';

    expect(heightVal(profile))
      .toEqual(`${profile.height} ${profile.heightUnit}`);
  });

  it('renders the correct weight', () => {
    let profile = {};
    const instance = defaultWrapper.instance();
    const weightVal = profile => instance.normalizeWeight(profile);

    expect(weightVal(profile)).toEqual('');

    profile.weight = 150;

    expect(weightVal(profile)).toEqual('');

    profile.weightUnit = 'lb';

    expect(weightVal(profile)).toEqual(`${profile.weight} ${profile.weightUnit}`);

    profile.weightUnit = 'kg';

    expect(weightVal(profile)).toEqual(`${profile.weight} ${profile.weightUnit}`);
    expect(weightVal(profile)).not.toEqual(`${profile.weight}`);
  });

  it('maps the right state to props', () => {
    const state = {
      user: {
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          height: 6,
          heightUnit: 'ft'
        }
      },
      auth: {
        token: 'fakeJWT token'
      }
    };

    const {user, auth} = state;

    expect(mapStateToProps(state)).not.toEqual({auth});
    expect(mapStateToProps(state)).toEqual({user});
  })
});