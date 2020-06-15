import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

export default class DisplayUser extends React.Component {
  signOut = (e) => {
    e.preventDefault();
    this.props.signOut();
  }

  render() {
    const { displayName, photoURL } = firebase.auth().currentUser;
    return (
      <div className='display-user'>
        <img alt="gravatar" src={photoURL}></img>
        <span className={'user-name'}>{displayName}</span>
        <span className="clickable" onClick={this.signOut}>
          Sign Out
        </span>
      </div>
    )
  }
}

DisplayUser.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
}
