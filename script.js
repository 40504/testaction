const fs = require('fs');

const myValue = "Hello, GitHub Actions!";
// console.log(`"{name}=${myValue}" >> $GITHUB_OUTPUT`);

const name = "myVariableName";
const value = "myVariableValue";

fs.writeFileSync(process.env.GITHUB_OUTPUT, `name=myVariableValue`, { flag: 'a' });

console.log("in js file:", name, value);
