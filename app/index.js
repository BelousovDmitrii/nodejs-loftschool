const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '../images');

const fileSort = (base, level) => {
  const files = fs.readdirSync(base);

  if (!fs.existsSync(path.join(__dirname, './images'))) {
    fs.mkdirSync(path.join(__dirname, './images'));
  }

  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      fileSort(localBase, level + 1);
    } else {
      var dirName = path.join(
        __dirname,
        'images',
        item.match(/\b(\w)/g)[0].toUpperCase()
      );

      if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
      }

      fs.link(localBase, path.join(dirName, item), err => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};

fileSort(base, 0);
