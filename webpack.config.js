module.exports = {
	entry: "./example/main.jsx",
	output: {
		path: "./example",
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
