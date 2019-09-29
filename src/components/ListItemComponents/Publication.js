import React from 'react';
import PropTypes from 'prop-types';
import {getMatchingAuthors} from '../../utils/utils.js'

export const Publication = (props) => {
  let authorList = getMatchingAuthors(props.authors);

  return(
    <div className="Publication">
      <a href={props.url} className="PublicationTitle">{props.title}</a>
      <span>{props.conference}</span>
      <div>{authorList}</div>
    </div>
  );
}


Publication.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  conference: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  awards: PropTypes.array,
}
