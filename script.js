// const { log } = require('console');
const fs = require('fs');

const data = process.env.BODY;
console.log("Body:", data);

const data2 = "### Name\n\nDropbox\n\n### Domain\n\ndropbox.com\n\n### Documentation\n\nhttps://help.dropbox.com/account-access/enable-two-step-verification\n\n### Supported 2FA Methods\n\n- [X] TOTP (Google Authenticator)\n- [ ] U2F\n- [ ] sms\n- [ ] email";
console.log("Body2:", data2);

const lines = data.split("\r\n");
console.log("lines:", lines);


const nameMatch = data[0].match(/### Name\n\n(.+)/);
console.log("nameMatch:", nameMatch);
const nameline = nameMatch ? nameMatch[1] : null;
console.log("nameline:", nameline);

const name = lines[1].match(/### Name\n\n(.+)/);
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