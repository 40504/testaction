const fs = require('fs');
const path = require('path');
const axios = require('axios');

const data = process.env.BODY.replaceAll('"', "");
const lines = data.split("\\n\\n");

const name = lines[1];
const domainName = lines[3];
const documentationUrl = lines[5] !== "_No response_" ? lines[5] : null;
const recoveryUrl = lines[7] !== "_No response_" ? lines[7] : null;
const supported_2FA_methods = lines[9].split("\\n");
const tfa_lines = supported_2FA_methods
    .filter(line => line.startsWith('- [X]'))
    .map(line => line.substring(6));

const json = {
  [name]: {
    domain: domainName,
    ...(documentationUrl && {documentation: documentationUrl}),
    ...(recoveryUrl && {recovery: recoveryUrl}),
    tfa: tfa_lines
  }
};

console.log("***************\n", json)

const filePath = path.join(__dirname, 'files', domainName + '.json');
fs.writeFileSync(filePath, JSON.stringify(json, null, 2), err => {
    if (err) throw err;
    console.log('Saved the filtered lines to', filePath);
  });
  

const repository = process.env.GITHUB_REPOSITORY;
const issueNumber = process.env.GITHUB_REF
console.log("issue number: ", issueNumber)
// const issueNumber = process.env.GITHUB_EVENT_NAME === 'issues' ? process.env.GITHUB_EVENT_ISSUE_NUMBER : null;
const githubToken = process.env.GITHUB_TOKEN; // You need a GitHub token with appropriate permissions
const apiUrl = `https://api.github.com/repos/${repository}/issues/${issueNumber}/comments`;

const comment = `JSON file created: [${filePath}](${filePath})`;

axios.post(apiUrl, { body: comment }, {
  headers: {
    'Authorization': `Bearer ${githubToken}`,
    'Content-Type': 'application/json',
  },
})
.then(response => {
  console.log(`Comment added to issue #${issueNumber}`);
})
.catch(error => {
  console.error(`Error adding comment to issue #${issueNumber}: ${error.message}`);
});