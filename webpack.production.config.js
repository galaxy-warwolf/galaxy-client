var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");
var GitRevisionWebpackPlugin = require("git-revision-webpack-plugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
	entry: {
		app: [
			// "babel-polyfill",
			"./src/index.js"
		]
	},
	output: {
		publicPath: "/",
		path: path.join(__dirname, "dist"),
		filename: "[name]-[chunkhash].js"
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
							"transform-function-bind",
							["import", {libraryName: "antd", style: "css"}]
						]
					}
				}]
			}, {
				test: /\.json($|\?)/,
				use: [{
					loader: "json-loader"
				}]
			}, {
				test: /\.less/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								// sourceMap: true,
								importLoaders: 1,
								// localIdentName: 'gg[name]--[local]--[hash:base64:5]'
							}
						},
						{
							loader: 'less-loader',
							// options: {strictMath: true, noIeCompat: true, sourceMap: true}
							// options: {sourceMap: true}
						}
					]
				})
			}, {
					test: /\.css($|\?)/,
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
							// {
							// 	loader: "sass-loader"
							// }
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
		// new ExtractTextPlugin("style.css"),
		new webpack.EnvironmentPlugin([
			"API_URL",
			"HEADER_CLIENT"
		]),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			title: "Galaxy",
			version: (new GitRevisionWebpackPlugin()).version(),
			commithash: (new GitRevisionWebpackPlugin()).commithash()
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, 'node_modules')
					) === 0
				)
			}
		}),
		new BundleAnalyzerPlugin({
			// Can be `server`, `static` or `disabled`.
			// In `server` mode analyzer will start HTTP server to show bundle report.
			// In `static` mode single HTML file with bundle report will be generated.
			// In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
			analyzerMode: 'server',
			// Host that will be used in `server` mode to start HTTP server.
			analyzerHost: '127.0.0.1',
			// Port that will be used in `server` mode to start HTTP server.
			analyzerPort: 8888,
			// Path to bundle report file that will be generated in `static` mode.
			// Relative to bundles output directory.
			reportFilename: 'report.html',
			// Module sizes to show in report by default.
			// Should be one of `stat`, `parsed` or `gzip`.
			// See "Definitions" section for more information.
			defaultSizes: 'parsed',
			// Automatically open report in default browser
			openAnalyzer: true,
			// If `true`, Webpack Stats JSON file will be generated in bundles output directory
			generateStatsFile: false,
			// Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
			// Relative to bundles output directory.
			statsFilename: 'stats.json',
			// Options for `stats.toJson()` method.
			// For example you can exclude sources of your modules from stats file with `source: false` option.
			// See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
			statsOptions: null,
			// Log level. Can be 'info', 'warn', 'error' or 'silent'.
			logLevel: 'info'
		})
	]
};
