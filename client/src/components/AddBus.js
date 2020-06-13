import React from 'react';
import firebase from 'firebase';
import db from '../db';
import DirectionList from './DirectionList';
import StopList from './StopList';
import GroupList from './GroupList';
import BusList from './BusList';

export default class AddBus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busNumber: '40',
      busRouteId: '1_102574',
      routesForAgency: [],
      stopGroupId: '',
      stopsByBusRouteId: {},
      directionIndex: -1,
      selectedStops: [],
      selectedGroupId: 'flxsiBckgnPPBqYm2teq'
    }
    this.handleBusNumberChange = this.handleBusNumberChange.bind(this);
    this.fetchRoutesForAgency = this.fetchRoutesForAgency.bind(this);
    this.fetchStopsForRoute = this.fetchStopsForRoute.bind(this);
    this.handleDirectionClick = this.handleDirectionClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleGroupClick = this.handleGroupClick.bind(this);
  }

  componentDidMount = () => {
    this.fetchRoutesForAgency();
  }

  fetchRoutesForAgency = function () {
    fetch('/api/v1/routes')
      .then(res => res.json())
      .then((response) => { this.setRoutesForAgency(response.data) })
      .catch((error) => { console.log("Error while fetching test datas", error); })
  }

  fetchStopsForRoute = () => {
    console.log('fetch stops', this.state.busRouteId)
    fetch(`/api/v1/routes/${this.state.busRouteId}/stops`)
      .then(res => res.json())
      .then((response) => { console.log(response);
                            this.setStopsByBusRouteId(response.data); })
      .catch((error) => { console.log("Error while fetching test datas", error); })
  }

  setRoutesForAgency = (data) => {
    const { list, references } = data;
    console.log(list, references);
    this.setState({
      routesForAgency: list
    });
  }

  setStopsByBusRouteId = (data) => {
    const { busRouteId } = this.state
    console.log(data)
    this.setState({
      stopsByBusRouteId: {
        [busRouteId]: data,
        ...this.state.stopsByBusRouteId
      }
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }

  handleBusNumberChange(busNumber) {
    // console.log(this.state.busNumber)
    this.setState({
      directionIndex: -1,
      busNumber: busNumber,
      selectedStops: [],
    }, () => this.filterRoutesByShortName())
  }

  handleGroupClick(groupId) {
    this.setState({
      selectedGroupId: groupId
    })
  }

  handleDirectionClick(index) {
    console.log('direction', index)
    this.setState({
      selectedStops: [],
      directionIndex: index
    })
  }

  handleStopClick(stopId) {
    console.log('stop', stopId)
    const { selectedStops } = this.state
    if (selectedStops.includes(stopId)) {
      this.setState({
        selectedStops: selectedStops.filter(stop => stop !== stopId)
      })
    } else {
      this.setState({
        selectedStops: [stopId, ...selectedStops]
      })
    }
  }

  // doCrud(stopId) {
  //   console.log('crud')
  //   const uid = firebase.auth().currentUser.uid;
  //   const { selectedGroupId } = this.state;
  //   db
  //     .collection('users')
  //     .doc(uid)
  //     .collection('groups')
  //     .doc(selectedGroupId)
  //     .collection('stops')
  //     .add({
  //       id: stopId
  //     }).then(() => {
  //       console.log('stop added')
  //     })
  // }

  stopsForDirection() {
    const stopGroups = this.stopGroups();
    const { directionIndex } = this.state;
    if (directionIndex >= 0) {
      const stopIds = stopGroups[directionIndex].stopIds;
      // console.log(stopIds)
      const { busRouteId, stopsByBusRouteId } = this.state;
      const { references } = stopsByBusRouteId[busRouteId] || [];
      return references.stops.filter(stop => stopIds.includes(stop.id));
    }
  }

  filterRoutesByShortName = () => {
    const routeForBusNumber = this.state.routesForAgency.find(route => route.shortName == this.state.busNumber);
    console.log(routeForBusNumber)
    if (routeForBusNumber) {
      this.setState({
        busRouteId: routeForBusNumber.id
      }, () => { this.fetchStopsForRoute() });
    } else {
      this.setState({
        busRouteId: ""
      })
    }
  }

  // addBus = (stopId) => {
  //   console.log('addBus')
  //   const uid = firebase.auth().currentUser.uid;
  //   const { selectedGroupId } = this.state;
  //   db
  //     .collection('users')
  //     .doc(uid)
  //     .collection('groups')
  //     .doc(selectedGroupId)
  //     .collection('stops')
  //     .add({
  //       id: stopId,
  //     }).then(() => {
  //       console.log('stop added')
  //     })
  // }

  stopGroups = () => {
    const { busRouteId, stopsByBusRouteId } = this.state;
    const { entry } = stopsByBusRouteId[busRouteId] || [];
    if (entry) {
      return entry.stopGroupings[0].stopGroups;
    }
  }

  render() {
    console.log('add bus', firebase.auth().currentUser, firebase.auth().currentUser.uid);
    const { uid } = firebase.auth().currentUser;
    const stopGroups = this.stopGroups();
    const stopsForDirection = this.stopsForDirection();

    return (
      <form
        className={'add-bus-form'}
        onSubmit={this.handleFormSubmit}
        method={'post'}>
          <GroupList
            groupList={this.state.groups}
            handleGroupClick={this.handleGroupClick}
            selectedGroupId={this.state.selectedGroupId}
          >
          </GroupList>

          { this.state.selectedGroupId !== ''
            ? <BusList
                handleBusNumberChange={this.handleBusNumberChange}>
              </BusList>
            : this.state.selectedGroupId
          }

          { stopGroups
            ? <DirectionList
                stopGroups={stopGroups}
                handleDirectionClick={this.handleDirectionClick}
                directionIndex={this.state.directionIndex}
              >
              </DirectionList>
            : null
          }

          { stopsForDirection
            ? <StopList
                busRouteId={this.state.busRouteId}
                selectedGroupId={this.state.selectedGroupId}
                stopsForDirection={stopsForDirection}
                handleStopClick={this.handleStopClick}
                selectedStops={this.state.selectedStops}
              >
              </StopList>
            : null
          }
      </form>
    )
  }
}
