import React, { useState } from 'react'
import { Navbar } from '../../components'
import './register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [userData, setUserData] = React.useState(null);

    const formSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/users/register").then(response => {

            const data = {
                "userId": response.data.user.userId,
                "name": response.data.user.name,
                "expiry": response.data.user.lastUpdated
            }
            console.log(response.data.user)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(data))
            navigate('/soleid/setPassword');
        }).catch((error) => {
            console.log(error)
            setError(error.response.data.error);
        });
       
    }

    return (
        <div>
            <Navbar />
            <div className='login__user'>
                <div className='login__headline '>ONE STEP SIGN IN</div>
                <div className='login__line'></div>
                <form className='login__form' onSubmit={formSubmit}>
                    <div className='register__dialogue'>
                        <label class="att-each"><input type="file" /></label>
                        <div className='register__upload'>UPLOAD YOUR ADHAAR XML</div>
                    </div>
                    <button className='login__btn'>Continue</button>
                </form>
                <div className='register__adhaarxml'>dont know what adhaar xml is? <a href="https://uidai.gov.in/en/ecosystem/authentication-devices-documents/about-aadhaar-paperless-offline-e-kyc.html">click here to know more / download yours</a></div>
            </div>
        </div>
    )
}

export default Register