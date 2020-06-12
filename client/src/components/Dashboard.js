import React from 'react';
import firebase from 'firebase';
import Navigation from './Navigation';
import AddBus from './AddBus';

export default class Dashboard extends React.Component {
  fetchTestDatas = function () {
    fetch('/api/v1/routes')
      .then(res => res.json())
      .then((response) => { console.log("Test datas response", response); })
      .catch((error) => { console.log("Error while fetching test datas", error); })
  }

  render() {
    console.log('dashboard', firebase.auth().currentUser, firebase.auth().currentUser.uid);
    const { uid } = firebase.auth().currentUser;
    return (
      <div>
        <AddBus></AddBus>
        <button onClick={this.fetchTestDatas}>
          Fetch Test Datas
        </button>
      </div>
    )
  }
}
