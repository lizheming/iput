const path = require('path');
const config = require('../build/webpack.config');

config.mode = 'production';
delete config.devtool;
config.entry = {
  main: path.resolve(__dirname, './main.jsx')
};
config.output = {
  path: path.resolve(__dirname),
  filename: '[name].js'
};
delete config.externals;

config.devServer = {
  static: {
    directory: path.join(__dirname),
  },
  compress: true,
  port: 9000,
  open: true
};

module.exports = config;