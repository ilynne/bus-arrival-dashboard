
import React from 'react';
import firebase from 'firebase';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (

    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (
      firebase.auth().currentUser
      ? <Component {...props} />
      : <Redirect to="/" />
    )} />
  );
};

export default PrivateRoute;
