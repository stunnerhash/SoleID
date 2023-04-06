import React, { useState } from "react"
import { Navbar,SearchBar,OrgCard } from "../../../components"
import "./THistory.css"
import axios from "axios"

function THistory(){
    const isOrg=true
    const [transactions,setTransactions]=useState([]);
    const [data,setData]=useState("");
    const [approveData, setApproveData] =  useState(null);

    const onCardClick = (data) => {
        if(data == null){
            setApproveData(null);
            return;
        }
        //api calling and display
       console.log(data)
       setApproveData(data);
       axios.get(`http://localhost:8000/organizations/${data?.organizationId}/transactions/${data?.transactionId}`)
       .then(res=> console.log(res))
       .catch(err=>console.log(err))
    }

 
    React.useEffect(() => {
        const getLocalData = () => {
            const data = JSON.parse(localStorage.getItem('organization'));
            setData(data);
        };
        getLocalData();
    }, []);

    React.useEffect(() => {
        if (data?.organizationId) {
            axios.get(`http://localhost:8000/organizations/${data?.organizationId}/transactions`)
            .then(res=>{ console.log(transactions); setTransactions(res.data)})
            .catch(err=> console.log(err))
        }
        
    }, [data?.organizationId]);
   
  return (
    <div>
    <Navbar isOrgProp={isOrg}  />
    <div className='main__body'>
        <div className='main__card'>
            <div className="thistory__view">View Transactions</div>
            {approveData === null && <div className="tHistory__data">try clicking on an accepted transaction</div>}
            {approveData !== null &&
                <div className="history__wrapper">
                    <div className="history__id">ID: 1234 5678 98765</div>
                    <div className="history__date">Last Verified : 21 AUGUST 2023 12:30 PM IST</div>
                    <div className="history_data"><strong>NAME :</strong>Shivangi Singh</div>
                    <div className="history_data"><strong>GENDER :</strong>Female</div>
                    <div className="history_data"><strong>DOB :</strong>28-08-2000 </div>
                    <div className="history_data"><strong>PHONE :</strong>NA </div>
                    <div className="history_data"><strong>EMAIL : </strong>NA</div>
                    <div className="history_data"><strong>ADHAAR :</strong>NA </div>
                    <div className="history_data"><strong>ADDRESS :</strong>NA </div>
                </div>
            }

        </div>

        <div className='main__rightCard'>
            <SearchBar />
            <div className='main_rightScroll'>
                
                {console.log(data?.transactionId)}
                {transactions?.map((item, index) => (
                    <OrgCard
                        onCardClick = {onCardClick}
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