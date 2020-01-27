import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.scss';

import pagesJson from './data/pages.json';
import coursesJson from './data/courses.json';
import peopleJson from './data/people.json';
import karrieJson from './data/karrie.json';
import projectsJson from './data/projects.json';
import publicationsJson from './data/publications.json';

import {getMatchingPublicationsTopic} from './utils/utils.js'
import {getMatchingAuthors} from './utils/utils.js'
import {getMatchingPublications} from './utils/utils.js'
import {getTopPublications} from './utils/utils.js'

import Grid from '@material-ui/core/Grid';

import { PeopleList, PublicationList, CourseList, ProjectList } from './components/ListComponents';

/**
 * App - contains everything. Wraps a NavBar and a page contents.
 *
 * [STATE] currentPage - The page being displayed. "Home" by default.
 */
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: "Home",
      topicList: ['All']
    };
    this.goToPage = this.goToPage.bind(this);
    this.topicCheck = this.topicCheck.bind(this);
  }

  goToPage(pageName){
    this.setState({
      currentPage: pageName
    });
  }

  topicCheck(topic){
    console.log("checking for" + topic);
    if (this.state.topicList.indexOf(topic) >=0) {
      console.log("gonna remove" + topic);
      this.removeTopic(topic);
    } else{
      console.log("gonna add" + topic);
      this.addTopic(topic);
    }
  }

  addTopic(topic){
    let newTopicList = this.state.topicList.slice();
    newTopicList.push(topic);
    this.setState({
      topicList: newTopicList
    });
  }

  removeTopic(topic){
    console.log(this.state.topicList);
    let newTopicList = this.state.topicList.slice();
    for (let i=0; i < this.state.topicList.length; i++) {
      if (this.state.topicList[i] == topic) {
	console.log("found " + topic);
        newTopicList.splice(i, 1);   
	console.log(newTopicList);
      }
    }
    this.setState({
      topicList: newTopicList
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
        let newJson = getMatchingPublicationsTopic(this.state.topicList, publicationsJson)
        let newJsonObj = {
          entries: newJson 
	}
        console.log(typeof(publicationsJson));
        console.log(typeof(newJson));
        pageContents = <ListPage json={newJsonObj} pageType = "Publications"/>;
        return(
          <div className="App">
            <NavBar json={pagesJson} loadPage={this.goToPage}/>
	    <Grid container justify="center">
              <Grid item xs={3} sm={2} md={2} lg={1}>
                <PubFilter toggleTopic={this.topicCheck}/>
	      </Grid>
                {pageContents}
	    </Grid>
	  </div>
        );
      case "Courses":
        pageContents = <ListPage json={coursesJson} pageType = "Courses"/>;
        break;
      default:
        pageContents = <HomePage />;
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

class PubFilter extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(topic){
    this.props.toggleTopic(topic);
  }


  render() {
    return(
    	  <div id="topicfilter" vertical-align="middle">
	    <label id="All" class="check-container">All
	      <input type="checkbox" onChange={() => this.handleToggle('All')} defaultChecked/>
	      <span class="checkmark"></span>
	    </label>
	    <label id="TopicOne" class="check-container">Topic One
	      <input type="checkbox" onChange={() => this.handleToggle('TopicOne')}/>
	      <span class="checkmark"></span>
	    </label>
	    <label id="TopicTwo" class="check-container">Topic Two
	      <input type="checkbox" onChange={() => this.handleToggle('TopicTwo')}/>
	      <span class="checkmark"></span>
	    </label>
	    <label id="TopicThree" class="check-container">Topic Three
	      <input type="checkbox" onChange={() => this.handleToggle('TopicThree')}/>
	      <span class="checkmark"></span>
	    </label>
	    <label id="TopicFour" class="check-container">Topic Four
	      <input type="checkbox" onChange={() => this.handleToggle('TopicFour')}/>
	      <span class="checkmark"></span>
	    </label>
	    <label id="TopicFive" class="check-container">Topic Five
	      <input type="checkbox" onChange={() => this.handleToggle('TopicFive')}/>
	      <span class="checkmark"></span>
	    </label>
	    <label id="TopicSix" class="check-container">Topic Six
	      <input type="checkbox" onChange={() => this.handleToggle('TopicSix')}/>
	      <span class="checkmark"></span>
	    </label>
	    <label id="TopicSeven" class="check-container">Topic Seven
	      <input type="checkbox" onChange={() => this.handleToggle('TopicSeven')}/>
	      <span class="checkmark"></span>
	    </label>
	  </div>
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
        return(
          <div className="ListPage">{entryList}</div>
        );
        break;

      case "Publications":
        entryList = <PublicationList json={this.props.json} />
        return(
            <div id="PubList" className="ListPage">{entryList}</div>
        );
        break;

      case "Courses":
        entryList = <CourseList json={this.props.json} />
        return(
          <div className="ListPage">{entryList}</div>
        );
        break;

      default:

    }

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
          <div>{getTopPublications(2, project.projectId, publicationsJson)} </div>
      </li>
    );

    return(
      <div className="Home">
        <div className="Top">
          <span className="Statement">
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
