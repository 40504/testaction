const data = process.env.BODY;
console.log("Body:", data);

// Split the text into an array of lines
const lines = data.split('\r\n');
console.log("lines======>", lines)
// Initialize an empty object to store the parsed data
const parsedData = {};

// Loop through the lines and extract the relevant information
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  console.log("line======>", lines.length)
  if (line.startsWith('### Name')) {
    parsedData.name = lines[i+1].trim();
    console.log("parsedDataName======>", parsedData.name)
  }
  else if (line.startsWith('### Domain')) {
    parsedData.domain = lines[i+1].trim();
  }
  else if (line.startsWith('### Documentation')) {
    parsedData.documentation = lines[i+1].trim();
  }
  else if (line.startsWith('### Supported 2FA Methods')) {
    parsedData.supported2FAMethods = {
      totp: lines[i+1].includes('[X] TOTP (Google Authenticator)'),
      u2f: lines[i+2].includes('[X] U2F'),
      sms: lines[i+3].includes('[X] sms'),
      email: lines[i+4].includes('[X] email')
    };
  }
}

console.log(parsedData);
