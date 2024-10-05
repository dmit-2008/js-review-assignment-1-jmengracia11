// your code goes here.
const BASE_URL = 'http://localhost:3000/jobs';

// function to fetch all of the jobs
export function fetchAllJobs() {
    return fetch(`${BASE_URL}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching all jobs:', error);
      });
  }

// function to search jobs by a query
export function searchJobs(query) {
    console.log('Searching jobs with query:', query); 
    return fetch(`${BASE_URL}?search=${encodeURIComponent(query)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to search jobs');
        }
        return response.json();
      })
      .catch(error => {
        console.log('Error searching jobs:', error);
      });
  }
  

// function to fetch job details by job ID
export function fetchJobDetails(jobId) {
    return fetch(`${BASE_URL}/${jobId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
      });
  }

  
  
  