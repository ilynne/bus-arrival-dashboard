import React from 'react';

function GroupList(props) {

  const handleGroupClick = (e) => {
    props.handleGroupClick(e.target.dataset.id);
  }

  const handleGroupBlur = (e) => {
    props.handleGroupBlur(e.target.value);
    e.target.value = '';
  }

  return (
    <div>
      <p>Group</p>
      <ul>
        { props.groupList.map((group, i) => (
          <li
            onClick={handleGroupClick}
            key={`group-${i}`}
            data-id={group.id}>{group.name}</li>
          ))
        }
      </ul>
      <input
        type={'text'}
        id={'group-name'}
        name={'group-name'}
        onBlur={handleGroupBlur}
      >
      </input>
    </div>
  );
}

export default GroupList;
