const fs = require('fs');

const fileName = 'myFile.txt';
const fileContent = process.env.BODY;

fs.writeFileSync(fileName, fileContent, (err) => {
  if (err) throw err;
  console.log('File created successfully');
});
