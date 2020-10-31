import React, { useState } from 'react';
import AxiosLoginInstance from './AxiosLogin';
import axios from 'axios';
import axiosInstance from '../../../axios';
import { useHistory, Link } from 'react-router-dom';
import FbLogin from 'react-facebook-login';
import FacebookLogin from './FacebookLogin';
// import checkLoggedIn from '../checkLoggedIn';
import checkAdminLoggedIn from '../checkAdminLoggedIn';
import { FB_CLIENT_ID, FB_CLIENT_SECRET, FB_APP_ID} from '../../../Backend';
import formStyles from '../../css/forms.module.css';
import Popup from '../../utils/Popup';
import logo from '../../../images/vita-log.png';


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
    const [showPopup, setShowPopup] = useState(false);    

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
                setAdminStatus();
                
                if(checkAdminLoggedIn()) {
                    setShowPopup(true);
                    setTimeout(() => {
                        history.push('/admin');
                    }, 1500);
               
                } else {
                    redirectBySubscription();
                }
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

    const setAdminStatus = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/byemail/${formData.email}/`);
        const admin = (res.data.is_staff ? '1' : '0');
        localStorage.setItem('admin', admin);
    } 

    const redirectBySubscription = () => {
        axiosInstance
            .get(`http://127.0.0.1:8000/api/membership/user/type/`)
            .then(res => {
                if(res.data.membership_type === "None") {
                    setShowPopup(true);
                    setTimeout(() => {
                        history.push("/subscribe");
                    }, 1500);
                } else {
                    setTimeout(() => {
                        history.push("/home");
                    }, 1500);
                }
            })
            .catch(err => {
                console.log(err);
                setError({
                    ...error,
                    credentialsError: 'could not login, please retry'
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1000)    
            })
    }


    return (
        <div className={formStyles.formBG}>
            <Popup show={showPopup} message="Welcome Back!" type="success"/>
            <div className={formStyles.logoBox}>
                <img src={logo} alt="logo" />
            </div>
            <div className={formStyles.formContainer}>
                <h2 className={formStyles.heading}>Login</h2>
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
                            type="text" 
                            required
                            name="email"
                            placeholder='Email'
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
                        Log In    
                    </button>
                </form>
                <div className={formStyles.fblogin}>
                    <FbLogin
		    	    	appId={FB_APP_ID}
		    	    	fields="name,email,picture"
		    	    	callback={responseFacebook}
                        size="medium"
		    	    />
                </div>
                <div className={formStyles.redirectLink}>
                    <p>
                        Not a member yet? 
                    <Link to="../register">
                        <span className={formStyles.redirectBtn}>
                            <b> Sign Up </b>
                        </span>
                    </Link>
                    </p>
                </div>
                <div className={formStyles.redirectLink}>
                    <p>
                    <Link to="../reset-password">
                        <span className={formStyles.redirectBtn}>
                            <b> Forgot Password </b>
                        </span>
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login