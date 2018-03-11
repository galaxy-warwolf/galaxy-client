import superagent from "superagent";
import _ from "lodash";

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
	const compiled = _.template(path);
	return compiled({
		API_URL: process.env.API_URL
	});
}

export default class ApiClient {

	token;

	method;

	setToken(token) {
		this.token = token;
	}

	getMethod() {
		return this.method;
	}

	doErrorResponse(err) {
		let errMsg = {};
		if (err.status) {
			switch (err.status) {
				case 400:
					try {
						errMsg = this.formatError(err, errMsg);
					} catch (e) {
						errMsg.message = "非法请求";
					}
					break;
				case 403:
					try {
						errMsg = this.formatError(err, errMsg);
					} catch (e) {
						errMsg.message = "没有权限";
					}
					break;
				case 401:
					try {
						errMsg = this.formatError(err, errMsg);
					} catch (e) {
						errMsg.message = "权限验证错误";
					}
					break;
				case 413:
					try {
						errMsg = this.formatError(err, errMsg);
					} catch (e) {
						errMsg.message = "请求数据过大";
					}
					break;
				case 422:
					// TODO 目前先取第一条统一抛出
					let errors = JSON.parse(err.text).errors;
					errMsg.message = errors[0].message;
					if (errors[0].code) {
						errMsg.code = errors[0].code;
					}
					break;
				case 500:
					errMsg.message = "未知错误";
					break;
				case 503:
					errMsg.message = "服务器正在维护";
					break;
				default:
					try {
						errMsg = this.formatError(err, errMsg);
					} catch (e) {
						console.log(e, "未知错误");
						errMsg.message = "未知错误";
					}
					break;
			}
		} else {
			errMsg.message = err;
		}
		return errMsg;
	}

	formatError(err, errMsg) {
		const error = JSON.parse(err.text);
		errMsg.message = error.message;
		if (error.code) {
			errMsg.code = error.code;
		}
		return errMsg
	}

	constructor(req) {
		methods.forEach((method) =>
			this[method] =
				(path, {params, data, file, type} = {}) =>
					new Promise((resolve, reject) => {
						let request = superagent[method](formatUrl(path));

						this.method = method;

						if (params) {
							request.query(params);
						}

						if (this.token) {
							request.set('Authorization', 'bearer ' + this.token);
						}

						if (data) {
							request.set('Content-Type', 'application/json');
							request.send(data);
						}

						if (file) {
							request.attach('file', file);
						}

						if (type) {
							request.responseType(type);
						}

						request.end(
							(err, res) => {
								if (err) {
									const error = this.doErrorResponse(res);
									reject(error)
								} else {
									if (type === 'arraybuffer') {
										resolve(res.xhr);
									}

									if (res.body) {
										resolve(res.body);
									} else {
										resolve(res.text);
									}
								}
								if (res && res.status === 401) {
									window.location.href = '#/login';
									//TODO send event to notice redux to clear all things.
									window.localStorage.clear();
								}
							}
						);
					}));
	}

	/*
	 * There's a V8 bug where, when using Babel, exporting classes with only
	 * constructors sometimes fails. Until it's patched, this is a solution to
	 * "ApiClient is not defined" from issue #14.
	 * https://github.com/erikras/react-redux-universal-hot-example/issues/14
	 *
	 * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
	 *
	 * Remove it at your own risk.
	 */
	empty() {
	}
}
