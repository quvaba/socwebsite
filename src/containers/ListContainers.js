import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PeopleList, PublicationList, CourseList, ProjectList } from '../components/ListComponents';
import { getMatchingPubsByTopic } from '../utils/utils.js';
import { Topic } from '../components/ListItemComponents/Topic.js';

export class ListPage extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(projectTitle){
    this.props.onClick(projectTitle);
  }

  render(){

    let entryList;

    switch (this.props.pageType) {
      case "People":
        entryList = <PeopleList json={this.props.json} />;
        break;

      case "Publications":
        entryList = <PublicationListContainer json={this.props.json} />
        break;

      case "Courses":
        entryList = <CourseList json={this.props.json} />
        break;

      default:

    }

    return(
      <div className="ListPage">{entryList}</div>
    );
  }
}

ListPage.propTypes = {
  json: PropTypes.object.isRequired,
  pageType: PropTypes.string.isRequired
}


export class PublicationListContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      displayTopic: props.json.topics[0]
    }; // display all topics by default
    console.log(this.state.displayTopic); // yep, correct
    this.handleTopicClick = this.handleTopicClick.bind(this);
  }

  handleTopicClick(topicName, topicsMap){
    // get topics map and assign selected/not selected to className
  }

  handleTopicClick(topicName){
    // CHANGE OF PLANS - WE ARE MAKING IT INTO RADIO BUTTONS
    // REFACTOR displayTopics into displayTopic - we will only display
    // one topic at a time.

    this.setState({
      displayTopic: topicName
    });
  }

  render(){

    let publications = getMatchingPubsByTopic(this.state.displayTopic);
    let topics = this.props.json.topics;
    let topicsMap = topics.map(
      (topic) => <Topic
                    className="Interactive"
                    name={topic}
                    onClick={this.handleTopicClick}
                  />
    );

    return (

      <div>
          <div className="TopicNav">
            {
              topicsMap
            }
          </div>

          <PublicationList
              publications={publications}
              displayTopic={this.state.displayTopic}
              handleTopicClick={this.handleTopicClick}
          />
      </div>

    );
  }
}

PublicationListContainer.propTypes = {
  json: PropTypes.object.isRequired,
}
