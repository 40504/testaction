// const { log } = require('console');
const fs = require('fs');

// const data = process.env.BODY.substring(1, process.env.BODY.length - 1).replace("\n", "");
const data = process.env.BODY[0].replace('"', "");
console.log("Body:", data);

const data0 = process.env.BODY.replace('"', "");
console.log("Body0:", data0);

const data2 = process.env.BODY[2];
console.log("Body2:", data2);

const lines = data.split('\r\n');
console.log("lines:", lines);

// const name = lines[4];
// const domainName = lines[7];
// const documentationUrl = lines[10] !== "_No response_" ? lines[10] : null;
// const supported2FAMethods = lines
//   .slice(14)
//   .filter(line => line.startsWith("- [X]"))
//   .map(line => {
//     const method = line.substring(5).trim();
//     if (method === "TOTP (Google Authenticator)") {
//       return "totp";
//     } else {
//       return method.toLowerCase();
//     }
//   });

// const json = {
//   [name]: {
//     domain: domainName,
//     ...(documentationUrl && {documentation: documentationUrl}),
//     tfa: supported2FAMethods
//   }
// };

// console.log("***************", json)

// fs.writeFileSync(domainName + '.json', JSON.stringify(json, null, 2));