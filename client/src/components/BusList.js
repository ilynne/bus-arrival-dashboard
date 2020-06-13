import React from 'react';
import db from '../db';
import firebase from 'firebase';

export default class BusList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busNumber: ''
    }
  }

  componentDidMount = () => {
    console.log('BusList mount')
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }

  handleBusNumberChange = (e) => {
    console.log(this.state.busNumber)
    this.setState({
      busNumber: e.target.value
    }, () => this.props.handleBusNumberChange(this.state.busNumber));
  }

  // filterRoutesByShortName = () => {
  //   const routeForBusNumber = this.props.routesForAgency.find(route => route.shortName == this.state.busNumber);
  //   console.log(routeForBusNumber)
  //   if (routeForBusNumber) {
  //     this.setState({
  //       busRouteId: routeForBusNumber.id
  //     })
  //   } else {
  //     this.setState({
  //       busRouteId: ""
  //     })
  //   }
  // }

  render() {
    return (
      <div>
        <p>Bus</p>
        <input
          type={'text'}
          id={'bus-number'}
          name={'bus-number'}
          value={this.state.busNumber}
          required={true}
          onChange={this.handleBusNumberChange}
        >
        </input>
      </div>
    )
  }
}
