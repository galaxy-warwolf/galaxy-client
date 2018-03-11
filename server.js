/* eslint no-console: 0 */

const express = require('express');
const webpack = require('webpack');
const opn = require('opn')
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const proxy = require('http-proxy-middleware')

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
	const compiler = webpack(config);
	const middleware = webpackMiddleware(compiler, {
		publicPath: config.output.publicPath,
		contentBase: 'src',
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	});
	middleware.waitUntilValid(() => {
		opn(`http://0.0.0.0:${port}`);
	})

	const context = [`/api/*`];

	//options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。
	const options = {
		target: process.env.API_URL,
		changeOrigin: true
	}

	//将options对象用proxy封装起来，作为参数传递
	const apiProxy = proxy(options)

	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.use(context, apiProxy)
} else {
	app.use(express.static(__dirname + '/dist'));
}

app.listen(port, '0.0.0.0', function onStart(err) {
	if (err) {
		console.log(err);
	}
	console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
	// opn(`http://0.0.0.0:${port}`);
});
