import _ from "lodash";
import moment from "moment-timezone";

const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */];

export function email(value) {
	// Let's not start a debate on email regex. This is just for an example app!
	if (_.isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
		return '邮箱地址不正确';
	}
}

export function required(value) {
	if (_.isEmpty(value)) {
		return '必填';
	}
}

export function needChoose(value) {
	if (_.isEmpty(value)) {
		return '必须选择';
	}
}

export function minLength(min) {
	return value => {
		if (!_.isEmpty(value) && value.length < min) {
			return `必须是至少${min}个字符`;
		}
	};
}

export function maxLength(max) {
	return value => {
		if (!_.isEmpty(value) && value.length > max) {
			return `必须是不能超过${max}个字符`;
		}
	};
}

export function integer(value) {
	if (!Number.isInteger(Number(value))) {
		return '必须是整数';
	}
}

export function oneOf(enumeration) {
	return value => {
		if (!~enumeration.indexOf(value)) {
			return `请选择以下类型: ${enumeration.join(', ')}`;
		}
	};
}

export function match(field) {
	return (value, data) => {
		if (data) {
			if (value !== data[field]) {
				return '不匹配';
			}
		}
	};
}

export function compareTime(startTimeField, endTimeField) {
	return (value, data) => {
		if (data) {
			const startTime = data[startTimeField];
			const endTime = data[endTimeField];
			if (startTime && endTime) {
				if (moment(startTime).isAfter(endTime)) {
					return "开始时间不能大于结束时间"
				}
			}
		}
	};
}


export function createValidator(rules) {
	return (data = {}) => {
		const errors = {};
		Object.keys(rules).forEach((key) => {
			const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
			const error = rule(data[key], data);
			if (error) {
				errors[key] = error;
			}
		});
		return errors;
	};
}
