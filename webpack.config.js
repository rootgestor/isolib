const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const componentsPath = path.join(__dirname, './src/components');
const dynamicEntries = fs.readdirSync(componentsPath).reduce(
  (initial, item) => ({
    ...initial,
    [item]: `${componentsPath}/${item}/index.js`,
  }),
  {}
);

module.exports = {
  mode: 'production',
  entry: {
    All: './index.js',
    ...dynamicEntries,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/env', '@babel/preset-react'] },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: ['[name]'],
    libraryTarget: 'umd',
    asyncChunks: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
    }),
  ],
};
