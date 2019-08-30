import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {shallow, mount} from 'enzyme';
import Routes from './Routes';
import {config} from './config';

describe('<Routes />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Routes />);

    expect(wrapper).toMatchSnapshot();
  });

  it('contains the correct number of routes', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper.children()).toHaveLength(config.length);
  });
})