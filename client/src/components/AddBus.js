import React from 'react';
import firebase from 'firebase';
import DirectionList from './DirectionList';

export default class AddBus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busNumber: '',
      busRouteId: '',
      routesForAgency: [],
      stopGroupId: '',
      stopGroupsByBusRouteId: {}
    }
    this.handleBusNumberChange = this.handleBusNumberChange.bind(this);
    this.fetchRoutesForAgency = this.fetchRoutesForAgency.bind(this);
    this.fetchStopsForRoute = this.fetchStopsForRoute.bind(this);
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
                            this.setStopGroupsByBusRouteId(response.data); })
      .catch((error) => { console.log("Error while fetching test datas", error); })
  }

  setRoutesForAgency = (data) => {
    const { list, references } = data;
    console.log(list, references);
    this.setState({
      routesForAgency: list
    });
  }

  setStopGroupsByBusRouteId = (data) => {
    const { entry } = data;
    const { stopGroupings } = entry;
    const { busRouteId } = this.state
    this.setState({
      stopGroupsByBusRouteId: {
        [busRouteId]: stopGroupings[0].stopGroups,
        ...this.state.stopGroupsByBusRouteId
      }
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }

  handleBusNumberChange(e) {
    console.log(this.state.busNumber)
    this.setState({
      busNumber: e.target.value
    }, () => this.filterRoutesByShortName())
  }

  handleDirectionClick(index) {
    console.log(index)
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

  render() {
    console.log('add bus', firebase.auth().currentUser, firebase.auth().currentUser.uid);
    const { uid } = firebase.auth().currentUser;
    const { busRouteId, stopGroupsByBusRouteId } = this.state;
    const stopGroups = stopGroupsByBusRouteId[busRouteId] || [];
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
              >
              </DirectionList>
            : null
          }
      </form>
    )
  }
}
