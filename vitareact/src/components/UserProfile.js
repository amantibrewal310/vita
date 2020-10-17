import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import checkLoggedIn from './auth/checkLoggedIn'
import axiosInstance from '../axios'

function UserProfile() {
    const history = useHistory();

	// if user is not logged in and tries to see profile rect
	// if(!checkLoggedIn()) {
	// 	history.goBack();	
	// 	return <div></div>;
	// }

    // get user data 
    const userInit = {
        username: '',
        id: '',
        email: '',
        about: '',
        first_name: ''
    }

    const [user, setUser] = useState(userInit);
    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        axiosInstance
        .get(`user/byemail/${userEmail}/`)
        .then(res => {
            // TODO:
            // check if valid user is retured 
            
            setUser({
                ...user,
                username: res.data.username,
                id: res.data.id,
                email: res.data.email,
                about: res.data.about,
                first_name: res.data.first_name
            })
        });
    }, [setUser])

    return (
        <div>
            <h1>User Profile</h1>
            <h2>Hi {user.first_name}, How are you today?</h2>
            <p>@{user.username}</p>
            <p>{user.email}</p>
            <p>About: {user.about}</p>
        </div>
    )
}

export default UserProfile
