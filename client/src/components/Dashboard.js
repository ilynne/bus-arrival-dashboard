import React from 'react';
import firebase from 'firebase';
import Navigation from './Navigation';
import AddBus from './AddBus';

export default class Dashboard extends React.Component {
  render() {
    console.log('dashboard', firebase.auth().currentUser, firebase.auth().currentUser.uid);
    const { uid } = firebase.auth().currentUser;
    return (
      <div>
        { this.props.selectedTab === 'admin'
          ? <AddBus></AddBus>
          : null
        }
      </div>
    )
  }
}
