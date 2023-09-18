const axios = require('axios');

const githubToken = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_USERNAME;
const repo = process.env.GITHUB_REPOSITORY;
const issueNumber = 1; // Replace with the actual issue number
const commentBody = 'This is a comment from a GitHub Actions workflow.';

axios.post(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
  body: commentBody
}, {
  headers: {
    Authorization: `Bearer ${githubToken}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('Comment created successfully:', response.data);
})
.catch(error => {
  console.error('Error creating comment:', error);
});
