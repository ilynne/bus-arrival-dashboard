import React from 'react';
import db from '../db';
import firebase from 'firebase';
import _ from 'lodash';
import ArrivalCard from './ArrivalCard';

export default class Arrivals extends React.PureComponent {
  state = {
    stops: []
  }

  componentDidMount() {
    this.getStops();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.selectedGroupId !== this.props.selectedGroupId) {
      this.getStops();
    }
  }

  getStops = () => {
    const uid = firebase.auth().currentUser.uid;
    db
      .collection('users')
      .doc(uid)
      .collection('groups')
      .doc(this.props.selectedGroupId)
      .collection('stops')
      .get()
      .then(doc => {
        this.setState({ stops: doc.docs})
      })
  }

  busesByStop = () => {
    return _.groupBy(this.state.stops, (stop) => ( stop.data().stopId ))
  }

  render() {
    const busesByStop = this.busesByStop();
    return (
      <div className="arrivals">
        { Object.keys(busesByStop).map((stopId, i) => (
          <ArrivalCard
            key={`${stopId}-${i}`}
            stopId={stopId}
            busRouteIds={busesByStop[stopId]}
          >
          </ArrivalCard>
        ))}
      </div>
    )
  }
}
