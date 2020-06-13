import React from 'react';

function StopList(props) {

  const handleStopClick = (e) => {
    props.handleStopClick(e.target.dataset.id)
  }

  return (
    <div>
      <p>Stops</p>
      <ul>
        { props.stopsForDirection.map((stop, i) => (
          <li
            className={props.selectedStops.includes(stop.id) && 'selected'}
            onClick={handleStopClick}
            key={`stop-${i}`}
            data-id={stop.id}>{stop.name}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default StopList;
