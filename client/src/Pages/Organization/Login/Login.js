import React from 'react';
import { Navbar } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { getOrganization } from '../../../api';
import './login.css';

function Login() {
    const [id, setId] = React.useState('');
	const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            "organizationId": id,
            "password":password
        }
		getOrganization(data)
		.then(response => {
			const orgData={
				"soleid":response.data.organization.organizationId,
                "name":response.data.organization.name,
            };
			localStorage.setItem("organizationToken",response.data.token);       
            localStorage.setItem("organization",JSON.stringify(orgData));
            navigate('/organization');
        }).catch((error) => {
            console.log(error)
            setError(error.response.error);
        });
        setId('');
		setPassword('');
    }
	return (
	<div>
		<Navbar />
		<div className="login__user">

			<div className="login__headline login__organization">LOG INTO YOUR ORGANIZATION ACCOUNT</div>
			<div className='login__line'></div>

			{error && <div className='login__error'>{error}</div>}
			<form onSubmit={onSubmit} className="login__form">
				<input
					type="text"
					value={id}
					placeholder='Enter your organization soleid'
					onChange={(event) => setId(event.target.value)}
				/>

				<input
					type="password"
					placeholder='password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>

				<button className='login__btn' type="submit">Submit</button>

			</form>
			<div className='register__adhaarxml'>Are you a user ? &nbsp; <a href="/user/login">Log in here</a> </div>
		</div>
	</div>
    )
};

export default Login;