import React from 'react';

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
    const { arrival, now } = this.props
    const arrivalTime = this.arrivalTime()
    const minutesToArrival = this.minutesToArrival()
    const classNameList = this.classNameList()
    return (
      <tr className={classNameList}>
        <td>{arrival.routeShortName}</td>
        <td>{arrival.predictedArrivalTime}</td>
        <td>{arrival.scheduledArrivalTime}</td>
        <td>{arrivalTime}</td>
        <td>{arrivalTime - now}</td>
        <td>{`${minutesToArrival} min`}</td>
      </tr>
    )}
}
