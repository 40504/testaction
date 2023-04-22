const fs = require('fs');

const data = "### Name\n\nDropbox\n\n### Domain\n\ndropbox.com\n\n### Documentation\n\n_No response_\n\n### Supported 2FA Methods\n\n- [X] TOTP (Google Authenticator)\n- [X] U2F\n- [X] sms\n- [ ] email";

const lines = data.split("\n");

const name = lines[2];
const domainName = lines[6];
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

fs.writeFileSync(domainName + '.json', JSON.stringify(json, null, 2));