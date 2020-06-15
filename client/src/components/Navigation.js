import React from 'react';
import TabList from './TabList';
import PropTypes from 'prop-types';

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

Navigation.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  handleGroupClick: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
  selectedGroupId: PropTypes.string.isRequired,
}
