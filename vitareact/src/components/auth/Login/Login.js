import React, { useState } from 'react';
import AxiosLoginInstance from './AxiosLogin';
import { useHistory } from 'react-router-dom';
import FbLogin from 'react-facebook-login';
import FacebookLogin from './FacebookLogin';
import '../../css/register.css';



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
				client_id: 'a1fQR0KV0WANB7FvhiO3btsgJYkrjJtpalTdeFzT',
			    client_secret: 'ujgrMGxkt7fgqEpoxFpDInFjzfmgRKYScshcBaEawCu0l8wAm85XpG7DFdX9kFLD6PLsPRet0aNnEBmLnvOXyyW5WRy0ZsJtsY5ESk5sEkMgpybW6PKgUmmYtznlK7dL',
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
				appId="685643272334163"
				fields="name,email,picture"
				callback={responseFacebook}
			/>
        
        </div>
    )
}

export default Login


