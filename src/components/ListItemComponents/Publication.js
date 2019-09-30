import React from 'react';
import PropTypes from 'prop-types';
import {getMatchingAuthors} from '../../utils/utils.js'

export const Publication = (props) => {
  let authorList = getMatchingAuthors(props.authors);

  return(
    <div className="Publication">
      <a href={props.url} className="PublicationTitle">{props.title}</a>
      <span className="PublicationConference">{props.conference}</span>
      <div className="PublicationDescription">{props.description}</div>
      <div>{authorList}</div>
    </div>
  );
}


Publication.propTypes = {
  title: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
  description: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  conference: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  awards: PropTypes.array,
}
