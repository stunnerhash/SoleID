import React from 'react';
import './searchbar.css';
import { ScanIcon, SearchIcon } from '../../assets';

function SearchBar() {
  return (
    <div className='searchbar-wrapper'>
      <input
        className='searchbar'
        placeholder='search for an organisation'
      />
      <img src={SearchIcon} className='searchimg'></img>
    </div>
  )

}

export default SearchBar