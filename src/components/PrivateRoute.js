import React, { Component, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({
    component: Component,
    ...rest
}) {
    const [auth, setAuth] = useState(localStorage.getItem('token') || '');
    return (
        <Route
            {...rest}
            render={props =>
                !auth ? (
                    <Redirect to='/' />
                ) : (
                        <Component {...props} />
                    )
            }
        />
    );
}

export default PrivateRoute;