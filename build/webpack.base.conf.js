var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
	entry: {
		app: [
			'babel-polyfill',
			'./src/main.ts'
		]
	},
	output: {
		path: config.build.assetsRoot,
		publicPath: env === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
		filename: './[name].[hash].js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.ts', '.css', '.scss'],
		alias: {
			'vue$': 'vue/dist/vue.common.js',
			'src': path.resolve(__dirname, '../src'),
			'assets': path.resolve(__dirname, '../src/assets'),
			'components': path.resolve(__dirname, '../src/components')
		},
		modules: ["node_modules", "lib", "style"]
	},
	module: {
		rules: [{
			enforce: "pre",
			test: /\.vue$|\.ts$/,
			loader: "eslint-loader",
			exclude: "/node_modules/"
		}, {
			test: /\.ts$/,
			loader: 'ts-loader',
			options: {
				appendTsSuffixTo: [/\.vue$/]
			},
			include: [path.resolve(__dirname, "../")],
			exclude: /node_modules/
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}, {
			test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 10000,
				name: utils.assetsPath('img/[name].[hash:7].[ext]')
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 10000,
				name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
			}
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'development': {
				NODE_ENV: env
			},
			// Global variables for app
			API_URL: config.settings.API_URL,
			GOOGLE_API_KEY: config.settings.GOOGLE_API_KEY
		})
	]
}