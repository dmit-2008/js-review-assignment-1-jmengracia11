// your code goes here.
import 'bootstrap/dist/css/bootstrap.min.css';


import { fetchAllJobs, searchJobs, fetchJobDetails } from './api/jobs.js';

window.onload = function() {
    fetchAllJobs().then(jobs => {
      if (jobs) {
        displayJobs(jobs);
      }
    });
  };

  // from submission even to search jobs
  document.getElementById('search-jobs-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query-input').value;
    searchJobs(query).then(jobs => {
      if (jobs) {
        displayJobs(jobs);
      }
    });
  });

  // event listener to view job details when button is clicked
  document.getElementById('searched-jobs').addEventListener('click', function(event) {
    if (event.target.classList.contains('view-job-button')) {
      const jobId = event.target.getAttribute('job-data-id');
      fetchJobDetails(jobId).then(job => {
        if (job) {
          viewJobDetails(job);
        }
      });
    }
  });

  //function to display jobs in the DOM
  function displayJobs(jobs) {
    const jobsList = document.getElementById('searched-jobs');
    jobsList.innerHTML = ''; // Clear previous results
  
    if (jobs.length === 0) {
      jobsList.innerHTML = '<div class="text-dark">No Results Found</div>';
      return;
    }
  
    jobs.forEach(job => {
      const jobHTML = `
        <li class="job-card card my-1" style="width: 18rem;">
          <div class="card-header">${job.company}</div>
          <div class="card-body">
            <h5 class="card-title">${job.title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${job.postedDate}</h6>
            <button class="btn btn-primary view-job-button" job-data-id="${job.id}">View Job</button>
          </div>
        </li>
      `;
      jobsList.insertAdjacentHTML('beforeend', jobHTML);
    });
  }

  // function to display the details for the specific job
  function displayJobDetails(job) {
    const jobDetailsCard = document.getElementById('job-details-card');
    jobDetailsCard.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">${job.title}</h3>
          <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${job.company}</h4>
          <h6 class="card-subtitle mb-2 text-body-secondary pb-3">${job.location}</h6>
          <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${job.postedDate}</h6>
          <h5 class="card-subtitle mb-2">Description</h5>
          <p class="card-text">${job.description}</p>
          <h5 class="card-subtitle mb-2">Qualifications</h5>
          <p class="card-text">${job.qualifications}</p>
          <button class="btn btn-success save-job">Save Job</button>
        </div>
      </div>
    `;
  }