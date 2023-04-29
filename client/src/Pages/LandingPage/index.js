import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

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