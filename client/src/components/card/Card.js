import React from 'react';
import { CrossIcon, TickIcon } from '../../assets';
import './card.css';
import { Approve } from '../../assets';


function Card({isFaded, isApproved, onApprovedAction, onFadedAction}) {

    const onClickTick = () => {
        onApprovedAction();
    };

    const onClickCross = () => {
        onFadedAction();
    }


    return (
        <div className={`card ${isFaded && 'cardFaded'}`}>
            <div className='card__upper'>
                <div className='card__upper__left'>
                    <div className='card__clg'>AJAY KUMAR GARG ENGINEERING COLLEGE</div>
                    <div className='card__id'>ID : 9072 - 4912 - 7941</div>
                </div>
                <div className='card__upper__right'>
                    <div>21 AUGUST 2023</div>
                    <div>12:30 PM IST</div>
                </div>
            </div>

            <div className='card__lower'>
                
                    <div><strong>REQUESTED FOR :</strong>name, age, address, email, phone number, adhaar number</div>
                    <div><strong>COMMENT :</strong>we require your details to proceed your registration for final year exams</div>
                

                {isApproved ? <button className='approve-btn'><img src={Approve} /></button> 
                 : 
                 !isFaded && 
                    <div className='card__lowerbtn'>
                        <button><img src={TickIcon} alt="tickIcon" onClick={() => onClickTick()}/></button>
                        <button><img src={CrossIcon} alt="crossIcon" onClick={() => onClickCross()}/></button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Card
