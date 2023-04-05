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
            "name": name
        }
        axios.post("http://localhost:8000/organizations", data).then(response => {
            localStorage.setItem('organization', JSON.stringify(response.data));
            navigate('/soleid/orgMain');
        }).catch((error) => {
            console.log(error)
            setError(error.response.data.error);
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