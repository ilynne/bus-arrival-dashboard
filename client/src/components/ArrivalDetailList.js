import React from 'react';
import ArrivalDetail from './ArrivalDetail';

export default class ArrivalDetailList extends React.Component {
  render() {
    return (
      <table
        className={'arrivals'}
        cellSpacing={0}>
        <tbody>
          { this.props.arrivalsForBusRoutes.map((arrival, i) => (
            <ArrivalDetail
              arrival={arrival}
              now={this.props.now}
              key={`arrival-detail-${i}`}
            >
            </ArrivalDetail>
            ))
          }
        </tbody>
      </table>
    )}
}
