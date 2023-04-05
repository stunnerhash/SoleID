import React from 'react';
import { ScanIcon } from '../../assets';
import { Card, Navbar, SearchBar } from '../../components';
import './main.css';
import axios from 'axios';


function Main() {
    // const [isApproved, setIsApproved] = React.useState(false);
    // const [isFaded, setFaded] = React.useState(false);
    const [userData, setUserData] = React.useState(null);
    const [transactions, setTransactions] = React.useState([]);
    const [query,setQuery]=React.useState("")
    
    const onDeclinedAction = async (data) => {
       const decline=await axios.put(`http://localhost:8000/users/${data.userId}/transactions/${data.transactionId}`,{"status":"rejected"})

       if (userData?.userId) {
        axios.get(`http://localhost:8000/users/${userData.userId}/transactions`)
            .then(response => setTransactions(response.data));
        }
    }

    const onApprovedAction = async (data) => {

        const approved= await axios.put(`http://localhost:8000/users/${data.userId}/transactions/${data.transactionId}`,{"status":"approved"})
        if (userData?.userId) {
            axios.get(`http://localhost:8000/users/${userData.userId}/transactions`)
                .then(response => setTransactions(response.data));
        }
    }

    const issuedDate = (lastUpdated) => {
        const date = new Date(parseInt(lastUpdated)); // Convert timestamp to date
        const month = date.getMonth() + 1; // Get month (returns 0-11, so add 1)
        const year = date.getFullYear(); // Get year
        const monthYearString = month.toString().padStart(2, '0') + '/' + year.toString(); // Format as "MM/YYYY"
        return monthYearString// Output: "04/2023" (for example)
    }
    const expiryDate = () => {
        const data = issuedDate(userData?.lastUpdated);
        const split = data.split("/");
        const year = parseInt(split[1]) + 1;
        return split[0] + "/" + year.toString();
    }
    const handleQueryChange = (newQuery) => {
        setQuery(newQuery);
      }
    React.useEffect(() => {
        const getLocalData = () => {
            const data = JSON.parse(localStorage.getItem('user'));
            setUserData(data);
        };
        getLocalData();
    }, []);

    React.useEffect(() => {
        if (userData?.userId) {
            axios.get(`http://localhost:8000/users/${userData.userId}/transactions`)
                .then(response => setTransactions(response.data));
        }
    }, [userData?.userId]);
    
    return (
        <div>
            <Navbar />
            <div className='main__body'>
                <div className='main__card'>
                    <div className='main__cardtitle'>Welcome, {userData?.name}  </div>
                    <div className='main__cardsubtitle'>Start verifying securely</div>
                    <div className='main__cardContainer'>
                        <img src={ScanIcon} alt="scanIcon" />
                        <div className='main__cardContent'>
                            <div><strong>SoleID</strong></div>
                            <div>{userData?.userId.match(/.{1,4}/g).join('-')}</div>
                            <div>EXP : {expiryDate()} </div>
                            <div>ISSUED : {issuedDate(userData?.lastUpdated)}</div>
                        </div>
                    </div>
                    <button className='btn updatebtn'>Update Information</button>
                    <button className='btn revokebtn'>Revoke Credetentials</button>
                </div>

                <div className='main__rightCard'>
                    <SearchBar onQueryChange={handleQueryChange}/>
                    <div className='main_rightScroll'>
                        {transactions?.filter((transaction)=> transaction.organizationName.includes(query.toUpperCase())).map((item, index) => (
                            <Card
                                key={index}
                                data={item}
                                // isApproved={item.isApproved}
                                // isFaded={item.isFaded}
                                onApprovedAction={onApprovedAction}
                                onDeclinedAction ={onDeclinedAction}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Main;