// const { log } = require('console');
const fs = require('fs');

const data = process.env.BODY;
console.log("Body:", data);

const data1 = "### Name\n\nDropbox\n\n### Domain\n\ntesla.com\n\n### Documentation\n\nhttps://help.dropbox.com/account-access/enable-two-step-verification\n\n### Supported 2FA Methods\n\n- [X] TOTP (Google Authenticator)\n- [ ] U2F\n- [ ] sms\n- [ ] email";
console.log("Body1:", data1);

const lines = data.split("\r\n");
console.log("lines:", lines);

const lines1 = data1.split("\r\n");
console.log("lines1:", lines1);

const name = lines[3];
console.log("name:", name);
const domainName = lines[7];
const documentationUrl = lines[10] !== "_No response_" ? lines[10] : null;
const supported2FAMethods = lines
  .slice(14)
  .filter(line => line.startsWith("- [X]"))
  .map(line => {
    const method = line.substring(5).trim();
    if (method === "TOTP (Google Authenticator)") {
      return "totp";
    } else {
      return method.toLowerCase();
    }
  });

const json = {
  [name]: {
    domain: domainName,
    ...(documentationUrl && {documentation: documentationUrl}),
    tfa: supported2FAMethods
  }
};

console.log(json)

fs.writeFileSync(domainName + '.json', JSON.stringify(json, null, 2));