var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");
var GitRevisionWebpackPlugin = require("git-revision-webpack-plugin");


module.exports = {
	entry: [
		"./src/index.js"
	],
	output: {
		publicPath: "/",
		path: path.join(__dirname, "dist"),
		filename: "[chunkhash].js"
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	devtool: false,
	module: {
		loaders: [
			{
				test: /\.js($|\?)/,
				exclude: /node_modules/,
				use: [{
					loader: "babel-loader",
					query: {
						'presets': [
							'es2015',
							'stage-0',
							'stage-1',
							'react'
						],
						'plugins': [
							"transform-runtime",
							"transform-decorators-legacy",
							"add-module-exports",
							"transform-class-properties",
							"transform-function-bind"
						]
					}
				}]
			}, {
				test: /\.json($|\?)/,
				use: [{
					loader: "json-loader"
				}]
			}, {
				test: /\.scss($|\?)/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {
								minimize: true,
								localIdentName: '[name]--[local]--[hash:base64:5]'
							}
						},
						{
							loader: "sass-loader"
						}
					]
				})
			}, {
				test: /\.png($|\?)/,
				use: {
					loader: "file-loader",
					query: {
						"mimetype": "image/png"
					}
				}
			}, {
				test: /\.jpg($|\?)/,
				use: {
					loader: "file-loader",
					query: {
						"mimetype": "image/jpeg"
					}
				}
			}, {
				test: /\.gif($|\?)/,
				use: {
					loader: "file-loader",
					query: {
						"mimetype": "image/gif"
					}
				}
			}, {
				test: /\.svg($|\?)/,
				use: {
					loader: "file-loader",
					query: {
						"mimetype": "image/svg+xml"
					}
				}
			}, {
				test: /\.eot($|\?)/,
				use: {
					loader: "file-loader",
					query: {
						"mimetype": "application/vnd.ms-fontobject"
					}
				}
			}, {
				test: /\.woff($|\?)/,
				use: {
					loader: "file-loader",
					query: {
						"mimetype": "application/font-woff"
					}
				}
			}, {
				test: /\.woff2($|\?)/,
				use: {
					loader: "file-loader",
					query: {
						"mimetype": "application/font-woff2"
					}
				}
			}, {
				test: /\.ttf($|\?)/,
				use: {
					loader: "file-loader",
					query: {
						"mimetype": "application/font-ttf"
					}
				}
			}, {
				test: /favicon\.ico$/,
				use: {
					loader: "static"
				}
			}, {
				test: /robots\.txt$/,
				use: {
					loader: "static"
				}
			}
		]
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.LoaderOptionsPlugin({
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			}
		}),
		new ExtractTextPlugin({
			filename: "[contenthash].css",
			disable: false,
			allChunks: true
		}),
		new webpack.EnvironmentPlugin([
			"API_URL",
			"HEADER_CLIENT"
		]),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			title: "Galaxy",
			version: (new GitRevisionWebpackPlugin()).version(),
			commithash: (new GitRevisionWebpackPlugin()).commithash()
		})
	]
};
