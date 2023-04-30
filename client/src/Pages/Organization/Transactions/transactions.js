import React, { useState } from "react";
import { Navbar, OrganizationSearch, OrganizationCard } from "../../../components";
import {getUserResponseToTrasaction, getTransactionsByOrganization} from '../../../api';
import { timeConverter,dateConverter } from "../../../utils/timeStampConverter";
import "./transactions.css"

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [data, setData] = useState("");
	const [err, setErr] = useState("try clicking on an accepted transaction");
    const [approveData, setApproveData] = useState(null);
    const [user, setUser] = useState(null);
	const [query,setQuery] = useState("");

	const handleQueryChange = (newQuery)=>{
		setQuery(newQuery);
	}
    const onCardClick = (data) => {
        if (data == null) {
            setApproveData(null);
            return;
        }
        setUser(data)
		getUserResponseToTrasaction(data?.transactionId	)
		.then(res => setApproveData(res.data))
		.catch(err => {
			console.log(err);
			if (err.response && err.response.data) {
				setErr(err.response.data.message);
			} else {
				setErr('Internal server error');
			}
		})
    }

    React.useEffect(() => {
        const getLocalData = () => {
            const data = JSON.parse(localStorage.getItem('organization'));
            setData(data);
        };
        getLocalData();
    }, []);
    React.useEffect(() => {
        if (data?.soleid) {
			getTransactionsByOrganization()
                .then(res => { setTransactions(res.data) })
                .catch(err => console.log(err))
        }
    }, [data?.soleid]);
    return (
        <div>
            <Navbar isOrgProp={true} />
            <div className='main__body'>
                <div className='main__card'>
                    <div className="transactions__view">View transaction data</div>
                    {approveData === null && <div className="transactions__data">{err}</div>}
                    {approveData !== null &&
                        <div className="history__wrapper">
                            <div className="history__id">Transaction ID: {user?.transactionId?.match(/.{1,4}/g).join('-')}</div>
                            <div className="history__date">Last updated: {dateConverter(user?.timeStamp)} {timeConverter(user?.timeStamp)} IST</div>
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
                    <OrganizationSearch onQueryChange = {handleQueryChange}/>
                    <div className='main_rightScroll'>
						{transactions && transactions?.filter((transaction) =>
							transaction.userId.includes(query.toLowerCase()))
							.map((item, index) => (
							<OrganizationCard
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
export default Transactions; 