import React, { useState } from 'react'
import axios from 'axios';
import {Link } from 'react-router-dom';
import formStyles from '../../css/forms.module.css';
import Popup from '../../utils/Popup';


function SendToken({setAppDataOnProcess}) {
    const initialFormData = Object.freeze({
		email: ''
    });
    const intialErrors = {
        userNotFoundError: null,
        emptyFormError: null,
    }

	const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState(intialErrors);
    const [showPopup, setShowPopup] = useState(false);   
    
    const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateDetails()) {
            return;
        }

        axios
            .post(`http://127.0.0.1:8000/api/user/password-reset/send-email/`, {
                email: formData.email
            })
            .then(res => {
                console.log(res);
                if(res.data.success) {
                    setError({
                        emptyFormError:null,
                        userNotFoundError:null
                    })
                    setShowPopup(true);
                    setTimeout(() => {
                        // update in parent component
                        setAppDataOnProcess("token sent");
                    }, 2000);
                } else {
                    setError({
                        ...error, 
                        userNotFoundError: res.data.message
                    })
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const validateDetails = () => {
        if(formData.email === "") {
            setError({
                emptyFormError: 'Provide an email',
                userNotFoundError: null
            })
            return false;
        } else {
            setError({
                ...error,
                emptyFormError: null
            })
            return true;
        }
    }

    return (
        <div className={formStyles.formBG}>
            <Popup show={showPopup} message="Please Check you mail for instructions." type="success"/>
            <div className={formStyles.smallFormContainer}>
                <h2 className={formStyles.heading}>Account Recovery</h2>
                {
                    (error.emptyFormError) 
                    ? (<div className={formStyles.error}> {error.emptyFormError} </div>)
                    : (<></>)
                }
                {
                    (error.userNotFoundError)
                    ? (<div className={formStyles.error}> {error.userNotFoundError} </div>)
                    : (<></>)
                }
                <form className={formStyles.form}>
                    <div>
                        <input 
                            type="text" 
                            required
                            name="email"
                            placeholder='Email'
                            onChange={handleChange}
                            className={formStyles.input}
                        />
                    </div>
                    <button 
                        className={formStyles.submitBtn}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Recover   
                    </button>
                </form>

                <div className={formStyles.redirectLink}>
                    <p> Back to
                    <Link to="../login">
                        <span className={formStyles.redirectBtn}>
                            <b> Login </b>
                        </span>
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SendToken
