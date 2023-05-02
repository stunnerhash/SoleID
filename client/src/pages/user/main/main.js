import React from 'react';
import QRCode from 'qrcode.react';
import { ScanIcon } from '../../../assets';
import { UserCard, Navbar, UserSearch } from '../../../components';
import {getUserTransactions,respondToTransaction} from '../../../api'

import './main.css';

function Main() {
    const [userData, setUserData] = React.useState(null);
    const [transactions, setTransactions] = React.useState([]);
    const [query,setQuery]=React.useState("");

    const onDeclinedAction = async (data) => {
		const status = {"status":"rejected"};
		await respondToTransaction(data.transactionId,status);
		if (userData?.userId) {
			getUserTransactions().then(response => setTransactions(response.data));
        }
    }
    const onApprovedAction = async (data) => {
		const status = { "status" : "approved" };
		await respondToTransaction(data.transactionId,status);
        if (userData?.userId) {
			getUserTransactions().then(response => setTransactions(response.data));
        }
    }

    const issuedDate = (lastUpdated) => {
        const date = new Date(parseInt(lastUpdated)); // Convert timestamp to date
        const month = date.getMonth() + 1; // Get month (returns 0-11, so add 1)
        const year = date.getFullYear(); // Get year
        const monthYearString = month.toString().padStart(2, '0') + '/' + year.toString(); // Format as "MM/YYYY"
        return monthYearString;// Output: "04/2023" (for example)
    }

    const expiryDate = () => {
        const data = issuedDate(userData?.expiry);
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
			getUserTransactions().then(response => setTransactions(response.data));
        }
    }, [userData?.userId]);
   
    return (
        <div>
            <Navbar />
            <div className='main__body'>
                <div className='main__card'>
                    <div className='main__cardtitle'>Welcome, {userData?.name.split(" ")[0]}  </div>
                    <div className='main__cardsubtitle'>Start verifying securely</div>
                    <div className='main__cardContainer'>
                        <QRCode value = {userData?.userId}/>
                        <div className='main__cardContent'>
                            <div><strong>SoleID</strong></div>
                            <div>{userData?.userId?.match(/.{1,4}/g).join('-')}</div>
                            <div>EXP : {expiryDate()} </div>
                            <div>ISSUED : {issuedDate(userData?.expiry)}</div>
                        </div>
                    </div>
                    <button className='btn updatebtn'>Update Information</button>
                    <button className='btn revokebtn'>Revoke Credetentials</button>
                </div>

                <div className='main__rightCard'>
                    <UserSearch onQueryChange={handleQueryChange}/>
                    <div className='main_rightScroll'>
                        {transactions?.filter((transaction)=> 
							transaction.organizationName.includes(query.toUpperCase()))
							.map((item, index) => (
                            <UserCard
                                key={index}
                                data={item}
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