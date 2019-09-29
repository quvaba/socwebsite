import React from 'react';
import PropTypes from 'prop-types';

export const Karrie = (props) => {
  return(
    <div>
        <div className="KarrieIntroContainer">
          <span className="KarrieIntro">
              <img className="PersonImage" src={props.photoUrl} />
          </span>
          <span className="KarrieIntro">
              <span>
                <div id="KarrieText">{props.name}</div>
                <div>{props.position}</div>
                <div className="InfoSpacing">{props.email}</div>
                <div className="InfoSpacing">
                  {props.address.map(addressLine =>
                    <div> {addressLine} </div>
                  )}
                </div>
                <div className="InfoSpacing">{props.phone}</div>
              </span>
          </span>
        </div>

        <div className="Awards"> Awards </div>
        <div className="Awards">
        {props.awards.map( award =>
            <div> {award} </div>
          )
        }
        </div>

    </div>
  );
}

Karrie.propTypes = {
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  awards: PropTypes.array.isRequired,
}
