const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

const devPlugins = [];
if (process.env.NODE_ENV === 'development') {
  devPlugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin());
}

const componentsPath = path.join(__dirname, './src/components');
const dynamicEntries = fs
  .readdirSync(componentsPath)
  .reduce((initial, item) => {
    const groupPath = path.join(componentsPath, `./${item}`);
    const result = fs.readdirSync(groupPath).reduce(
      (groups, component) => ({
        ...groups,
        [component]: `${groupPath}/${component}/index.js`,
      }),
      {}
    );
    return { ...initial, ...result };
  }, {});

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
      {
        test: /\.(less)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'isolib',
    libraryTarget: 'umd',
  },
  plugins: [
    ...devPlugins,
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
    }),
  ],
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
};
