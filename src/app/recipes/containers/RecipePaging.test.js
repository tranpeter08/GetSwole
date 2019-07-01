import React from 'react';
import {shallow} from 'enzyme';

import {Pagination} from './RecipePaging';

describe('<Pagination />', () => {
  const recipes = {
    from: '', 
    to: '', 
    more: '', 
    count: '', 
    loading: false
  }; 

  const handlePaging = jest.fn();

  const defaultProps = {
    recipes,
    handlePaging
  };

  it('renders without crashing', () => {
    shallow(<Pagination {...defaultProps} />);
  });
});