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
const tfalines = lines[7];
console.log("tfalines:", tfalines);
const falines = tfalines.split("\\n");
console.log("falines:", falines);
console.log("falines0:", falines[0]);
console.log("falines1:", falines[1]);

const x_lines = falines
    .filter(line => line.startsWith('- [X]'))
    .map(line => line.substring(5));

console.log("falines1:", x_lines);


const supported2FAMethods = lines
  .slice(7)
  .filter(line => line.startsWith("- [X]"))
  .map(line => {
    const method = line.substring(5).trim("\\n");
    if (method === "totp") {
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