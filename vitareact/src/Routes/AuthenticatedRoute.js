
// prevents user fro goint to these pages when logged 

import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import checkLoggedIn from '../components/auth/checkLoggedIn'

const AuthenticatedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {props =>
                (!checkLoggedIn()) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/home",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )
}

export default AuthenticatedRoute
