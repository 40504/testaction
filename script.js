const fs = require('fs');
const path = require('path');

const data = process.env.BODY.replaceAll('"', "");
// const data = "### Name\n\nSiteName\n\n### Domain\n\nsite.com\n\n### Documentation\n\nhttps://docs.sekoia.io/getting_started/account_security/\n\n### Recovery\n\nhttps://docs.sekoia.io/getting_started/account_security/\n\n### Supported 2FA Methods\n\n- [X] totp\n- [X] u2f\n- [X] sms\n- [X] email";
const lines = data.split("\n\n");

const name = lines[1];
const domainName = lines[3];
const documentationUrl = lines[5] !== "_No response_" ? lines[5] : null;
const recoveryUrl = lines[7] !== "_No response_" ? lines[7] : null;
const supported_2FA_methods = lines[9].split("\n");
const tfa_lines = supported_2FA_methods
    .filter(line => line.startsWith('- [X]'))
    .map(line => line.substring(6));

const json = {
  [name]: {
    domain: domainName,
    ...(documentationUrl && {documentation: documentationUrl}),
    ...(recoveryUrl && {recvovery: recoveryUrl}),
    tfa: tfa_lines
  }
};

console.log("***************", json)

const filePath = path.join(__dirname, 'files', domainName + '.json');
fs.writeFileSync(filePath, JSON.stringify(json, null, 2), err => {
    if (err) throw err;
    console.log('Saved the filtered lines to', filePath);
  });

module.exports = ({github, context}) => {
  return context.payload.client_payload.data
}
