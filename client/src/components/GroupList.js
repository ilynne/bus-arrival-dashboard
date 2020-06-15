import React from 'react';
import db from '../db';
import firebase from 'firebase';
import PropTypes from 'prop-types';

export default class GroupList extends React.Component {
  state = {
    newGroupName: '',
    groups: []
  }

  handleGroupChange = (e) => {
    this.setState({
      newGroupName: e.target.value
    })
  }

  handleGroupClick = (e) => {
    this.props.handleGroupClick(e.target.dataset.id);
  }

  handleGroupBlur = (e) => {
    if (this.state.newGroupName === '') {
      return
    } else {
      this.addGroup();
    }
  }

  addGroup = (groupName) => {
    const uid = firebase.auth().currentUser.uid;
    db
      .collection('users')
      .doc(uid)
      .collection('groups')
      .add({
        name: this.state.newGroupName
      }).then(() => {
        this.setState({ newGroupName: '' })
      })
  }

  removeGroup = (e) => {
    const uid = firebase.auth().currentUser.uid;
    db
      .collection('users')
      .doc(uid)
      .collection('groups')
      .doc(e.target.dataset.id)
      .delete();
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

  render() {
    return (
      <div>
        <p>Group</p>
        <ul>
          { this.state.groups.map((group) => (
            <li
              className={this.props.selectedGroupId === group.id ? 'selected' : null}
              onClick={this.handleGroupClick}
              key={group.id}
              data-id={group.id}>
                {group.data().name}
                &nbsp;
                <span
                  className={'clickable delete-link'}
                  data-id={group.id}
                  onClick={this.removeGroup}
                >
                  delete
                </span>
            </li>
            ))
          }
        </ul>
        <input
          type={'text'}
          id={'group-name'}
          name={'group-name'}
          onChange={this.handleGroupChange}
          onBlur={this.handleGroupBlur}
        >
        </input>
      </div>
    );
  }
}


GroupList.propTypes = {
  handleGroupClick: PropTypes.func.isRequired,
  selectedGroupId: PropTypes.string.isRequired,
}
