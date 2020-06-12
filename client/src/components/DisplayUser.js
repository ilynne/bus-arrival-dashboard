import React from 'react';
import firebase from 'firebase';

export default class DisplayUser extends React.Component {
  signOut = (e) => {
    e.preventDefault();
    this.props.signOut();
  }

  render() {
    const { displayName, photoURL } = firebase.auth().currentUser;
    return (
      <div class='display-user'>
        <img alt="gravatar" src={photoURL}></img>
        <span>{displayName}</span>
        <span class="clickable" onClick={this.signOut}>
          Sign Out
        </span>
      </div>
    )
  }
}
