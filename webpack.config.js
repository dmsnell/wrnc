var webpack = require( 'webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	entry: './src/app.jsx',
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
			inject: true,
			templateContent:
			'<html><head>' +
			'<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>' +
			'</head><body><div id="root"/></body></html>'
		} )
	],
	resolve: {
		modulesDirectories: [ '', 'src', 'node_modules' ],
		extensions: [ '', '.js', '.jsx' ]
	},
	devtool: 'source-map'
};
