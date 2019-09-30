import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.scss';

import pagesJson from './data/pages.json';
import coursesJson from './data/courses.json';
import peopleJson from './data/people.json';
import karrieJson from './data/karrie.json';
import projectsJson from './data/projects.json';
import publicationsJson from './data/publications.json';

import {getMatchingAuthors} from './utils/utils.js'
import {getMatchingPublications} from './utils/utils.js'
import {getTopPublications} from './utils/utils.js'

import Grid from '@material-ui/core/Grid';

import { PeopleList, PublicationList, KarrieCV, CourseList, ProjectList } from './components/ListComponents';

/**
 * App - contains everything. Wraps a NavBar and a page contents.
 *
 * [STATE] currentPage - The page being displayed. "Home" by default.
 */
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: "Home"
    };
    this.goToPage = this.goToPage.bind(this);
  }

  goToPage(pageName){
    this.setState({
      currentPage: pageName
    });
  }

  render(){
    let pageContents;
    let current = this.state.currentPage;

    switch (current) {
      case "Home":
        pageContents = <HomePage />
        break;
      case "Karrie":
        pageContents = <ListPage json={karrieJson} pageType = "Karrie"/>;
        break;
      case "People":
        pageContents = <ListPage json={peopleJson} pageType = "People"/>;
        break;
      case "Publications":
        pageContents = <ListPage json={publicationsJson} pageType = "Publications"/>;
        break;
      case "Projects":
        pageContents = <ListPage json={projectsJson} pageType = "Projects" onClick={this.goToPage}/>;
        break;
      case "Courses":
        pageContents = <ListPage json={coursesJson} pageType = "Courses"/>;
        break;
      default:
        pageContents = <ProjectPage json={projectsJson} id={current} />;
        break;
    }

    return(
      <div className="App">
        <NavBar json={pagesJson} loadPage={this.goToPage}/>
        {pageContents}
      </div>
    );
  }

}


/**
 * NavBar - the navigation bar at the top of the page.
 *          https://react-bootstrap.github.io/components/navbar/
 *
 * [PROPS] loadPage - function that passes page clicked to App
 */
class NavBar extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };

  }

  handleClick(pageName){
    this.props.loadPage(pageName);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    let pagesArray = pagesJson.pages;
    let pages = pagesArray.map(
      (page) => <NavOption
                  key={pagesArray.indexOf(page)}
                  title={page.title}
                  onClick={this.handleClick}
                />
    );

    return(
      <div className="NavBar">
          <div className="NavBrand">
            <a href="/"> [ SOCIAL SPACES ] </a>
          </div>
          {pages}
      </div>
    );

  }
}


/**
 * NavOption - one of the links in the navigation bar.
 *
 * [PROPS] onClick - function to be called when clicked.
 *         title - the title of the page it links to
 */
class NavOption extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.onClick(this.props.title);
  }

  render(){
    return(
      <span onClick={this.handleClick} className="NavOption">
        {this.props.title}
      </span>
    );
  }

}


/*****************************************************************************************************************

                                            INDIVIDUAL PAGES

*****************************************************************************************************************/

/* ListPage - includes People, Projects, Publications, Karrie, and Courses
 *
 * [PROPS] json - the json to be read from
 *         pageType - the type of page to render
 */
class ListPage extends Component {
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

      case "Projects":
        entryList = <ProjectList json={this.props.json}
                                 onClick={this.handleClick}/>
        break;

      case "Publications":
        entryList = <PublicationList json={this.props.json} />
        break;

      case "Karrie":
        entryList = <KarrieCV json={this.props.json} />
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


/* ProjectPage - An individual project's page.
 *
 * [PROPS]
 */
class ProjectPage extends Component {
  render(){
    let allEntries = projectsJson.entries;
    let id = this.props.id;
    let targetEntry = allEntries.filter(function(value, index, arr){
      return (id === value.projectId);
    });

    targetEntry = targetEntry[0];
    let authorList = getMatchingAuthors(targetEntry.authorIds);
    let publicationList = getMatchingPublications(id, publicationsJson);

    let bodyList = targetEntry.body.map(
      (bodySection) => <li key={targetEntry.body.indexOf(bodySection)}>
                    <div>
                      <div className="ProjectSectionTitle">{bodySection.sectionTitle}</div>
                      <div>{bodySection.sectionContent}</div>
                    </div>
                 </li>
    );

    return(
      <div className="ProjectPage">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} lg={6}>
            <div className="ProjectPageTitle"> {targetEntry.title} </div>
            <div> {authorList} </div>
            <div> {publicationList} </div>
            <img src={targetEntry.imageUrls[0]} className="ProjectPageImage"/>
            {bodyList}
            <img src={targetEntry.imageUrls[1]} className="ProjectPageImage"/>
            {targetEntry.publications}
          </Grid>
        </Grid>
      </div>
    );
  }
}


/* HomePage - The home page of the social spaces website.
 *
 * [PROPS]
 */
class HomePage extends Component {
  render(){
    let allProjects = projectsJson.entries;
    let featuredProjects = allProjects.filter(
      function(value, index, arr){
        return (value.onFrontPage === true);
      }
    );

    let projList = featuredProjects.map(
      (project) => <li>
          <div>{project.title}</div>
          <div>{project.description}</div>
          <div> {getTopPublications(2, project.projectId, publicationsJson)} </div>
      </li>
    );

    return(
      <div className="HomePage">
        <div className="HomeTop">
          <span><div className="KarrieHomePic"></div></span>
          <span className="HomeStatement">
            <strong>Our goal</strong> is to investigate sociable systems for mediated communication.
            This encompasses a wide range of areas:<br/><br/>

            ➭ Explore and build virtual-physical spaces for mediated communication<br/>
            ➭ Build communication objects that connect people and/or spaces<br/>
            ➭ Build interactive interfaces that connect spaces<br/>
            ➭ Visualize and study how people interact within social spaces<br/><br/>
            And more!
          </span>
        </div>

        <hr />

        <div className="FeaturedProjects">
          <h2>Featured Projects</h2>
          {projList}
        </div>

      </div>

    );
  }
}



export default App;
