import React from 'react';
import PropTypes from 'prop-types';

import { Person } from './ListItemComponents/Person';
import { Project } from './ListItemComponents/Project';
import { Publication } from './ListItemComponents/Publication';
import { Course } from './ListItemComponents/Course';
import { Topic } from './ListItemComponents/Topic'

import {getMatchingPublications} from '../utils/utils.js'
import {getTopPublications} from '../utils/utils.js'

import Grid from '@material-ui/core/Grid';



export const PeopleList = (props) => {

  let people = props.json.entries;
  let currentPeople;
  let alumniPeople;
  currentPeople = people.filter(list => {
    return list.status.toLowerCase().includes("current");
  });
  alumniPeople = people.filter(list => {
    return list.status.toLowerCase().includes("alum");
  });

  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={8} lg={6}>
       <div className="StudentList">Current Students</div>
        <Grid container className="People" justify="flex-start" spacing={16}>
          {currentPeople.map(person => (
            <Grid key={people.indexOf(person)} item xs={12} sm={6} md={3}>
              <Person
                name={person.name}
                pageUrl={person.pageUrl}
                photoUrl={person.photoUrl}
                status={person.status}
                degree={person.degree}
              />
            </Grid>
          ))}
        </Grid>
        <div className="StudentList">Alumni</div>
        <Grid container className="People" justify="flex-start" spacing={16}>
          {alumniPeople.map(person => (
            <Grid key={people.indexOf(person)} item xs={12} sm={6} md={3}>
              <Person
                name={person.name}
                pageUrl={person.pageUrl}
                photoUrl={person.photoUrl}
                status={person.status}
                degree={person.degree}
                currentRole={person.currentRole}
                gradYear={person.gradYear}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );

}

PeopleList.propTypes = {
  json: PropTypes.object.isRequired
};

export const ProjectList = (props) => {
  let projects = props.json.entries;
  projects.sort((a, b) => (a.startYear < b.startYear) ? 1 : -1);

  return(
    <Grid container justify="center">
      <Grid item xs={10} sm={8} md={8} lg={6}>
        {projects.map(
        (project) => <li key={projects.indexOf(project)}>
                      <Project
                        title={project.title}
                        authors={project.authorIds}
                        description={project.description}
                        imageUrls={project.imageUrls}
                        publications={project.publications}
                        onClick={props.onClick}
                        id={project.projectId}
                      />
                   </li>
      )}
       </Grid>
    </Grid>
  );
}

ProjectList.propTypes = {
  json: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};


export const PublicationList = (props) => {

  const handleTopicClick = (topicName) => {
    props.handleTopicClick(topicName);
  }

  return(
    <Grid container justify="center">
      <Grid item xs={10} sm={8} md={8} lg={6}>

        {props.publications.map(
          (publication) => <li key={props.publications.indexOf(publication)}>
                        <Publication
                          title={publication.title}
                          photoUrl={publication.photoUrl}
                          description={publication.description}
                          year={publication.year}
                          conference={publication.conference}
                          url={publication.url}
                          authors={publication.authorIds}
                          awards={publication.awards}
                          topics={publication.topics}
                          handleTopicClick={handleTopicClick}
                        />
                     </li>
        )}
      </Grid>
    </Grid>
  );

}

PublicationList.propTypes = {
  publications: PropTypes.array.isRequired,
  displayTopics: PropTypes.array,
  handleTopicClick: PropTypes.func.isRequired
};


export const CourseList = (props) => {
  let courses = props.json.entries;

  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={8} md={8} lg={6}>
      {courses.map(
        (course) => <li key={courses.indexOf(course)}>
                      <Course
                        title={course.title}
                        schedule={course.schedule}
                        abbrev={course.abbrev}
                        url={course.url}
                        description={course.description}
                        prior_versions={course.prior_versions}
                      />
                   </li>
      )}
      </Grid>
    </Grid>
  );
}

CourseList.propTypes = {
  json: PropTypes.object.isRequired
};
