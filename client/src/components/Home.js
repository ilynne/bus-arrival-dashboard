import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Navigation from './Navigation';
import Dashboard from './Dashboard';

export default class Home extends React.Component {
  state = {
    isSignedIn: false,
    selectedTab: ''
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
  }

  componentDidMount() {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        user => {
          this.setState({ isSignedIn: !!user });
        }
      );
    }

    componentWillUnmount() {
      if (this.unregisterAuthObserver) {
        this.unregisterAuthObserver();
      }
    }

  signOut = () => {
    firebase.auth().signOut();
  }

  handleGroupClick = (tabId) => {
    console.log(tabId)
    this.setState({
      selectedTab: tabId
    })
  }

  render() {
    return (
      <div>
        <Navigation
          isSignedIn={this.state.isSignedIn}
          signOut={this.signOut}
          handleGroupClick={this.handleGroupClick}>
        </Navigation>
        { this.state.isSignedIn
          ? <Dashboard
              selectedTab={this.state.selectedTab}
            >
            </Dashboard>
          : <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            >
            </StyledFirebaseAuth>
        }
      </div>
    )
  }
}
