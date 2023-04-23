const fs = require('fs');

const fileName = 'myFile.txt';
console.log(fileName);
const fileContent = process.env.BODY;
const lines = fileContent.split("\n");
console.log(lines);

fs.writeFileSync(fileName, lines, (err) => {
  if (err) throw err;
  console.log('File created successfully');
});
