const fs = require('fs');

const fileName = 'myFile.txt';
console.log(fileName);
const fileContent = process.env.BODY.substring(1, process.env.BODY.length - 1).replace("\n", "");
const lines = fileContent.split("\n");
console.log(lines);

fs.writeFileSync(fileName, lines, (err) => {
  if (err) throw err;
  console.log('File created successfully');
});
