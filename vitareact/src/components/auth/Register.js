
import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Popup from '../utils/Popup';
import '../css/register.css';

function SignUp() {
    const history = useHistory();
    
    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password: '',
    });
    const intialErrors = {
        emailError: null,
        usernameError: null,
        passwordError: null,
        emptyFormError: null,
    }

    // states
    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState(intialErrors);
    const [showPopup, setShowPopup] = useState(false);

    // listeners
    const handleChange = (e) => {
        updateFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // validate form 
        if(!vaidateDetails()) {
            return;
        }

        axios.post(`http://127.0.0.1:8000/api/user/`, {
                email: formData.email.trim(),
                username: formData.username.trim(),
                password: formData.password,
            })
            .then(response => {
                setShowPopup(true);
                setTimeout(() => {
                    history.push('/login');
                }, 2000);
            })
            .catch(err => {
                // some credential errors
                if(err.data.email) {
                    setError({
                        ...error,
                        emailError: err.data.email[0],
                        emptyFormError: null,
                        usernameError: null
                    })
                }
                if(err.data.username) {
                    setError({
                        ...error,
                        usernameError: err.data.username[0],
                        emptyFormError: null
                    })
                }
            });
    }

    // TODO: 
    // add more validations 
    // form validation
    const vaidateDetails = () => {
        if(formData.email === "" || formData.password === "" || formData.username === "") {
            // update the errors in form
            setError({
                emailError: null,
                usernameError: null,
                passwordError: null,
                emptyFormError: 'All field must be filled!'
            });
            return false;
        } else {
            // form is completely filled
            setError({
                ...error,
                emptyFormError: null
            });
            return true;
        }
    }

    return (
        <>
        <Popup show={showPopup} message="Sigup Successfull, Redirecting to Login..." type="success"/>
        <div className='form-container'>
            <div>{error.emptyFormError ? error.emptyFormError: ''}</div>
            <div>{error.emailError ? error.emailError: ''}</div>
            <div>{error.usernameError ? error.usernameError: ''}</div>
            <div>{error.passwordError ? error.passwordError: ''}</div>
            <h2>Register Here</h2>
            <form>
                <div>
                    <label>Email </label>
                    <input 
                        type="text" 
                        required
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Username </label>
                    <input 
                        type="text" 
                        required
                        name="username"
                        onChange={handleChange}
                    /> 
                </div>
                <div>
                    <label>Password </label>
                    <input 
                        type="password" 
                        required
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <button 
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit    
                </button>
            </form>
        </div>
        </>
    )
}

export default SignUp
