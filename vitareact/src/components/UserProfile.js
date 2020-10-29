import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import checkLoggedIn from './auth/checkLoggedIn'
import axiosInstance from '../axios'
import GetAllWatchList from './Watchlist/GetAllWatchList'


function UserProfile() {
    // init user data 
    const userInit = {
        username: '',
        id: '',
        email: '',
        about: '',
        first_name: ''
    }
    const [loading, setLoading] = useState(true)
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
                    setLoading(false)
                });
        } 
    },[setUser])

    // TODO: 
    // forms for profile update 

    if(checkLoggedIn()) {
        return (
            <div>
                <div>
                    <h1>User Profile</h1>
                    <h2>Hi {user.first_name}, How are you today?</h2>
                    <p>@{user.username}</p>
                    <p>{user.email}</p>
                    <p>About: {user.about}</p>
                </div>
                <div>
                    <h3>Watchlists</h3>
                    {
                        (!loading)
                        ? <GetAllWatchList userId={user.id} />
                        : <></>
                    }
                </div>
            </div>
        )
    }

    history.push('/');
    return <></>
}

export default UserProfile
