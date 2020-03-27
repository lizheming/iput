const path = require('path');

module.exports = {
	mode: 'production',
	entry: path.join(__dirname, './index.js'),
	output: {
		filename: 'main.js'
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
      }
    ]
  },
}
