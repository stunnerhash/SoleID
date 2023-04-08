import React, { useState } from "react"
import { Navbar, SearchBar, OrgCard } from "../../../components"
import "./THistory.css"
import axios from "axios"

function THistory() {
    const isOrg = true
    const [transactions, setTransactions] = useState([]);
    const [data, setData] = useState("");
    const [approveData, setApproveData] = useState(null);
    const [user, setUser] = useState(null)

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('tokenOrg')}` }
    };
    const onCardClick = (data) => {
        if (data == null) {
            setApproveData(null);
            return;
        }
        //api calling and display
        console.log(data)
        setUser(data)
        axios.get(`http://localhost:8000/organizations/${data?.soleid}/transactions/${data?.transactionId}`, config)
            .then(res => { setApproveData(res.data); })
            .catch(err => console.log(err))

    }


    React.useEffect(() => {
        const getLocalData = () => {
            const data = JSON.parse(localStorage.getItem('organization'));
            console.log(data)
            setData(data);
        };
        getLocalData();
    }, []);

    React.useEffect(() => {
        if (data?.soleid) {
            axios.get(`http://localhost:8000/organizations/${data?.soleid}/transactions`, config)
                .then(res => { console.log(transactions); setTransactions(res.data) })
                .catch(err => console.log(err))
        }

    }, [data?.soleid]);

    return (
        <div>
            <Navbar isOrgProp={isOrg} />
            <div className='main__body'>
                <div className='main__card'>
                    <div className="thistory__view">View Transactions</div>
                    {approveData === null && <div className="tHistory__data">try clicking on an accepted transaction</div>}
                    {approveData !== null &&
                        <div className="history__wrapper">
                            <div className="history__id">ID: {user?.userId?.match(/.{1,4}/g).join('-')}</div>
                            <div className="history__date">Last Verified : 21 AUGUST 2023 12:30 PM IST</div>
                            {approveData.name && <div className="history_data"><strong>NAME :</strong>{approveData.name}</div>}
                            {approveData.gender && <div className="history_data"><strong>GENDER :</strong>{approveData.gender}</div>}
                            {approveData.dob && <div className="history_data"><strong>DOB :</strong>{approveData.dob}</div>}
                            {approveData.phone && <div className="history_data"><strong>PHONE :</strong>{approveData.phone}</div>}
                            {approveData.email && <div className="history_data"><strong>EMAIL : </strong>{approveData.email}</div>}
                            {approveData.adhaar && <div className="history_data"><strong>ADHAAR :</strong>{approveData.adhaar} </div>}
                            {approveData.address && <div className="history_data"><strong>ADDRESS :</strong>{approveData.address}</div>}
                        </div>
                    }

                </div>

                <div className='main__rightCard'>
                    <SearchBar />
                    <div className='main_rightScroll'>

                        {transactions?.map((item, index) => (
                            <OrgCard
                                onCardClick={onCardClick}
                                key={index}
                                data={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default THistory