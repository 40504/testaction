// const { log } = require('console');
const fs = require('fs');

const data = process.env.BODY;
console.log("Body:", data);

const lines = data.split("\r\n");
console.log("lines:", lines);


const nameMatch = data.match(/### Name\n\n(.+)/);
console.log("nameMatch:", nameMatch);
const nameline = nameMatch ? nameMatch[1] : null;
console.log("nameline:", nameline);

const name = lines[0].match(/### Name\n\n(.+)/);
const namel = name ? name[1] : null;
console.log("name:", namel);

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