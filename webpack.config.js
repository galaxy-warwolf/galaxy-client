"use strict";
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GitRevisionWebpackPlugin = require("git-revision-webpack-plugin");
const AutoDllPlugin = require('autodll-webpack-plugin');

module.exports = {
	entry: {
		app: [
			'webpack-hot-middleware/client?reload=true',
			'./src/index.js'
		]
	},
	devtool: "eval",
	output: {
		publicPath: "/",
		path: path.join(__dirname, "dist"),
		filename: "[name].js"
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: [
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
							'react',
							'react-hmre'
						],
						'plugins': [
							"transform-runtime",
							"transform-decorators-legacy",
							"add-module-exports",
							"transform-class-properties",
							"transform-function-bind"
						],
						compact: false
					}
				}]
			}, {
				test: /\.json($|\?)/,
				use: [{
					loader: "json-loader"
				}]
			}, {
				test: /\.scss($|\?)/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							localIdentName: '[name]--[local]--[hash:base64:5]'
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			}, {
				test: /\.png($|\?)/,
				use: [{
					loader: "url-loader",
					query: {
						"limit": 1048576,
						"mimetype": "image/png"
					}
				}],
			}, {
				test: /\.jpg($|\?)/,
				use: [{
					loader: "url-loader",
					query: {
						"limit": 1048576,
						"mimetype": "image/jpeg"
					}
				}]
			}, {
				test: /\.gif($|\?)/,
				use: [{
					loader: "url-loader",
					query: {
						"limit": 1048576,
						"mimetype": "image/gif"
					}
				}]
			}, {
				test: /\.svg($|\?)/,
				use: [{
					loader: "url-loader",
					query: {
						"limit": 1048576,
						"mimetype": "image/svg+xml"
					}
				}]
			}, {
				test: /\.eot($|\?)/,
				use: [{
					loader: "url-loader",
					query: {
						"limit": 1048576,
						"mimetype": "application/vnd.ms-fontobject"
					}
				}]
			}, {
				test: /\.woff($|\?)/,
				use: [{
					loader: "url-loader",
					query: {
						"limit": 1048576,
						"mimetype": "application/font-woff"
					}
				}]
			}, {
				test: /\.woff2($|\?)/,
				use: [{
					loader: "url-loader",
					query: {
						"limit": 1048576,
						"mimetype": "application/font-woff2"
					}
				}]
			}, {
				test: /\.ttf($|\?)/,
				use: [{
					loader: "url-loader",
					query: {
						"limit": 1048576,
						"mimetype": "application/font-ttf"
					}
				}]
			}, {
				test: /favicon\.ico$/,
				use: {
					loader: "static-loader"
				}
			}, {
				test: /robots\.txt$/,
				use: {
					loader: "static-loader"
				}
			}
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true
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
		}),
		new AutoDllPlugin({
			inject: true, // will inject the DLL bundles to index.html
			filename: '[name]_[hash].js',
			entry: {
				vendor: [
					"classnames",
					"history",
					"lodash",
					"lru-memoize",
					"moment",
					"moment-timezone",
					"react",
					"react-dom",
					"react-mixin",
					"react-redux",
					"react-router",
					"react-router-redux",
					"redux",
					"redux-form",
					"redux-localstorage",
					"redux-thunk",
					"superagent"
				]
			}
		})
	]
};
