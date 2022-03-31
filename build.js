const fs = require('fs');
const path = require('path');
const { components } = require('./tsdx.config');

const files = {
  '@types/isolib': '@types',
  '@isolib/icons': '@types/components/atoms/Icon',
};

for (const key of Object.keys(files)) {
  const fileName = path.join('dist', files[key], 'package.json');
  fs.writeFile(fileName, `{ "name": "${key}" }`, function (err) {
    if (err) throw err;
    console.log(`Module ${key} is created successfully.`);
  });
}

const fileContent = (filename) => {
  return ` 
    'use strict'

    if (process.env.NODE_ENV === 'production') {
      module.exports = require('./${filename}.cjs.production.min.js')
    } else {
      module.exports = require('./${filename}.cjs.development.js')
    }
  `;
};

for (const filename of Object.values(components)) {
  const outputDir = process.cwd() + '/dist/';
  fs.writeFileSync(outputDir + filename + '.js', fileContent(filename));
}
