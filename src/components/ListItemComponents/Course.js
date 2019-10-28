import React from 'react';
import PropTypes from 'prop-types';

export const Course = (props) => {
  return(
    <div>

     { props.url ?
      (<div><a href={props.url}>{props.title}</a></div>) :
      (<div>{props.title} ({props.abbrev})</div>)
     }

      <div><span>{props.abbrev}</span></div>
      <div><span>{props.schedule}</span></div>
      <div><span>{props.description}</span></div>

     {props.prior_versions.length > 0 ?
      (
        <div>Prior versions of the course

          {props.prior_versions.map(priorVersion =>
              priorVersion.url ?
              (<span> - <a href={priorVersion.url}> {priorVersion.year} </a> </span>) :
              (<span> - {priorVersion.year} </span>)
              )
          }

        </div>
      ) :
      (<div></div>)
     }
    </div>
  );
}

Course.propTypes = {
  title: PropTypes.string.isRequired,
  schedule: PropTypes.string.isRequired,
  abbrev: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string.isRequired,
  prior_versions: PropTypes.array,
}
