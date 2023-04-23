const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function getIssue(issueNumber) {
  const { data: issue } = await octokit.issues.get({
    owner: "octokit",
    repo: "rest.js",
    issue_number: issueNumber,
  });
  console.log(issue.title);
  console.log(issue.body);
}

getIssue(155);
