const data = "### Name\n\nDropbox\n\n### Domain name\n\ndropbox.com\n\n### Documentation URL\n\nhttps://help.dropbox.com/account-access/enable-two-step-verification\n\n### Supported two-factor authentication method\n\n- [X] TOTP (Google Authenticator)\n- [X] U2F\n- [X] sms\n- [X] email";

let name = "";
let domainName = "";
let documentationUrl = "";
let supportedTwoFactorAuthenticationMethods = [];

const lines = data.split("\n");

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line === "### Name") {
    name = lines[i+1];
  } else if (line === "### Domain name") {
    domainName = lines[i+1];
  } else if (line === "### Documentation URL") {
    documentationUrl = lines[i+1];
  } else if (line === "### Supported two-factor authentication method") {
    for (let j = i+1; j < lines.length; j++) {
      const methodLine = lines[j];
      
      if (methodLine.startsWith("- [")) {
        const method = methodLine.substring(5).trim();
        const enabled = methodLine[3] === "X";
        supportedTwoFactorAuthenticationMethods.push({ method, enabled });
      } else {
        break;
      }
    }
  }
}

console.log("Name:", name);
console.log("Domain name:", domainName);
console.log("Documentation URL:", documentationUrl);
console.log("Supported two-factor authentication methods:", supportedTwoFactorAuthenticationMethods);