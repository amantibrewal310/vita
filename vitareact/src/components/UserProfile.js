import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import checkLoggedIn from './auth/checkLoggedIn'
import axiosInstance from '../axios'

function UserProfile() {
    // init user data 
    const userInit = {
        username: '',
        id: '',
        email: '',
        about: '',
        first_name: ''
    }
    const [user, setUser] = useState(userInit);
    const history = useHistory();

    useEffect(() => {
        if(checkLoggedIn()) {
            const userEmail = localStorage.getItem('email');
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
        } 
    },[setUser])

    // TODO: 
    // forms for profile update 

    if(checkLoggedIn()) {
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

    history.goBack();
    window.reload();
    return <></>
}

export default UserProfile
