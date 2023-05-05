const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const copyDir = () => {

  const originalFolder = path.join(__dirname, 'files');
  const copyFolder = path.join(__dirname, 'files-copy');

  fsPromises.access(copyFolder)
    .then(() => fsPromises.rm(copyFolder, { recursive: true }))
    .catch(() => {})
    .then(() => fsPromises.mkdir(copyFolder, { recursive: true }))
    .then(() => {
      console.log('New folder was created successfully');

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
    });
};

copyDir();