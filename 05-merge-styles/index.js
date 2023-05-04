const fs = require('fs');
const path = require('path');

const pathToStylesFolder = path.join(__dirname, 'styles/');
const pathToProjectDistFolder = path.join(__dirname, 'project-dist/');
let bundleCSS = '';

fs.readdir(pathToStylesFolder, (error, files) => {
  const filteredFiles = files.filter(file => path.extname(file) === '.css'); // as a result we will get only CSS files
  let counter = 0;

  filteredFiles.forEach((file) => {
    fs.stat(path.join(pathToStylesFolder, file), (error, stats) => {
      if(!stats.isDirectory()) {
        fs.readFile(path.join(pathToStylesFolder, file), 'utf-8', (error, data) =>{
          bundleCSS += data;
          counter++;
          if(counter === filteredFiles.length) {
            fs.writeFile(path.join(pathToProjectDistFolder, 'bundle.css'), bundleCSS, (error) => {
              if (error) {
                throw error;
              }
              console.log('bundle.css file was created successfully.');
            });
          }
        });
      }
    });
  });
});