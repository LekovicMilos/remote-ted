import { FETCH_JOBS, FETCHED_JOBS } from './types';
import fetch from 'isomorphic-fetch';

const urls = [
  { 'name': 'Codepen', 'url': 'https://cors-anywhere.herokuapp.com/https://codepen.io/jobs.json'},
  { 'name': 'Codepen', 'url': 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'},
  { 'name': 'Codepen', 'url': 'https://cors-anywhere.herokuapp.com/https://remoteok.io/remote-jobs.json'},
	{ 'name': 'Codepen', 'url': 'https://cors-anywhere.herokuapp.com/https://www.workingnomads.co/api/exposed_jobs'},
]

let allJobs = [];

function fetchUrl(i) {
  return dispatch => {
    return fetch(urls[i].url)
      .then(response => {
        const contentType = response.headers.get("content-type");
        let responseArray = [];
        return response.json().then(data => {
          responseArray = [data, { 'type': 'json', 'name': urls[i].name }]
          return responseArray
        });
      })
			.then(json => {
        allJobs = allJobs.concat(json[0].jobs ? json[0].jobs : json[0]);
        dispatch(receiveJobs(allJobs))
      })
  }
}

function receiveJobs(json) {
  return {
    type: FETCH_JOBS,
    payload: json
  }
}

export function fetchedJobs(json) {
  return {
    type: FETCHED_JOBS,
    payload: json
  }
}

export function fetchJobs() {
  let promises = dispatch => urls.map((i, index) => dispatch(fetchUrl(index)));
  return dispatch => Promise.all(promises(dispatch))
}

export function fetchAll() {
  return dispatch => dispatch(fetchJobs()).then(() => {
    dispatch(fetchedJobs(allJobs))
  });
  
}
