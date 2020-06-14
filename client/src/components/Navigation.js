import React from 'react';
import TabList from './TabList';

export default class Navigation extends React.Component {
  state = {
    groups: []
  }

  render() {
    return (
      <div className={"navigation"}>
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
