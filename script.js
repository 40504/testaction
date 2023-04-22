// const { log } = require('console');
const fs = require('fs');

const data = process.env.BODY;
console.log("Body:", data);

const lines = data.split("\r\n");
console.log("lines:", lines);

const nameline = lines[0].match(/### Name\n\n(.+)/)[1];
console.log("nameline:", nameline);

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