var webpack = require('webpack');
const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
	devtool: 'source-map',
	entry: ['./src/index.tsx'],
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
	module: {
		rules: [{
				exclude: /node_modules/,
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader'
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	},
	output: {
		filename: 'leeloo.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
