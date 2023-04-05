import React from 'react';
import { ExitIcon, transaction } from '../../assets';
import './navbar.css';

function Navbar({isOrgProp}) {
  return (
    <div className='navbar'>
      <div className='navbar__logo'>SOLE ID</div>
      <div className='navbar__parent'>
        {isOrgProp?
        <div className='navbar__logo'>
        <img src={transaction} alt="exitIcon" />
       </div>:""
        }
        <div className='navbar__logo'>
          <img src={ExitIcon} alt="exitIcon" />
        </div>
      </div>
    </div>
  )
}

export default Navbar