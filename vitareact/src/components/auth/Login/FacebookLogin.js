import axios from 'axios';
import { FB_CLIENT_ID, FB_CLIENT_SECRET, API, CLIENT } from '../../../Backend';
// import { useHistory } from 'react-router-dom';

const FacebookLogin = (accesstoken) => {
	console.log(accesstoken);
	axios
		.post(`${API}auth/convert-token`, {
			token: accesstoken,
			backend: 'facebook',
			grant_type: 'convert_token',
			client_id: FB_CLIENT_ID,
			client_secret: FB_CLIENT_SECRET,
		})
		.then((res) => {
			localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
			console.log( "res data" + res.data);
			window.location.href = `${CLIENT}`;
		});
};

export default FacebookLogin;
