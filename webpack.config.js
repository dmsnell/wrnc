var webpack = require( 'webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	entry: __dirname + '/localApp.jsx',
	output: {
		path: __dirname,
		filename: 'index.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: [ 'react-hot', 'babel-loader' ]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: [ 'style', 'css', 'sass', 'autoprefixer' ]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin( {
			inject: false,
			templateContent:
			'<html><head>' +
			'<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>' +
			'</head><body><div id="root"/>' +
			'<script src="/index.js"></script>' +
			'</body></html>'
		} )
	],
	resolve: {
		modulesDirectories: [ '', 'src', 'node_modules' ],
		extensions: [ '', '.js', '.jsx' ]
	},
	devtool: 'source-map'
};
