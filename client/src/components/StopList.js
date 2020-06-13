import React from 'react';

function StopList(props) {

  const handleStopClick = (e) => {
    props.handleStopClick(e.target.dataset.id)
  }

  return (
    <ul>
      { props.stopsForDirection.map((stop, i) => (
        <li
          className={props.selectedStops.includes(stop.id) && 'selected'}
          onClick={handleStopClick}
          key={`direction-${i}`}
          data-id={stop.id}>{stop.name}</li>
        ))
      }
    </ul>
  );
}

export default StopList;
