const fs = require('fs');
typeof fileContent === "string";

const fileName = 'myFile.txt';
console.log(fileName);
const fileContent = process.env.BODY;
console.log("fileContent:", fileContent);

console.log(typeof fileContent);

fs.writeFileSync(fileName, fileContent, (err) => {
  if (err) throw err;
  console.log('File created successfully');
});
