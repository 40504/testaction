// const { log } = require('console');
const fs = require('fs');

// const data = process.env.BODY.substring(1, process.env.BODY.length - 1).replace("\n", "");
const data = process.env.BODY.replaceAll('"', "");
console.log("Body:", data);
const lines = data.split("\\n\\n");
console.log("lines:", lines);

const name = lines[1];
const domainName = lines[3];
const documentationUrl = lines[5] !== "_No response_" ? lines[5] : null;
const supported2FAMethods = lines
  .slice(6)
  .filter(line => line.startsWith("- [X]"))
  .map(line => {
    const method = line.substring(5).trim();
    if (method === "totp\\n") {
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

console.log("***************", json)

// fs.writeFileSync(domainName + '.json', JSON.stringify(json, null, 2));