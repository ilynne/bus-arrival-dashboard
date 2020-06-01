import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

export default class Home extends React.Component {
  uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/dashboard',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => {
          this.props.history.push('/dashboard');
        }
    }
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Sign in:</p>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}

        >
        </StyledFirebaseAuth>
      </div>
    )
  }
}
