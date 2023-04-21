const data = "### Name\n\nTesla\n\n### Domain\n\ntesla.com\n\n### Documentation\n\nhttps://help.tesla.com/account-access/\n\n### Supported 2FA Methods\n\n- [X] TOTP (Google Authenticator)\n- [X] U2F\n- [ ] sms\n- [ ] email";

let name = "";
let domainName = "";
let documentationUrl = "";
let supported2FAMethods = [];

const lines = data.split("\n");

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line === "### Name") {
    name = lines[i+2];
  } else if (line === "### Domain") {
    domainName = lines[i+2];
  } else if (line === "### Documentation") {
    documentationUrl = lines[i+2];
  } else if (line === "### Supported 2FA Methods") {
    for (let j = i+2; j < lines.length; j++) {
      const methodLine = lines[j];
      
      if (methodLine.startsWith("- [")) {
        const method = methodLine.substring(5).trim();
        const enabled = methodLine[3] === "X";
        supported2FAMethods.push({ method, enabled });
      } else {
        break;
      }
    }
  }
}

console.log("name:", name);
console.log("domain:", domainName);
console.log("documentation:", documentationUrl);
console.log("tfa:", supported2FAMethods);