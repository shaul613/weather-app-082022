const fs = require('fs');

fs.writeFile('./weather.json', 'hello', (e) => {
  console.log(e);
})
