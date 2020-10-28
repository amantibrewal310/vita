import React, {useState} from 'react';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import Popup from '../utils/Popup';
import formStyles from '../css/forms.module.css';


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

        console.log(formData);

        axios.post(`http://127.0.0.1:8000/api/user/`, {
                email: formData.email.trim(),
                username: formData.username.trim(),
                password: formData.password,
            })
            .then(response => {
                setShowPopup(true);
                setError({
                    emptyFormError: null,
                    emailError: null,
                    usernameError: null,
                    passwordError: null
                });
                setTimeout(() => {
                    history.push('/login');
                }, 2000);
            })
            .catch(err => {
                // some credential errors
                err = err.response;
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
        <div className={formStyles.formBG}>
            <Popup show={showPopup} message="Welcome to Vita!" type="success"/>
            <div className={formStyles.formContainer}>
            <h2 className={formStyles.heading}>Sign Up</h2>
                {
                    (error.emptyFormError) 
                    ? (<div className={formStyles.error}> {error.emptyFormError} </div>)
                    : (<></>)
                }
                {
                    (error.usernameError)
                    ? (<div className={formStyles.error}> {error.usernameError} </div>)
                    : (<></>)
                }
                {
                    (error.emailError) 
                    ? (<div className={formStyles.error}> {error.emailError} </div>)
                    : (<></>)
                }
                {
                    (error.passwordError)
                    ? (<div className={formStyles.error}> {error.passwordError} </div>)
                    : (<></>)
                }
                <form className={formStyles.form}>
                    <div>
                        <input 
                            type="text" 
                            required
                            name="email"
                            placeholder="Email"
                            className={formStyles.input}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            required
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            className={formStyles.input}
                        /> 
                    </div>
                    <div>
                        <input 
                            type="password" 
                            required
                            name="password"
                            placeholder='Password'
                            onChange={handleChange}
                            className={formStyles.input}
                        />
                    </div>
                    <button 
                        className={formStyles.submitBtn}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Sign Up    
                    </button>
                </form>
                <div className={formStyles.redirectLink}>
                    <p>
                        Already with us? 
                    <Link to="../login">
                        <span className={formStyles.redirectBtn}>
                            <b> Log In </b>
                        </span>
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
