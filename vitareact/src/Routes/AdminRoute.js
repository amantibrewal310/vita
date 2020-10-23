import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import checkLoggedIn from '../components/auth/checkLoggedIn'
import checkAdminLoggedIn from '../components/auth/checkAdminLoggedIn'

const AdminRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {props =>
                (checkLoggedIn() && checkAdminLoggedIn()) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/notfound",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )
}

export default AdminRoute
