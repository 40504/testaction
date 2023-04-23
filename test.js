const fs = require('fs');

const fileName = 'myFile.txt';
console.log(fileName);
const fileContent = process.env.BODY;
typeof fileContent === "string";
console.log("fileContent:", fileContent);

fs.writeFileSync(fileName, lines, (err) => {
  if (err) throw err;
  console.log('File created successfully');
});
