import React from 'react';
import {shallow} from 'enzyme';

import {RecipeSrchForm} from './RecipeSearchForm';

describe('<RecipeSrchForm />', () => {
  const handleChange = jest.fn();
  
  const handleSubmit = jest.fn();

  const defaultProps = {
    recipesterm: '', 
    handleChange, 
    handleSubmit, 
    loading: false
  };

  it('renders without crashing', () => {
    shallow(<RecipeSrchForm {...defaultProps} />);
  });
});