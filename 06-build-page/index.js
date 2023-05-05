const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const projectDistFolder = path.join(__dirname, 'project-dist/');
const stylesFolder = path.join(__dirname, 'styles/');
let styleCSS = '';

const createFolder = () => {
  return fsPromises.mkdir(projectDistFolder, { recursive: true });
};

const createHTMLFile = () => {
  const componentsFolder = path.join(__dirname, 'components/');
  const articleContent = fs.readFileSync(path.join(componentsFolder, 'articles.html'), 'utf8');
  const footerContent = fs.readFileSync(path.join(componentsFolder, 'footer.html'), 'utf8');
  const headerContent = fs.readFileSync(path.join(componentsFolder, 'header.html'), 'utf8');

  return new Promise((resolve, reject) => {
    fs.readFile('template.html', 'utf-8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      const correctedHTML = data.replace(/{{header}}/g, headerContent)
        .replace(/{{articles}}/g, articleContent).replace(/{{footer}}/g, footerContent);
      fs.writeFile(path.join(projectDistFolder, 'index.html'), correctedHTML, (error) => {
        if (error) {
          reject(error);
          return;
        }
        console.log('index.html file was created successfully.');
        resolve();
      });
    });
  });
};

const createCSSFile = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(stylesFolder, (error, files) => {
      if (error) {
        reject(error);
        return;
      }
      const filteredFiles = files.filter(file => path.extname(file) === '.css');
      let counter = 0;
      filteredFiles.forEach((file) => {
        fs.stat(path.join(stylesFolder, file), (error, stats) => {
          if (error) {
            reject(error);
            return;
          }
          if(!stats.isDirectory()) {
            fs.readFile(path.join(stylesFolder, file), 'utf-8', (error, data) =>{
              if (error) {
                reject(error);
                return;
              }
              styleCSS += data;
              counter++;
              if(counter === filteredFiles.length) {
                fs.writeFile(path.join(projectDistFolder, 'style.css'), styleCSS, (error) => {
                  if (error) {
                    reject(error);
                    return;
                  }
                  resolve();
                  console.log('style.css file was created successfully.');
                });
              }
            });
          }
        });
      });
    });
  });
};

const copyAssetsFolder = () => {

};

Promise.all([createFolder(), createHTMLFile(), createCSSFile()])
  .then(() => {
    console.log('Build completed successfully');
  })
  .catch((error) => {
    console.log(error);
  });