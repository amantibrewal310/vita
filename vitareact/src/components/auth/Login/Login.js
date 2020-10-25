import React, { useState } from 'react';
import AxiosLoginInstance from './AxiosLogin';
import { useHistory } from 'react-router-dom';
import FbLogin from 'react-facebook-login';
import FacebookLogin from './FacebookLogin';
import checkLoggedIn from '../checkLoggedIn';
import setAdminStatus from '../setAdminStatus';
import '../../css/register.css';
import { FB_CLIENT_ID, FB_CLIENT_SECRET, FB_APP_ID} from '../../../Backend';


function Login() {

	const initialFormData = Object.freeze({
		email: '',
    	password: '',
    });
    const intialErrors = {
        credentialsError: null,
        emptyFormError: null,
    }
    var expiry_time;
    const history = useHistory();

	const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState(intialErrors);
    

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
    };
    
    const handleSubmit = (e) => {
		e.preventDefault();
        
        // validate form 
        if(!vaidateDetails()) {
            return;
        }
        // TODO:
        // first check if the user exist 
        // then process the response
		AxiosLoginInstance
			.post(`auth/token/`, {
				grant_type: 'password',
				username: formData.email.trim(),
				password: formData.password.trim(),
				client_id: FB_CLIENT_ID,
			    client_secret: FB_CLIENT_SECRET,
		    })
			.then(res => {
                // set the expiry of the token 
                expiry_time = new Date().getTime() + res.data.expires_in * 1000;
                localStorage.setItem('email', formData.email);
                localStorage.setItem('expiry_time', expiry_time);
				localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                setAdminStatus(formData.email);
                // home page on succefull login 
            })
            .catch(err => {
                // wrong credentials 
                setError({
                    emptyFormError: null,
                    credentialsError: err.data.error_description
                });
            });
    };

    // TODO: 
    // handle fb login error 
    
    const responseFacebook = async (response) => {
        FacebookLogin(response.accessToken, response.email)
        // TODO:
        // check admin login
        history.push('/');
		window.location.reload();
    };
    
    // TODO: 
    // add more validations 
    // form validation 
    const vaidateDetails = () => {
        if(formData.email === "" || formData.password === "") {
            // form is incomplete
            setError({
                credentialsError:null,
                emptyFormError: 'All field must be filled!'
            });
            return false;
        } else {
            // form is filled 
            setError({
                ...error,
                emptyFormError: null
            });
            return true;
        }
    }

    if(checkLoggedIn()) {
        history.push('/');
        return <></>
    }

    return (
        <div className='form-container'>
            <h2>Login Here</h2>
            <div>{error.emptyFormError ? error.emptyFormError: ''}</div>
            <div>{error.credentialsError ? error.credentialsError: ''}</div>
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
        
            <FbLogin
				appId={FB_APP_ID}
				fields="name,email,picture"
				callback={responseFacebook}
			/>
        
        </div>
    )
}

export default Login


