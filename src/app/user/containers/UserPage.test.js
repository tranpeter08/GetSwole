// create router around test component
import React from 'react';
import {shallow} from 'enzyme';
import {UserPage} from './UserPage';

describe('<UserPage />', () => {
  it('renders without crashing', () => {
    const props = {
      match : {
        path: '/'
      }
    }
    shallow(<UserPage {...props} />)
  });
})