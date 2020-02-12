import React from 'react';
import PropTypes from 'prop-types';

import { Person } from './ListItemComponents/Person';
import { Alumni } from './ListItemComponents/Alumni';
import { Project } from './ListItemComponents/Project';
import { Publication } from './ListItemComponents/Publication';
import { Course } from './ListItemComponents/Course';

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
      <Grid item xs={10} sm={8}>

       <div className="StudentList">Faculty</div>
       <Grid container className="Person" justify="flex-start" spacing={3}>
          <Grid item>
          <div className="ImageContainer">
            <img className="Image" src="http://social.cs.uiuc.edu/people/images/people%20pics/karrie.jpg" />
          </div>
          </Grid>
          <Grid item container xs={8} spacing={3} justify="flex-start" direction="column">
            <Grid item>
              <div className="Name">Karrie Karahalios</div>
            </Grid>
            <Grid item>
              <div className="FacultyRole">Professor of Computer Science</div>
            </Grid>

            <Grid container className="FacultyContact" justify="flex-start" spacing={2}>
              <Grid container xs={3} justify="flex-start" direction="column">
                <Grid item>
                  <div className="label">Email</div>
                </Grid>
                <Grid item>
                  <div className="label">Phone</div>
                </Grid>
                <Grid item>
                  <div className="label">Address</div>
                </Grid>
              </Grid>
              <Grid container xs={9} className="info" justify="flex-start" direction="column">
                <Grid item>
                  <div>kkarahal@illinois.edu</div>
                </Grid>
                <Grid item>
                  <div>1 217 265 6841</div>
                </Grid>
                <Grid item>
                  <div className="FacultyAddress">
                    <div>4228 Siebel Center</div>
                    <div>201 N. Goodwin Avenue</div>
                    <div>Urbana, Illinois 61801</div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
       </Grid>

       <div className="StudentList">Current Students</div>
        <Grid container className="People" justify="flex-start" spacing={16}>
          {currentPeople.map(person => (
            <Grid key={people.indexOf(person)} item xs={12} sm={6}>
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
            <Grid key={people.indexOf(person)} item lg={2}>
              <Alumni
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
  let publications = props.json.entries;
  publications.sort((a, b) => (a.year < b.year) ? 1 : -1);

  return(
    <Grid container justify="center">
      <Grid item xs={10} sm={8} md={8} lg={6}>
        {publications.map(
          (publication) => <li key={publications.indexOf(publication)}>
                        <Publication
                          title={publication.title}
                          photoUrl={publication.photoUrl}
                          description={publication.description}
                          year={publication.year}
                          conference={publication.conference}
                          url={publication.url}
                          authors={publication.authorIds}
                          awards={publication.awards}
                        />
                     </li>
        )}
      </Grid>
    </Grid>
  );
}

PublicationList.propTypes = {
  json: PropTypes.object.isRequired
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
