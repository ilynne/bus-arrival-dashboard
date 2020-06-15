import React from 'react';
import ArrivalDetailList from './ArrivalDetailList';
import PropTypes from 'prop-types';

export default class ArrivalCard extends React.Component {
  state = {
    arrivalsForStop: []
  }

  componentDidMount = () => {
    this.arrivalSubscription = setInterval(this.fetchArrivalsForStop.bind(this), 60000);
    this.fetchArrivalsForStop();
  }

  componentWillUnmount() {
    clearInterval(this.arrivalSubscription);
  }

  fetchArrivalsForStop = function () {
    const { stopId } = this.props;

    fetch(`/api/v1/stops/${stopId}/arrivals`)
      .then(res => res.json())
      .then((response) => { this.setArrivalsForStop(response.data) })
      .catch((error) => { console.log("Error fetching arrival for stop", error); })
  }

  setArrivalsForStop = (data) => {
    this.setState({
      arrivalsForStop: data
    });
  }

  stopLabel = () => {
    const { references } = this.state.arrivalsForStop
    if (!references) {
      return `retrieving information for stop ${this.props.stopId}...`
    }
    const { stops } = references
    const stopData = stops.find(stop => stop.id === this.props.stopId);
    return `${stopData.name} - ${stopData.direction}`;
  }

  busRouteIds = () => {
    const busRouteIds = this.props.busRouteIds.map(busRouteId => ( busRouteId.data().busRouteId))
    return busRouteIds
  }

  arrivalsForBusRoutes = () => {
    const { entry } = this.state.arrivalsForStop
    if (!entry) {
      return []
    }
    const { arrivalsAndDepartures } = entry
    const busRouteIds = this.busRouteIds();
    const arrivals = arrivalsAndDepartures.filter(arrival => busRouteIds.includes(arrival.routeId))
    return arrivals
  }

  render() {
    const stopLabel = this.stopLabel();
    const arrivalsForBusRoutes = this.arrivalsForBusRoutes();
    const now = Date.now();

    return (
      <div className={'arrival-card'}>
        <h2>{stopLabel}</h2>
        { arrivalsForBusRoutes && arrivalsForBusRoutes.length > 0
          ? <ArrivalDetailList
              arrivalsForBusRoutes={arrivalsForBusRoutes}
              now={now}
            >
            </ArrivalDetailList>
          : <p>no arrival details found</p>
        }
      </div>
    )
  }
}

ArrivalCard.propTypes = {
  stopId: PropTypes.string.isRequired,
  busRouteIds: PropTypes.arrayOf(PropTypes.object).isRequired,
}
