import React from 'react';
import db from '../db';
import firebase from 'firebase';
import _ from 'lodash';
import GroupPreviewCard from './GroupPreviewCard';
import PropTypes from 'prop-types';

export default class GroupPreviewList extends React.PureComponent {
  state = {
    stops: []
  }

  componentDidMount() {
    this.getStops();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  getStops = () => {
    const uid = firebase.auth().currentUser.uid;
    if (!this.props.selectedGroupId) {
      return
    }
    this.unsubscribe = db
      .collection('users')
      .doc(uid)
      .collection('groups')
      .doc(this.props.selectedGroupId)
      .collection('stops')
      .onSnapshot(snapshot => {
        this.setState({ stops: snapshot.docs });
      });
  }

  removeStop = (stopId) => {
    const uid = firebase.auth().currentUser.uid;
    const { selectedGroupId } = this.props;
    db
      .collection('users')
      .doc(uid)
      .collection('groups')
      .doc(selectedGroupId)
      .collection('stops')
      .doc(stopId)
      .delete();
  }

  busesByStop = () => {
    return _.groupBy(this.state.stops, (stop) => ( stop.data().stopId ))
  }

  render() {
    const busesByStop = this.busesByStop();

    return (
      <div className="group-preview">
        { Object.keys(busesByStop).map((stopId) => (
          <GroupPreviewCard
            key={stopId}
            stopId={stopId}
            busRouteIds={busesByStop[stopId]}
            routesForAgency={this.props.routesForAgency}
            handleDeleteClick={this.removeStop}
          >
          </GroupPreviewCard>
        ))}
      </div>
    )
  }
}

GroupPreviewList.propTypes = {
  selectedGroupId: PropTypes.string.isRequired,
  routesForAgency: PropTypes.arrayOf(PropTypes.object).isRequired
}
