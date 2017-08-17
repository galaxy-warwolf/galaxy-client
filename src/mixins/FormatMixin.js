import moment from 'moment';
import * as _ from 'lodash';

const formatSex = (sex) => {
	switch (sex) {
		case '男':
		case 'M': {
			return '男';
		}
		case '女':
		case 'F': {
			return '女';
		}
		case '其他':
		case 'O': {
			return '其他';
		}
		default: {
			return '未填';
		}
	}
};

const formatTime = (time) => {
	return moment(time).format("YYYY-MM-DD HH:mm:ss");
};

const formatBoolean = (val) => {
	if (val) {
		return "是"
	} else {
		return "否"
	}
};

const adjustImageView = (value, type, width, height) => {
	return `${value}?imageView2/${type}/w/${width}/h/${height}`;
};

export default {
	formatSex,
	formatTime,
	formatBoolean,
	adjustImageView,
};
