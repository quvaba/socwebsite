import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PeopleList, PublicationList, CourseList, ProjectList } from '../components/ListComponents';
import { getMatchingPubsByTopics } from '../utils/utils.js';
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
      displayTopics: [...props.json.topics]
    }; // display all topics by default
    this.handleTopicClick = this.handleTopicClick.bind(this);
  }

  handleTopicClick(topicName){
    // change this later to make each topic act as a toggle
    // i.e. if topic is currently in array, remove it. if not, add it.
    // maybe move topic nav to this container so it's easier to style.

    // search for topicName in displayTopics. if not found, add it.
    // if found, remove it.
    let topicidx = -1;

    this.state.displayTopics.forEach(function(topic, index){
      if (topic === topicName){
        topicidx = index;
      }
    });

    if (topicidx === -1){
      //let joined = this.state.displayTopics.concat(topicName);
      this.setState({
        displayTopics: [...this.state.displayTopics, topicName]
      });
    } else {
      let removed = [...this.state.displayTopics];
      removed.splice(topicidx, 1);
      this.setState({
        displayTopics: removed
      });
    }
  }

  render(){

    let publications = getMatchingPubsByTopics(this.state.displayTopics);
    let topics = this.props.json.topics;

    return (

      <div>
          <div className="TopicNav">
            {
              topics.map(
                (topic) => <Topic className="Interactive" name={topic} onClick={this.handleTopicClick}/>
              )
            }
          </div>

          <PublicationList
              publications={publications}
              displayTopics={this.state.displayTopics}
              handleTopicClick={this.handleTopicClick}
          />
      </div>

    );
  }
}

PublicationListContainer.propTypes = {
  json: PropTypes.object.isRequired,
}
