const fs = require('fs');

const fileName = 'myFile.txt';
const fileContent = 'Hello, world!';

fs.writeFileSync(fileName, fileContent, (err) => {
  if (err) throw err;
  console.log('File created successfully');
});
