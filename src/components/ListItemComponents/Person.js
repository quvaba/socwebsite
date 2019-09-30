import React from 'react';
import PropTypes from 'prop-types';
import DefaultPic from '../../data/staircase.png'

export const Person = (props) => {

    return(
      <span className="Person">
        <div className="PeopleImageContainer">
          {
            props.photoUrl.length > 0
            ? (<img className="PersonImage" src={props.photoUrl} />)
            : (<img className="PersonImage" src={DefaultPic} />)
          }
        </div>
        <div>
          {props.pageUrl.length > 0 ?
          (<a href={props.pageUrl} className="PersonName">{props.name} </a>):
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
