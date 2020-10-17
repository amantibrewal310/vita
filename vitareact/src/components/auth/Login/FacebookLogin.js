import axios from 'axios';
// import { useHistory } from 'react-router-dom';

const FacebookLogin = (accesstoken) => {
	console.log(accesstoken);
	axios
		.post('http://127.0.0.1:8000/auth/convert-token', {
			token: accesstoken,
			backend: 'facebook',
			grant_type: 'convert_token',
			client_id: 'a1fQR0KV0WANB7FvhiO3btsgJYkrjJtpalTdeFzT',
			client_secret: 'ujgrMGxkt7fgqEpoxFpDInFjzfmgRKYScshcBaEawCu0l8wAm85XpG7DFdX9kFLD6PLsPRet0aNnEBmLnvOXyyW5WRy0ZsJtsY5ESk5sEkMgpybW6PKgUmmYtznlK7dL',
		})
		.then((res) => {
			localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
			console.log( "res data" + res.data);
			window.location.href = "http://localhost:3000/";
		});
};

export default FacebookLogin;