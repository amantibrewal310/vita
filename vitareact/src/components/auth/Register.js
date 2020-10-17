
import React from 'react';
import { useHistory } from 'react-router-dom';
import checkLoggedIn from './checkLoggedIn';

function Register() {
    const history = useHistory();
    
    if(checkLoggedIn()) {
		history.goBack();	
		return <div></div>;
	}

    // display user register form 
    
    return (
        <div>
            Register Page
        </div>
    )
}

export default Register
