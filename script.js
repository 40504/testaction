// const { log } = require('console');
const fs = require('fs');

const data = process.env.BODY;
console.log("Body:", data);

const lines = data.split("\n");
console.log("lines:", lines);

const name = lines[4];
console.log("name:", name);
const name1 = lines[1];
console.log("name1:", name1);
const name0 = lines[0];
console.log("name0:", name0);

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