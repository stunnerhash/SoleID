import React from 'react';
import { Navbar } from '../../../components';
import { useState } from 'react';
import { makeTransactionToUser } from '../../../api';
import './main.css';

function Main() {
    const [name, setName] = React.useState('');
    const [comment, setComment] = React.useState('')
    const [orgData, setOrgData] = React.useState('');
    const [res,setRes]=useState("")

    const [checkboxValues, setCheckboxValues] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
        checkbox6: false,
        checkbox7: false,
    });

    const isOrg = true
    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            "userId": name,
            "organizationName": orgData?.name,
            "description": comment,
            "fields": {
                "name": {
                    "isRequired": checkboxValues.checkbox1
                },
                "email": {
                    "isRequired": checkboxValues.checkbox3
                },
                "phone": {
                    "isRequired": checkboxValues.checkbox2
                },
                "gender": {
                    "isRequired": checkboxValues.checkbox4
                },
                "dob": {
                    "isRequired": checkboxValues.checkbox5
                },
                "address": {
                    "isRequired": checkboxValues.checkbox6
                },
                "adhaar": {
                    "isRequired": checkboxValues.checkbox7
                }
            }
        }
		makeTransactionToUser(data)
		.then(response => {
            setRes("Request sent successfully")
        }).catch((error) => {
            setRes("error sending the request")
        });
        setName('');
        setComment('');
        setCheckboxValues({
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            checkbox5: false,
            checkbox6: false,
            checkbox7: false,
        })
    }
    function handleCheckboxChange(event) {
        const { name, checked } = event.target;
        setCheckboxValues(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }
    React.useEffect(() => {
        const getLocalData = () => {
            const data = JSON.parse(localStorage.getItem('organization'));
            setOrgData(data);
        };
        getLocalData();
    }, []);

    return (
        <div>
            <Navbar isOrgProp={isOrg} />
            <div className='org__main'>
                <div className='org__clg'> {orgData?.name} </div>
                <div className='org__id'>ID: {orgData?.soleid?.match(/.{1,4}/g).join('-')} </div>
              <div className='org__wrapper' >
                {
					res === ""? 
					<form className='org__form' onSubmit={onSubmit}>
						<div className = 'org__input__wrapper'>
							<input className='org__input input__soleid' type="text" placeholder='Enter SoleId' value={name}
								onChange={(event) => setName(event.target.value)} />
							<input className='org__input input__description' type="text" placeholder='Description' value={comment}
								onChange={(event) => setComment(event.target.value)} />
						</div>
                        <div>
                            <div className='org__left'>
                                <label className="container">
                                    <span class="checkmark"></span>
                                    <input type="checkbox"
                                        name="checkbox1"
                                        checked={checkboxValues.checkbox1}
                                        onChange={handleCheckboxChange} />
                                    name
                                </label>

                                <label className="container">
                                    <span class="checkmark"></span>
                                    <input type="checkbox"
                                        name="checkbox2"
                                        checked={checkboxValues.checkbox2}
                                        onChange={handleCheckboxChange} />
                                    phone
                                </label>

                                <label className="container">
                                    <span class="checkmark"></span>
                                    <input type="checkbox"
                                        name="checkbox3"
                                        checked={checkboxValues.checkbox3}
                                        onChange={handleCheckboxChange} />
                                    email
                                </label>
								<label className="container">
                                    <span class="checkmark"></span>
                                    <input type="checkbox"
                                        name="checkbox7"
                                        // checked={checkboxValues.checkbox7}
                                        onChange={handleCheckboxChange} />
                                    careof
                                </label>
                            </div>
                            <div className='org__right'>
                                <label className="container">
                                    <span class="checkmark"></span>
                                    <input type="checkbox"
                                        name="checkbox4"
                                        checked={checkboxValues.checkbox4}
                                        onChange={handleCheckboxChange} />
                                    gender
                                </label>
                                <label className="container">
                                    <span class="checkmark"></span>
                                    <input type="checkbox"
                                        name="checkbox5"
                                        checked={checkboxValues.checkbox5}
                                        onChange={handleCheckboxChange} />
                                    dob
                                </label>
                                <label className="container">
                                    <span class="checkmark"></span>
                                    <input type="checkbox"
                                        name="checkbox6"
                                        checked={checkboxValues.checkbox6}
                                        onChange={handleCheckboxChange} />
                                    address
                                </label>
								<label className="container">
                                    <span class="checkmark"></span>
                                    <input type="checkbox"
                                        name="checkbox7"
                                        checked={checkboxValues.checkbox7}
                                        onChange={handleCheckboxChange} />
                                    adhaar
                                </label>
                            </div>
							<div className='org__right'>
							</div>
                        </div>
                        <button className='org__button'>Get Verified data</button>
                    </form>
                 :<div>
                    <div className='org__res'>{res}</div>
                    <button className='org__button org__reset' onClick={()=> setRes("")}>Reset</button>
                    </div>}
                 
                   </div>
            </div>
        </div>
    )
};

export default Main;