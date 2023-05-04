const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (error, data) => {
  data.forEach(file => {
    fs.stat(path.join(__dirname, 'secret-folder/') + file, (error, stats) => {
      if(!stats.isDirectory()) {
        console.log(file.split('.')[0] + ' ' + path.extname(file) + ' '
                +stats.size / 1000 + 'kb');
      }
    });
  });
});