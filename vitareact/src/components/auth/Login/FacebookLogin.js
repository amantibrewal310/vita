import axios from 'axios';
import { FB_CLIENT_ID, FB_CLIENT_SECRET, API, CLIENT } from '../../../Backend';
// import { useHistory } from 'react-router-dom';

const FacebookLogin = (accesstoken, email) => {
	var expiry_time;
	axios
		.post(`${API}auth/convert-token`, {
			token: accesstoken,
			backend: 'facebook',
			grant_type: 'convert_token',
			client_id: FB_CLIENT_ID,
			client_secret: FB_CLIENT_SECRET,
		})
		.then((res) => {
			// set the expiry of the token 
			expiry_time = new Date().getTime() + res.data.expires_in * 1000;
			localStorage.setItem('email', email);
			localStorage.setItem('expiry_time', expiry_time);
			localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
			setAdminStatus(email);
		})
		.catch(err => {
			console.log('Error in facebook auth');
			console.log(err);
		})
};

const setAdminStatus = async (email) => {
	const res = await axios.get(`http://127.0.0.1:8000/api/user/byemail/${email}/`);
	const admin = (res.data.is_staff ? '1' : '0');
	localStorage.setItem('admin', admin);
} 

export default FacebookLogin;
