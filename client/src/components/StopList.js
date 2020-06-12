import React from 'react';

function StopList(props) {

  const handleStopClick = (e) => {
    props.handleStopClick(e.target.dataset.id)
  }

  return (
    <ul>
      { props.stopsForDirection.map((stop, i) => (
        <li
          onClick={handleStopClick}
          key={`direction-${i}`}
          data-id={stop.id}>{stop.name}</li>
        ))
      }
    </ul>
  );
}

export default StopList;
