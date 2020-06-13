import React from 'react';

function DirectionList(props) {

  const handleDirectionClick = (e) => {
    props.handleDirectionClick(e.target.dataset.id)
  }

  return (
    <ul>
      { props.stopGroups.map((stopGroup, i) => (
        <li
          className={Number(props.directionIndex) === i ? 'selected' : null}
          onClick={handleDirectionClick}
          key={`direction-${i}`}
          data-id={i}>{stopGroup.name.name}</li>
        ))
      }
    </ul>
  );
}

export default DirectionList;
