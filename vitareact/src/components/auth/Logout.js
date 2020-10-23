import React from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import checkLoggedIn from './checkLoggedIn';

function Logout() {
	const history = useHistory();

	// if user is not logged in and tries to logout rect
	if(!checkLoggedIn()) {
		history.goBack();
		window.reload();	
		return <></>;
	}

	const response = axiosInstance.post('user/logout/blacklist/', {
		refresh_token: localStorage.getItem('refresh_token'),
	});

	localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');
	localStorage.removeItem('expiry_time');
	localStorage.removeItem('email');
	localStorage.removeItem('admin');
	axiosInstance.defaults.headers['Authorization'] = null;
	
	history.push('/login');
	window.location.reload();

	return <div></div>;
}

export default Logout