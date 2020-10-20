
import React from 'react'
import checkLoggedIn from './checkLoggedIn'
import {Link} from 'react-router-dom'

function AuthControl() {
    if(checkLoggedIn()) {
        /* if (admin logged in) {}
             return (
                  <React.Fragment>
                       <Link to="/logout">Logout</Link>
                       <Link to="/profile">Admin</Link>
                  </React.Fragment>
              )
           }
        */
        
        // For normal logged in user
        return (
            <React.Fragment>
                 <Link to="/logout">Logout</Link>
                 <Link to="/profile">Profile</Link>
                 {/* temporary, remove later */}
                 <Link to="/admin">Admin</Link>
            </React.Fragment>
        )
    } 
    // For not logged in user/admin
    return (
        <React.Fragment>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </React.Fragment>
    )
}

export default AuthControl
