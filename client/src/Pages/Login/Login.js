import React from 'react';
import axios from 'axios';
import { Navbar} from '../../components';
import { useNavigate } from 'react-router-dom';


function  Login() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            "userId": name,
            "password": email
        }
        axios.post("http://localhost:8000/users", data).then(response => {
			console.log(response);
            navigate('/soleid/home');
        }).catch((error) => {
            console.log(error);
            setError(error.response.data.error);
        });
        setName('');
        setEmail('');
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

            <input 
            type="email" 
            placeholder='email' 
            value={email} 
            onChange={(event) => setEmail(event.target.value)}
            />

            <button type="submit">Submit</button>

        </form>
    </div>
  )
};

export default Login;