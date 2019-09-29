import React from 'react';
import PropTypes from 'prop-types';

export const Person = (props) => {

    return(
      <span className="Person">
        <div className="PeopleImageContainer">
          <img className="PersonImage" src={props.photoUrl} />
        </div>
        <div>
          {props.pageUrl.length > 0 ?
          (<a href={props.pageUrl}>{props.name} </a>):
          (<span>{props.name}</span>)
        }
        </div>
        <div>{props.degree} {props.gradYear ?
          (<span>{props.gradYear}</span>) :
          (<span></span>)
          }
        {props.currentRole ?
          (<div>Now at <b>{props.currentRole}</b></div>):
          (<span></span>)
        }
        </div>
      </span>
    );

}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  pageUrl: PropTypes.string,
  photoUrl: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  currentRole: PropTypes.string,
  gradYear: PropTypes.number
};
