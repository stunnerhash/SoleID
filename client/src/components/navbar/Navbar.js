import React from 'react';
import { ExitIcon, transaction } from '../../assets';
import './navbar.css';
import {useNavigate} from 'react-router-dom';

function Navbar({isOrgProp}) {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div className='navbar__logo'>SOLE ID</div>
      <div className='navbar__parent'>
        {isOrgProp &&
        <div className='navbar__logo'>
        <img src={transaction} alt="exitIcon" onClick={() => navigate('/soleid/tHistory')} />
       </div>
        }
        <div className='navbar__logo'>
          <img src={ExitIcon} alt="exitIcon" onClick={()=> navigate('/soleid/login')}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar