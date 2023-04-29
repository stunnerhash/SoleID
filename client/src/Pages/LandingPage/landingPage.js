import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components';
import './landingPage.css';

function LandingPage() {
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();
	useEffect(() => {
		navigate('/user/login');
	}, []);

	return (
		<>
		</>
    )
};

export default LandingPage;