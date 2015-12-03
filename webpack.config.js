module.exports = {
	entry: "./main.jsx",
	output: {
		path: "./",
		filename: "main.js"
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{test: /\.jsx?$/, loader: "babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0"},
			{test: /\.css$/, loader: "style-loader!css-loader"}
		]
	}
}
