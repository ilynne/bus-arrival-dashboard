import React from 'react';
import firebase from 'firebase';
import DisplayUser from './DisplayUser';

export default class Navigation extends React.Component {
    render() {

    return (
      <div className="navigation">
        <div className="title">Bus Arrivals</div>
        { this.props.isSignedIn
          ? <DisplayUser
              isSignedIn={this.props.isSignedIn}
              signOut={this.props.signOut} />
          : null
        }
        <div className="tabs">
          <span>tab here</span>
        </div>
      </div>
    )
  }
}
