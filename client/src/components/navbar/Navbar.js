import React from 'react';
import { ExitIcon } from '../../assets';
import './navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbar__logo'>SOLE ID</div>
        <div className='navbar__logo'>
            <img src={ExitIcon} alt="exitIcon" />
        </div>
    </div>
  )
}

export default Navbar