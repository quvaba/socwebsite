import React from 'react';
import PropTypes from 'prop-types';
import DefaultPic from '../../data/images/staircase.png'

import Grid from '@material-ui/core/Grid';

export const Person = (props) => {

    return(
      <Grid container className="Person" justify="flex-start" spacing={3}>
        <Grid item>
          <div className="ImageContainer">
            {
              props.photoUrl.length > 0
              ? (<img className="Image" src={props.photoUrl} />)
              : (<img className="Image" src={DefaultPic} />)
            }
          </div>
        </Grid>
        <Grid item container xs={8} spacing={3} justify="flex-start" direction="column">
          <Grid item>
            {
              props.pageUrl.length > 0 ?
              (<a href={props.pageUrl} className="Name">{props.name} </a>):
              (<span>{props.name}</span>)
            }
            {
              props.gradYear ?
              (<div className="DegreeYear"> {props.degree}{' '}{props.gradYear}</div>) :
              (<div className="DegreeYear">{props.degree}</div>)
            }
          </Grid>
          <Grid item>
            {props.currentRole ?
              (<div className="CurrentRole">Now at {props.currentRole}</div>):
              (<span></span>)
            }
          </Grid>
          <Grid>
            <div className="BriefIntro">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div> 
          </Grid>
        </Grid>
      </Grid>
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
