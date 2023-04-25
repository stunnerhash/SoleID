import React from 'react';
import { ExitIcon, transaction } from '../../../assets';
import { useNavigate , useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar({isOrgProp}) {
 	const navigate = useNavigate();
	const location = useLocation();
	
	return (
		<div className='navbar'>
		<div className='navbar__logo' >SOLE ID</div>
		<div className='navbar__parent'>
			{
				isOrgProp &&
				<div className='navbar__logo'>
					<img src={transaction} alt="transactionIcon" onClick={() => navigate('/organization/transactions')} />
				</div>
			}
			<div className='navbar__logo'>
			<img src={ExitIcon} alt="exitIcon" onClick={() => navigate('/')}/>
			</div>
		</div>
		</div>
	);
}

export default Navbar