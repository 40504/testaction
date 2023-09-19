const myValue = "Hello, GitHub Actions!";
const fs = require('fs');

fs.writeFileSync('.env', `MY_VALUE=${myValue}`);
console.log(`Environment file created with MY_VALUE=${myValue}`);
