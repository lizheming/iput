const es3ifyPlugin = require('es3ify-webpack-plugin');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

module.exports = {
  devtool: 'source-map',
  externals: {
    'react': reactExternal
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  plugins: [
    new es3ifyPlugin()
  ]
};