import React from 'react';
import AddBus from './AddBus';
import Arrivals from './Arrivals';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        { this.props.admin
          ? <AddBus></AddBus>
          : null
        }
        { this.props.selectedGroupId !== ''
          ? <Arrivals
              selectedGroupId={this.props.selectedGroupId}
            >
            </Arrivals>
          : null
        }
      </div>
    )
  }
}
