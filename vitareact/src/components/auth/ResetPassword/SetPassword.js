import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import formStyles from '../../css/forms.module.css';
import Popup from '../../utils/Popup';
import logo from '../../../images/vita-log.png'

function SetPassword({setAppDataOnProcess, token, uid}) {
    const initialFormData = Object.freeze({
        password1: '',
        password2: ''
    });
    const intialErrors = {
        credentialsError: null,
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

        const body = {
            password: formData.password1,
            token: token,
            uidb64: uid
        }

        axios.patch(`http://127.0.0.1:8000/api/user/password-reset/set-password/`, body)
            .then(res => {
                console.log(res);
                if(res.data.detail) {
                    setError({
                        credentialsError: res.data.detail,
                        emptyFormError: null
                    })
                } else if(res.data.success) {
                    setError({
                        emptyFormError:null,
                        credentialsError:null
                    })
                    setShowPopup(true);
                    setTimeout(() => {
                        // update in parent component
                        setAppDataOnProcess("new password set");
                    }, 2000);
                }
            })
            .catch(err => {
                console.log(err.response);
                setError({
                    emptyFormError:null,
                    credentialsError:err.response.data.password[0]
                })
            })
    }

    const validateDetails = () => {
        if(formData.password1 === "" || formData.password2 === "") {
            setError({
                credentialsError: null,
                emptyFormError: 'Provide new password'
            })
            return false;
        } else if(formData.password1 != formData.password2) {
            setError({
                credentialsError: 'Passwords mismatch',
                emptyFormError: null
            })
        } else {
            setError({
                credentialsError: null,
                emptyFormError: null
            })
            return true;
        }
    }


    return (
        <div className={formStyles.formBG}>
            <Popup show={showPopup} message="New Password set!" type="success"/>
            <div className={formStyles.logoBox}>
                <img src={logo} alt="logo" />
            </div>
            <div className={formStyles.mediumFormContainer}>
                <h2 className={formStyles.heading}>Reset Password</h2>
                {
                    (error.emptyFormError) 
                    ? (<div className={formStyles.error}> {error.emptyFormError} </div>)
                    : (<></>)
                }
                {
                    (error.credentialsError)
                    ? (<div className={formStyles.error}> {error.credentialsError} </div>)
                    : (<></>)
                }
                <form className={formStyles.form}>
                    <div>
                        <input 
                            type="password" 
                            required
                            name="password1"
                            placeholder='New password'
                            onChange={handleChange}
                            className={formStyles.input}
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            required
                            name="password2"
                            placeholder='Re-enter new password'
                            onChange={handleChange}
                            className={formStyles.input}
                        />
                    </div>
                    <button 
                        className={formStyles.submitBtn}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit 
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SetPassword
