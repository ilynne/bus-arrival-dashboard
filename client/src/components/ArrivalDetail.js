import React from 'react';
import PropTypes from 'prop-types';

export default class ArrivalDetail extends React.Component {

  arrivalTime = () => {
    const { scheduledArrivalTime, predictedArrivalTime } = this.props.arrival
    return Math.max(scheduledArrivalTime, predictedArrivalTime)
  }

  minutesToArrival = () => {
    const { now } = this.props
    const arrivalTime = this.arrivalTime();
    return Math.floor((arrivalTime - now) / 60000);
  }

  classNameList = () => {
    const minutesToArrival = this.minutesToArrival();
    const classNames = []
    if (!this.props.arrival.predicted) {
      classNames.push('scheduled')
    }
    if (minutesToArrival < 1) {
      classNames.push('past')
    } else if (minutesToArrival < 6) {
      classNames.push('warning');
    } else if (minutesToArrival < 11) {
      classNames.push('soon');
    }
    return classNames.join(' ')
  }

  render() {
    const { arrival } = this.props
    const minutesToArrival = this.minutesToArrival()
    const classNameList = this.classNameList()
    return (
      <tr className={classNameList}>
        <td>{arrival.routeShortName}</td>
        <td className={'time-column'}>{`${minutesToArrival} min`}</td>
      </tr>
    )}
}

ArrivalDetail.propTypes = {
  arrival: PropTypes.object.isRequired,
  now: PropTypes.number.isRequired,
}
