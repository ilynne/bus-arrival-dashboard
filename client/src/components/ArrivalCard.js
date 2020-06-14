import React from 'react';
import firebase from 'firebase';

export default class ArrivalCard extends React.Component {


  render() {
    return (
      <div>
        <p>{this.props.stopId}</p>
        { this.props.busRouteIds.map((busRouteId, i) => (
            <div key={`${busRouteId}-${i}`}>
              {busRouteId.data().busRouteId}
            </div>
            ))
          }
      </div>
    )
  }
}
