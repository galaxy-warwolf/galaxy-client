
const sleep = (time) => {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve();
		}, time);
	})
};

export default {
	sleep
};
