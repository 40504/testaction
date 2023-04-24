const fs = require('fs');
const path = require('path');

const data = process.env.BODY.replaceAll('"', "");
const lines = data.split("\\n\\n");

const name = lines[1];
const domainName = lines[3];
const documentationUrl = lines[5] !== "_No response_" ? lines[5] : null;
const supported_2FA_methods = lines[7].split("\\n");
const tfa_lines = supported_2FA_methods
    .filter(line => line.startsWith('- [X]'))
    .map(line => line.substring(6));

const json = {
  [name]: {
    domain: domainName,
    ...(documentationUrl && {documentation: documentationUrl}),
    tfa: tfa_lines
  }
};

console.log("***************", json)

const filePath = path.join(__dirname, 'files', domainName + '.json');
fs.writeFileSync(domainName + '.json', JSON.stringify(json, null, 2));
console.log('Saved the filtered lines to', filePath);