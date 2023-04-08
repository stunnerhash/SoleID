import React from 'react';
import axios from 'axios';
import { Navbar } from '../../components';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

function Login() {
    const [userId, setUserId] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            "userId": userId,
            "password": password
        }
        axios.post("http://localhost:8000/users/login", data).then(response => {
            
            const data={
                "userId":response.data.user.userId,
                "name":response.data.user.name,
                "expiry":response.data.user.lastUpdated
            }
            console.log(response.data.user)
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("user",JSON.stringify(data))
            navigate('/soleid/home');
        }).catch((error) => {
            console.log(error)
            setError(error.response.data.error);
        });

        setUserId('');
        setPassword('');
    }


    return (
        <div>
            <Navbar />
            <div className="login__user">

                <div className="login__headline">LOG IN TO YOUR SOLE - ID ACCOUNT</div>
                <div className='login__line'></div>

                {error && <div className='login__error'>{error}</div>}
                <form onSubmit={onSubmit} className="login__form">
                    <input
                        type="text"
                        value={userId}
                        placeholder='Enter your sole id'
                        onChange={(event) => setUserId(event.target.value)}
                    />

                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <button className='login__btn' type="submit">Submit</button>

                </form>
                <div className='register__adhaarxml'>dont have an account ? <a href="register">sign up for free</a> </div>
            </div>
        </div>
    )
};

export default Login;