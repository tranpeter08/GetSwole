import React from 'react';
import {shallow} from 'enzyme';
import {Workout, mapStateToProps} from './Workout';

describe('<Workout />', () => {
  it('should render without crashing', () => {
    shallow(<Workout />);
  });

  it('sets the state on Edit button click', () => {
    const key = 'editing';
    const wrapper = shallow(<Workout />);

    expect(wrapper.state(key)).toBe(false);
    expect(wrapper.exists('.workout-button-container')).toBe(true);

    wrapper.find('.workout-edit-button').simulate('click');

    expect(wrapper.state(key)).toBe(true);
    expect(wrapper.exists('.workout-button-container')).toBe(false);
  });

  it('sets the state on Delete button click', () => {
    const key = 'deleting';
    const wrapper = shallow(<Workout />);

    expect(wrapper.state(key)).toBe(false);
    expect(wrapper.exists('.workout-button-container')).toBe(true);

    wrapper.find('.workout-delete-button').simulate('click');

    expect(wrapper.state(key)).toBe(true);
    expect(wrapper.exists('.workout-button-container')).toBe(false);
  });

  it('maps the correct props from state', () => {
    const state = {auth: {username: 'testUser'}, userId: 'user1234'};
    const props = mapStateToProps(state);

    const {username} = state.auth;
    expect(props).toEqual({username});
  })
})