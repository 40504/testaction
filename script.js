// const { log } = require('console');
const fs = require('fs');

const data = process.env.BODY.replaceAll('"', "");
// console.log("Body:", data);
const lines = data.split("\\n\\n");
// console.log("lines:", lines);

const name = lines[1];
const domainName = lines[3];
const documentationUrl = lines[5] !== "_No response_" ? lines[5] : null;

const supported_2FA_methods = lines[7].split("\\n");
// console.log("supported_2FA_methods:", supported_2FA_methods);

const tfa_lines = supported_2FA_methods
    .filter(line => line.startsWith('- [X]'))
    .map(line => line.substring(6));
// console.log("tfa_lines:", tfa_lines);

const json = {
  [name]: {
    domain: domainName,
    ...(documentationUrl && {documentation: documentationUrl}),
    tfa: tfa_lines
  }
};

console.log("***************", json)

fs.writeFileSync(domainName + '.json', JSON.stringify(json, null, 2));