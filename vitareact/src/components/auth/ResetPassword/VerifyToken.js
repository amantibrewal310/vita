import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import formStyles from '../../css/forms.module.css';
import Popup from '../../utils/Popup';

function VerifyToken({setAppDataOnProcess, setTokenAndUid}) {

    const initialFormData = Object.freeze({
		token: ''
    });
    const intialErrors = {
        invalidTokenError: null,
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

        axios.get(`http://127.0.0.1:8000/api/user/password-reset/verify-token/${formData.token}`)
            .then(res => {
                console.log(res);
                if(res.data.success) {
                    setError({
                        emptyFormError:null,
                        invalidTokenError:null
                    })
                    setTokenAndUid(res.data.token, res.data.uidb64)
                    setShowPopup(true);
                    setTimeout(() => {
                        // update in parent component
                        setAppDataOnProcess("token verified");
                    }, 2500);
                    
                } else {
                    setError({
                        ...error,
                        invalidTokenError: res.data.message
                    })
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const validateDetails = () => {
        if(formData.token === "") {
            setError({
                invalidTokenError: null,
                emptyFormError: 'Provide an reset token'
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
            <Popup show={showPopup} message="Verified, you can set new password!" type="success"/>
            <div className={formStyles.smallFormContainer}> 
                <h2 className={formStyles.heading}>Verify Token</h2>
                {
                    (error.emptyFormError) 
                    ? (<div className={formStyles.error}> {error.emptyFormError} </div>)
                    : (<></>)
                }
                {
                    (error.invalidTokenError)
                    ? (<div className={formStyles.error}> {error.invalidTokenError} </div>)
                    : (<></>)
                }
                <form className={formStyles.form}>
                    <div>
                        <input 
                            type="text" 
                            required
                            name="token"
                            placeholder='Token'
                            onChange={handleChange}
                            className={formStyles.input}
                        />
                    </div>
                    <button 
                        className={formStyles.submitBtn}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Verify 
                    </button>
                </form>
            </div>
        </div>
    )
}

export default VerifyToken
