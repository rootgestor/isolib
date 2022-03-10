const fs = require('fs');
const path = require('path');

try {
  const packageJSON = JSON.parse(
    fs.readFileSync(path.join(__dirname, './package.json'))
  );

  const packageLockJSON = JSON.parse(
    fs.readFileSync(path.join(__dirname, './package-lock.json'))
  );

  const oldVersion = Number(packageJSON.version.replace(/\./g, ''));
  const version = String(oldVersion + 1)
    .split('')
    .join('.');

  const packageJSONnew = JSON.stringify({ ...packageJSON, version });
  fs.writeFileSync(path.join(__dirname, './package.json'), packageJSONnew);

  const packageLockJSONnew = JSON.stringify({
    ...packageLockJSON,
    version,
    packages: {
      ...packageLockJSON.packages,
      '': { ...packageLockJSON.packages[''], version },
    },
  });

  fs.writeFileSync(
    path.join(__dirname, './package-lock.json'),
    packageLockJSONnew
  );
} catch (e) {
  console.log('version not updated');
}
