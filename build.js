const fs = require('fs');
const path = require('path');

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
