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
              admin={this.props.admin}
              selectedGroupId={this.props.selectedGroupId}
              handleGroupClick={this.props.handleGroupClick}
            >
            </TabList>
          : null
        }
      </div>
    )
  }
}
