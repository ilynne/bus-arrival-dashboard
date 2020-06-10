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
      <div>
        <img alt="lynne photo" src={photoURL}></img>
        <span>{displayName}</span>
        <button onClick={this.signOut}>
          Sign Out
        </button>
      </div>
    )
  }
}
