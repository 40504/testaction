const fs = require('fs');
const { Octokit } = require('@octokit/rest');

// Get the issue data from the command line arguments
const issue = JSON.parse(process.argv[2]);

// Authenticate with the GitHub API using the GITHUB_TOKEN secret
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Get additional data about the issue from the GitHub API
const { data } = await octokit.issues.get({
  owner: process.env.GITHUB_REPOSITORY.split('/')[0],
  repo: process.env.GITHUB_REPOSITORY.split('/')[1],
  issue_number: issue.number,
});

// Save the data to a JSON file in the Git directory
const filename = `issue-${issue.number}.json`;
fs.writeFileSync(filename, JSON.stringify(data, null, 2));