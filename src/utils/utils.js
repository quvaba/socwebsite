import React from 'react';
import peopleJson from '../data/people.json';

// Returns a JSX div of spans of authors that match the netIds given
// [PARAMS] peopleJson - the json to find matching data from
//          netIds - the array of netIds to be matched
export function getMatchingAuthors(netIds){
  let allAuthors = peopleJson.entries;
  let entryAuthors = allAuthors.filter(function(value, index, arr){
    return (netIds.includes(value.netId));
  });

  let authorList = entryAuthors.map(
    (author) => <span className="Author" key={entryAuthors.indexOf(author)}>
                  {author.pageUrl.length > 0 ?
                    (<a href={author.pageUrl} class="authorlink">{author.name}</a>) :
                    (<span>{author.name}</span>)
                  }

                </span>
  );

  return(
    <div> {authorList} </div>
  );
}


// [PARAMS] topic_list - list of topic we want to return publications from
//          publicationsJson - the json to find matching pubs from
export function getMatchingPublicationsTopic(topic_list, publicationsJson) {
   let allPublications = publicationsJson.entries;

   function containsTopicFrom(element) {
       for (var i=0; i < this.length; i++) {
         if (this[i] == 'All' || element.themes.includes(this[i])) {
           return true;
	 }
       }
       return false;
     }
   let matchingPubs = allPublications.filter(containsTopicFrom, topic_list);
   return matchingPubs;
}


//
// [PARAMS] num - number of most recent publications to return
//          projectId - the id of the project to search for related
//                      publications of
//          publicationsJson - the json to find matching data from
export function getTopPublications(num, projectId, publicationsJson){
  let allPublications = publicationsJson.entries;
  let matchingPubs = allPublications.filter(
    function(value, index, arr){
      return(value.projectId === projectId);
    }
  );

  matchingPubs.sort((a, b) => (a.year < b.year) ? 1 : -1);
  matchingPubs = matchingPubs.slice(0, 2);

  let pubList = matchingPubs.map(
    (pub) => <span key={matchingPubs.indexOf(pub)}>
                <a href={pub.url}>{pub.title}</a><br/>
             </span>
  );

  return(
    <div> {pubList} </div>
  );
}

// Same as getTopPublications, but returns all matching pubs
export function getMatchingPublications(projectId, publicationsJson){
  let allPublications = publicationsJson.entries;
  let matchingPubs = allPublications.filter(
    function(value, index, arr){
      return(value.projectId === projectId);
    }
  );

  let pubList = matchingPubs.map(
    (pub) => <span key={matchingPubs.indexOf(pub)}>
                <a href={pub.url}>{pub.title}</a><br/>
             </span>
  );

  return(
    <div> {pubList} </div>
  );
}
