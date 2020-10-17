
import React from 'react'
import checkLoggedIn from './checkLoggedIn'
import {Link} from 'react-router-dom'

function AuthControl() {
    if(checkLoggedIn()) {
        return (
            <React.Fragment>
                 <Link to="/logout">Logout</Link>
                 <Link to="/profile">Profile</Link>
            </React.Fragment>
        )
    } 
    return (
        <React.Fragment>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </React.Fragment>
    )
}

export default AuthControl
