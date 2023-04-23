const fs = require('fs');

const fileName = 'myFile.txt';
console.log(fileName);
const fileContent ='test';

fs.writeFileSync(fileName, fileContent, (err) => {
  if (err) throw err;
  console.log('File created successfully');
});
