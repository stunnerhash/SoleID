import React from 'react';
import './search.css';
import {SearchIcon} from '../../../assets';

function Search(props) {
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    props.onQueryChange(newQuery);
  }
  return (
    <div className='searchbar-wrapper'>
      <input
        className='searchbar'
        placeholder='search from transactions'
        onChange={handleInputChange}
      />
      <img src={SearchIcon} alt='search' className='searching'></img>
    </div>
  )

}

export default Search;