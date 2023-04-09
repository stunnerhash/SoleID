import React from 'react';
import './searchbar.css';
import { ScanIcon, SearchIcon } from '../../assets';

function SearchBar(props) {
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    props.onQueryChange(newQuery);
  }
  return (
    <div className='searchbar-wrapper'>
      <input
        className='searchbar'
        placeholder='search for an organisation'
        onChange={handleInputChange}
      />
      <img src={SearchIcon} className='searching'></img>
    </div>
  )

}

export default SearchBar