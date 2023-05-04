const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const copyDir = () => {

  const originalFolder = path.join(__dirname, 'files');
  const copyFolder = path.join(__dirname, 'files-copy');

  fsPromises.mkdir(copyFolder, { recursive: true }).then(function () {
    console.log('New folder was created successfully');
  }).catch(function () {
    console.log('Failed to create new folder');
  });

  fs.readdir(path.join(originalFolder), (error, files) => {
    files.forEach(file => {
      fs.copyFile(path.join(originalFolder, file), path.join(copyFolder, file), error =>{
        if (error) {
          console.log(error);
        }
        console.log(`File ${file} was copied successfully`);
      });
    });
  });
};

copyDir();