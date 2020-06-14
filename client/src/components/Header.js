import React from 'react';
import DisplayUser from './DisplayUser';

export default class Header extends React.Component {
  state = {
    groups: []
  }

  render() {
    return (
      <div className={"header"}>
        <div className={"title"}>Bus Arrivals</div>
        <div className={'banner'}>
          BLACK LIVES MATTER
        </div>
        { this.props.isSignedIn
          ? <DisplayUser
              isSignedIn={this.props.isSignedIn}
              signOut={this.props.signOut} />
          : <div
              className={'display-user'}
            >
              signed out
            </div>
        }
      </div>
    )
  }
}
