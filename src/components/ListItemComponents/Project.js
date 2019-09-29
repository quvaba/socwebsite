import React from 'react';
import PropTypes from 'prop-types';

export const Project = (props) => {

  const handleClick = (e) => {
    props.onClick(props.id);
  }

  const applyCharCap = (description) => {
    let short = description;
    if (short.length > 350){
      short = short.substring(1, 350) + "...";
    }
    return short;
  }

  return(
    <div>
      <div onClick={handleClick} className="ProjectTitle">{props.title}</div>
      <div>{applyCharCap(props.description)}</div>
    </div>
  );
}

Project.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  // photoUrl: PropTypes.string,
  publications: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
