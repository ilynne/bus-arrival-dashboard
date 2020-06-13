import React from 'react';
import db from '../db';
import firebase from 'firebase';
import DisplayUser from './DisplayUser';

export default class TabList extends React.Component {
  state = {
    groups: []
  }
  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;

    this.unsubscribe = db
      .collection('users')
      .doc(uid)
      .collection('groups')
      .onSnapshot(snapshot => {
        this.setState({ groups: snapshot.docs });
      });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleGroupClick = (e) => {
    this.props.handleGroupClick(e.target.dataset.id)
  }

  render() {
    return (
      <div className="tabs">
        { this.state.groups.map((group) => (
          <span
            className={'clickable'}
            onClick={this.handleGroupClick}
            key={group.id}
            data-id={group.id}>{group.data().name}</span>
          ))
        }
        <span
          className={'clickable'}
          onClick={this.handleGroupClick}
          key={'admin-tab'}
          data-id={'admin'}>Admin</span>
      </div>
    )
  }
}
