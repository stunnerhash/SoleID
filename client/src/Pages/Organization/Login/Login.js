import React from 'react';
import './Login.css';
import axios from 'axios';
import { Navbar } from '../../../components';
import { useNavigate } from 'react-router-dom';


function OrgLogin() {
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            "organizationId": "122d543b2c50",
            "password":"1234567"
        }
        axios.post("http://localhost:8000/organizations/login", data).then(response => {
            localStorage.setItem("tokenOrg",response.data.token)
            console.log(response.data.user)
            const orgData={
                "name":response.data.user.name,
                "soleid":response.data.user.organizationId
            }
            localStorage.setItem("organization",JSON.stringify(orgData))
            navigate('/soleid/orgMain');
        }).catch((error) => {
            console.log(error)
            setError(error.response.error);
        });
        setName('');
    }

    return (
        <div>
            <Navbar/>
            {error && <div>{error}</div>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder='name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <button type="submit">Submit</button>

            </form>
        </div>
    )
};

export default OrgLogin;