const components = {
  'components/atoms/Icon/index': 'icons',
};

module.exports = {
  components,
  rollup(config, options) {
    const outputDir = process.cwd() + '/dist/';
    const extension = '.' + config.output.file.split('.').slice(1).join('.');
    let filename = config.input.split('src/')[1]; // remove src/
    filename = filename.split('.')[0]; // remove extension, if any

    if (components[filename]) {
      config.output.file = outputDir + components[filename] + extension;
      config.output.name = components[filename].replace('/', '__');
    }

    return config;
  },
};
