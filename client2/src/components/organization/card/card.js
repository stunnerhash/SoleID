import React from 'react';
import { dateConverter, timeConverter } from '../../../utils/timeStampConverter';
import './card.css';

function Card({data, onCardClick}) {
    const dataCheck={
        name:data.fields.name.isRequired,
        email:data.fields.email.isRequired,
        phone:data.fields.phone.isRequired,
        careof:data.fields.careof.isRequired,
        gender:data.fields.gender.isRequired,
        dob:data.fields.dob.isRequired,
        address:data.fields.address.isRequired,
        adhaar:data.fields.address.isRequired
    }

    const cardClick = () => {
        if(data.status === 'approved'){
            onCardClick(data);
            return;
        }
        onCardClick(null);
    }
    return (
        <div className={`card ${data.status === 'rejected' && 'cardFaded'}`} onClick={cardClick}>
            <div className='card__upper'>
                <div className='card__upper__left'>
                    <div className='card__clg'>ID: {data?.userId.match(/.{1,4}/g).join('-')}</div>
                
                </div>
                <div className='card__upper__right'>
                    <div>{dateConverter(data.timeStamp)}</div>
                    <div>{timeConverter(data.timeStamp)} IST</div>
                </div>
            </div>

            <div className='card__lower'>
                
				<div><strong>REQUESTED FOR:</strong>{dataCheck.name?" name ":""} {dataCheck.email?" email ":""} {dataCheck.phone?" phone ":""}{dataCheck.careof?" careof ":""} 
				{dataCheck.gender?" gender ":""}{dataCheck.dob?" dob ":""}{dataCheck.address?" address ":""}{dataCheck.adhaar?" adhaar ":""}</div>
				<div><strong>COMMENT:</strong>{data.description}</div>
                {data.status === 'approved' && <button className='approved-btn'>approved</button> }
                {data.status === 'pending'  && <button className='pending-btn'> pending</button> }
				{data.status === 'rejected' && <button className='rejected-btn'>rejected</button>}
            </div>
        </div>
    )
}

export default Card

