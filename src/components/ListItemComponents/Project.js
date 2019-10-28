/*import React from 'react';
import PropTypes from 'prop-types';
import DefaultPic from '../../data/siebel.jpg';

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
    <div className="Project">
      {
        props.imageUrls.length > 0
        ? (<img className="ProjectImage" src={props.imageUrls[0]} />)
        : (<img className="ProjectImage" src={DefaultPic} />)
      }
      <span className="ProjectInfo">
        <div onClick={handleClick} className="ProjectTitle">{props.title}</div>
        <div>{applyCharCap(props.description)}</div>
      </span>
    </div>
  );
}

Project.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  imageUrls: PropTypes.array,
  publications: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
*/
