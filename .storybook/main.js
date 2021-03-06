module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  core: { builder: 'webpack5' },
  addons: [
    {
      name: 'storybook-preset-less',
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-postcss',
    '@storybook/builder-webpack5',
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
};
