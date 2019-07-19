import React from 'react';
import Spinner from './Spinner';

export default function SearchLoading() {
  const styling = {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    padding: '1rem'
  };

  return <div style={styling}>
    <Spinner height='40px' color='#00afff' />
    <p className='nutri-search-message'>Searching...</p>
  </div>
}