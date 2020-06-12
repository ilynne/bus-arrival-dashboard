import React from 'react';

function DirectionList(props) {

  const handleDirectionClick = (e) => {
    console.log(e.target, e.target.dataset.id)
    console.log('click')
    props.handleDirectionClick(e.target.dataset.id)
  }

  return (
    <ul>
      { props.stopGroups.map((stopGroup, i) => (
        <li
          onClick={handleDirectionClick}
          key={`direction-${i}`}
          data-id={i}>{stopGroup.name.name}</li>
        ))
      }
    </ul>
  );
}

export default DirectionList;
