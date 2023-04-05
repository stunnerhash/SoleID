import React, { useState } from "react"
import { Navbar,SearchBar,OrgCard } from "../../../components"
import "./THistory.css"
import axios from "axios"

function THistory(){
    const isOrg=true
    const [transactions,setTransactions]=useState([]);
    const [data,setData]=useState("");

 
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
            <div className="tHistory__data">try clicking on an accepted transaction</div>
        </div>

        <div className='main__rightCard'>
            <SearchBar />
            <div className='main_rightScroll'>
                
                {console.log(data?.transactionId)}
                {transactions?.map((item, index) => (
                    <OrgCard
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