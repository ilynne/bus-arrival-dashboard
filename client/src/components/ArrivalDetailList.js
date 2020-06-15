import React from 'react';
import ArrivalDetail from './ArrivalDetail';
import PropTypes from 'prop-types';

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

ArrivalDetailList.propTypes = {
  arrivalsForBusRoutes: PropTypes.arrayOf(PropTypes.object).isRequired,
  now: PropTypes.number.isRequired,
}
