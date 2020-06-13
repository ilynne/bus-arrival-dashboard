import React from 'react';
import firebase from 'firebase';
import DisplayUser from './DisplayUser';
import TabList from './TabList';

export default class Navigation extends React.Component {
  state = {
    groups: []
  }

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
        { this.props.isSignedIn
          ? <TabList
              handleGroupClick={this.props.handleGroupClick}
            >
            </TabList>
          : null
        }
      </div>
    )
  }
}
