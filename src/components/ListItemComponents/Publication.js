import React from 'react';
import PropTypes from 'prop-types';
import {getMatchingAuthors} from '../../utils/utils.js'
import { Topic } from './Topic';
import DefaultPic from '../../data/images/siebel.jpg';

export const Publication = (props) => {
  let authorList = getMatchingAuthors(props.authors);

  const handleTopicClick = (topicName) => {
    props.handleTopicClick(topicName);
  }

  return(
    <div className="Publication">
      <img
        src={
             props.photoUrl.length > 0
             ? props.photoUrl
             : DefaultPic
           }
        className = "Image"
      />
      <span className="Info">
        <a href={props.url} className="Title">{props.title}</a>
        <span className="Conference">{props.conference}</span>
        <div>{authorList}</div>
        <div className="Description">{props.description}</div>
        <div>
          {props.topics.map(
             (topic) => <span className="Topic Secondary"> {topic} </span>
          )}
        </div>

      </span>
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
  topics: PropTypes.array,
  handleTopicClick: PropTypes.func.isRequired
}
