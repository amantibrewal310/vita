import React, { useState } from 'react';
import AxiosLoginInstance from './AxiosLogin';
import { useHistory } from 'react-router-dom';
import FbLogin from 'react-facebook-login';
import FacebookLogin from './FacebookLogin';
import '../../css/register.css';
import { FB_CLIENT_ID, FB_CLIENT_SECRET, FB_APP_ID} from '../../../Backend';



function Login() {

    const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
    	password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
    };
    
    const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		AxiosLoginInstance
			.post(`auth/token/`, {
				grant_type: 'password',
				username: formData.email,
				password: formData.password,
				client_id: FB_CLIENT_ID,
			    client_secret: FB_CLIENT_SECRET,
		    })
			.then((res) => {
				localStorage.setItem('access_token', res.data.access_token);
				localStorage.setItem('refresh_token', res.data.refresh_token);
				history.push('/');
				window.location.reload();
			});
    };
    
    const responseFacebook = async (response) => {
        console.log('facebook login initiated');
		FacebookLogin(response.accessToken);
    };
    
    
    return (
        <div className='form-container'>
            <h2>Login Here</h2>
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


