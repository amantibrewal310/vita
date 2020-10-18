
import React, {useState} from 'react';
import axiosInstance from '../../axios';
import {useHistory} from 'react-router-dom';
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

    // listeners
    const handleChange = (e) => {
        updateFormData({
            ...formData, 
            [e.target.name]: e.target.value.trim(),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // validate form 
        if(!vaidateDetails()) {
            return;
        }

        axiosInstance
            .post(`user/`, {
                email: formData.email,
                username: formData.username,
                password: formData.password,
            })
            .then(response => {
                history.push('/login');
                console.log(response);
                console.log(response.data);
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
    )
}

export default SignUp
