var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");
var GitRevisionWebpackPlugin = require("git-revision-webpack-plugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
var extractCSS = new ExtractTextPlugin('stylesheets/[name]-[contenthash].css');
var extractLESS = new ExtractTextPlugin('stylesheets/[name]-[contenthash].css');

module.exports = {
	entry: {
		app: "./src/index.js"
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
							"transform-async-to-generator",
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
			},
			{
				test: /\.css($|\?)/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: { importLoaders: 1 } },
					]
				})

			}, {
				test: /\.less/,
				use: extractLESS.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: { importLoaders: 1 } },
						{ loader: 'less-loader'}
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
		// 用来清除dist目录
		new WebpackCleanupPlugin({ quiet: true }),
		// https://webpack.js.org/plugins/loader-options-plugin/
		new webpack.LoaderOptionsPlugin({
			debug: false,
			minimize: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			},
			output: {
				comments: false,
			}
		}),
		extractCSS,
		extractLESS,
		new webpack.EnvironmentPlugin(Object.keys(process.env)),
		// https://github.com/jantimon/html-webpack-plugin#configuration
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			title: "Galaxy",
			version: (new GitRevisionWebpackPlugin()).version(),
			commithash: (new GitRevisionWebpackPlugin()).commithash(),
			minify: {
				collapseWhitespace: true
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: function(module) {
				return module.context && module.context.indexOf("node_modules") !== -1;
			}
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
			logLevel: 'warn'
		}),
		new DuplicatePackageCheckerPlugin()
	]
};
