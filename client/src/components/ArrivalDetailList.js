import React from 'react';
import ArrivalDetail from './ArrivalDetail';

export default class ArrivalDetailList extends React.Component {
  render() {
    const { arrivalsForBusRoutes } = this.props

    return (
      <table className={'arrivals'}>
        <tbody>
          { this.props.arrivalsForBusRoutes.map((arrival, i) => (
            <ArrivalDetail
              arrival={arrival}
              now={this.props.now}
            >
            </ArrivalDetail>
            ))
          }
        </tbody>
      </table>
    )}
}
