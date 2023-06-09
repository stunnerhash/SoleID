import React, { useState } from 'react'
import { Navbar } from '../../../components'
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import {updateUser} from '../../../api'
import './setpassword.css'

function SetPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [password,setPassword]=useState('')
    const [userData, setUserData] = React.useState(null); 
    const formSubmit = (e) => {
        e.preventDefault();
		updateUser({"password":password}).then(response => {
            navigate('/user');
        }).catch((error) => {
            console.log(error)
            setError(error.response.data.error);
        });
        setPassword('')
       
    }

    const issuedDate = (lastUpdated) => {
        const date = new Date(parseInt(lastUpdated)); // Convert timestamp to date
        const month = date.getMonth() + 1; // Get month (returns 0-11, so add 1)
        const year = date.getFullYear(); // Get year
        const monthYearString = month.toString().padStart(2, '0') + '/' + year.toString(); // Format as "MM/YYYY"
        return monthYearString; // Output: "04/2023" (for example)
    }
    const expiryDate = () => {
        const data = issuedDate(userData?.expiry);
        const split = data.split("/");
        const year = parseInt(split[1]) + 1;
        return split[0] + "/" + year.toString();
    }
    React.useEffect(() => {
        const getLocalData = () => {
            const data = JSON.parse(localStorage.getItem('user'));
            setUserData(data);
        };
        getLocalData();
    }, []);
    return (
        <div>
            <Navbar />
            <div className='login__user set__container'>
            <div className='login__headline set__headline' >ALL SET! HERE IS YOUR YOUR SOLE ID </div>
            <div className='login__line'></div>
            <div className='main__cardContainer '>
				<QRCode value = {userData?.userId}/>
                <div className='main__cardContent'>
                    <div><strong>SoleID</strong></div>
                    <div>{userData?.userId?.match(/.{1,4}/g).join('-')}</div>
                    <div>EXP : {expiryDate()} </div>
                    <div>ISSUED : {issuedDate(userData?.expiry)} </div>
                </div>
            </div>
            <form className='login__form set__form' onSubmit={formSubmit}>
            <input
             type="password" 
            placeholder='set a password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
             />
            <button className='login__btn'>start verifying</button>
            </form>
            <div className='register__adhaarxml'>NOTE : Your SOLE ID number will serve as your username for all future logins</div>
            </div>
        </div>
    )
}

export default SetPassword;