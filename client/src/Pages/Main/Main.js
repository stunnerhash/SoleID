import React from 'react';
import { ScanIcon } from '../../assets';
import { Card, Navbar, SearchBar } from '../../components';
import './main.css';
import axios from 'axios';


function Main() {
    const [isApproved, setIsApproved] = React.useState(false);
    const [isFaded, setFaded] = React.useState(false);

    const onFadedAction = () => {
        setFaded(true);
    }

    const onApprovedAction = () => {
        setIsApproved(true);
    }
    const userData=()=>{
        const userD={
           "name":"shivangi",
           "email":"shivi@tekion.com"
        }
        const data = axios.post("https://localhost:8000/users",userD);
        console.log(data)
    }
  return (
    <div>
        <Navbar />
        <div className='main__body'>
            {userData()}
            <div className='main__card'>
                <div className='main__cardtitle'>Welcome, Utkarsh </div>
                <div className='main__cardsubtitle'>Start verifying securely</div>
                <div className='main__cardContainer'>
                    <img src={ScanIcon} alt="scanIcon"/>
                    <div className='main__cardContent'>
                        <div><strong>SoleID</strong></div>
                        <div>6125 - 1971 - BJ25</div>
                        <div>EXP : 12/2025</div>
                        <div>ISSUED : 10/22</div>
                    </div>
                </div>
                <button className='btn updatebtn'>Update Information</button>
                <button className='btn revokebtn'>Revoke Credetentials</button>
            </div>

            <div className='main__rightCard'>
                <SearchBar />
                <div className='main_rightScroll'>
                <Card 
                    isApproved={isApproved}
                    isFaded={isFaded}
                    onApprovedAction={onApprovedAction}
                    onFadedAction={onFadedAction}
                />
                
                </div>
                
            </div>
        </div>
    </div>
  )
};

export default Main;