const fs = require('fs');
const fileName = 'myFile.txt';
console.log(fileName);
const fileContent = process.env.BODY;
typeof fileContent === "string";
console.log("fileContent:", fileContent);
console.log(typeof fileContent);

const lines = fileContent.split("\n");
console.log("lines:", lines);

fs.writeFileSync(fileName, fileContent, (err) => {
  if (err) throw err;
  console.log('File created successfully');
});
