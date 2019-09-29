import React from 'react';
import PropTypes from 'prop-types';

import { Person } from './ListItemComponents/Person';
import { Publication } from './ListItemComponents/Publication';
import { Karrie } from './ListItemComponents/Karrie';
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


export const KarrieCV = (props) => {
  let karrieinfo = props.json.entries;

  return(
    <Grid container justify="center">
    <Grid item xs={12} sm={11} md={8} lg={6}>
      {karrieinfo.map(
      (karrie) => <li key={karrieinfo.indexOf(karrie)}>
                    <Karrie
                      name={karrie.name}
                      photoUrl={karrie.photoUrl}
                      position={karrie.position}
                      email={karrie.email}
                      address={karrie.address}
                      phone={karrie.phone}
                      awards={karrie.awards}
                    />
                 </li>
    )}
     </Grid>
    </Grid>
  );

}

KarrieCV.propTypes = {
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
