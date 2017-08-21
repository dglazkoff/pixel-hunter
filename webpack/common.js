const join = require('path').join;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = join(__dirname, '../');

const getPostCSSPlugins = require(join(rootDir, '.postcss'));

module.exports = {
  entry: {
    /*
      each entry's resulting bundle size should not be more than 250kb,
      more info here: https://github.com/webpack/webpack/issues/3216
    */
    'demo-feature': join(rootDir, './src/demo-feature/'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
        },
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: join(rootDir, './build'),
    publicPath: '/',
    filename: './[name].js',
    sourceMapFilename: '[file].map?[hash]',
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV_ENV: process.env.NODE_ENV === 'development',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ExtractTextPlugin('./[name].css', {
        allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      src: join(rootDir, './src'),
    },
  },
  resolveLoader: {
    modulesDirectories: [join(rootDir, 'node_modules')],
  },
  postcss: getPostCSSPlugins,
};
