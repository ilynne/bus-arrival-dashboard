import React from 'react';
import DirectionList from './DirectionList';
import StopList from './StopList';
import GroupList from './GroupList';
import BusList from './BusList';
import GroupPreviewList from './GroupPreviewList';

export default class AddBus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busNumber: '',
      busRouteId: '',
      routesForAgency: [],
      stopsByBusRouteId: {},
      directionIndex: -1,
      selectedGroupId: ''
    }
    this.handleBusNumberChange = this.handleBusNumberChange.bind(this);
    this.fetchRoutesForAgency = this.fetchRoutesForAgency.bind(this);
    this.fetchStopsForRoute = this.fetchStopsForRoute.bind(this);
    this.handleDirectionClick = this.handleDirectionClick.bind(this);
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
    this.setState({
      directionIndex: -1,
      busNumber: busNumber
    }, () => this.filterRoutesByShortName())
  }

  handleGroupClick(groupId) {
    this.setState({
      selectedGroupId: groupId,
      busNumber: '',
      busRouteId: '',
      directionIndex: -1
    })
  }

  handleDirectionClick(index) {
    console.log('direction', index)
    this.setState({
      directionIndex: index
    })
  }

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

  stopGroups = () => {
    const { busRouteId, stopsByBusRouteId } = this.state;
    const { entry } = stopsByBusRouteId[busRouteId] || [];
    if (entry) {
      return entry.stopGroupings[0].stopGroups;
    }
  }

  render() {
    const stopGroups = this.stopGroups();
    const stopsForDirection = this.stopsForDirection();

    return (
      <div className={'admin'}>
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
                  busNumber={this.state.busNumber}
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
                >
                </StopList>
              : null
            }
        </form>
        { this.state.selectedGroupId !== ''
          ? <GroupPreviewList
              selectedGroupId={this.state.selectedGroupId}
              routesForAgency={this.state.routesForAgency}
              selectedGroupId={this.state.selectedGroupId}>
            </GroupPreviewList>
          : null
        }
      </div>
    )
  }
}
