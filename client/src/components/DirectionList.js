import React from 'react';
import PropTypes from 'prop-types';

function DirectionList(props) {

  const handleDirectionClick = (e) => {
    props.handleDirectionClick(e.target.dataset.id)
  }

  return (
    <div>
      <p>Direction</p>
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
    </div>
  );
}

export default DirectionList;

DirectionList.propTypes = {
  stopGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDirectionClick: PropTypes.func.isRequired,
  directionIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}
