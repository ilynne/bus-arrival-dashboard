import React from 'react';
import firebase from 'firebase';
import DirectionList from './DirectionList';
import StopList from './StopList';

export default class AddBus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busNumber: '',
      busRouteId: '',
      routesForAgency: [],
      stopGroupId: '',
      stopsByBusRouteId: {},
      directionIndex: -1,
      selectedStops: [],
    }
    this.handleBusNumberChange = this.handleBusNumberChange.bind(this);
    this.fetchRoutesForAgency = this.fetchRoutesForAgency.bind(this);
    this.fetchStopsForRoute = this.fetchStopsForRoute.bind(this);
    this.handleDirectionClick = this.handleDirectionClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    // this.filterRoutesByShortName = this.filterRoutesByShortName.bind(this);
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

  handleBusNumberChange(e) {
    console.log(this.state.busNumber)
    this.setState({
      directionIndex: -1,
      busNumber: e.target.value,
      selectedStops: [],
    }, () => this.filterRoutesByShortName())
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

  stopsForDirection() {
    const stopGroups = this.stopGroups();
    const { directionIndex } = this.state;
    if (directionIndex >= 0) {
      const stopIds = stopGroups[directionIndex].stopIds;
      console.log(stopIds)
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

  stopGroups = () => {
    const { busRouteId, stopsByBusRouteId } = this.state;
    const { entry } = stopsByBusRouteId[busRouteId] || [];
    if (entry) {
      return entry.stopGroupings[0].stopGroups;
    } else {
      return [];
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
          <label htmlFor={'bus-number'}>Bus Number:</label>
          <input
            type={'text'}
            id={'bus-number'}
            name={'bus-number'}
            value={this.state.busNumber}
            required={true}
            onChange={this.handleBusNumberChange}
          >
          </input>
          { this.state.busRouteId }
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
