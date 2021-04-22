// var baseUrl = "https://www.mootive.cn/";
var baseUrl = "http://live_applet.com/";
var baseUrls = "https://hj.gzhjzdd.cn/";
// var baseUrls = "https://www.myfutrue.com/"
// var baseUrls = "http://www.toupiao.com/";
const http = ({ url = '', param = {}, ...other } = {}) => {
	let timeStart = Date.now();
	return new Promise((resolve, reject) => {
		wx.request({
			url: getUrl(url),
			data: param,
			header: {
				'content-type': 'application/json'
			},
			...other,
			complete: (res) => {
				wx.hideLoading();
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data)
				} else {
					reject(res)
				}
			}
		})
	})
}

const https = ({ url = '', param = {}, ...other } = {}) => {
	let timeStart = Date.now();
	return new Promise((resolve, reject) => {
		wx.request({
			url: getUrls(url),
			data: param,
			header: {
				'content-type': 'application/json'
			},
			...other,
			complete: (res) => {
				wx.hideLoading();
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data)
				} else {
					reject(res)
				}
			}
		})
	})
}


const getUrls = (url) => {
	if (url.indexOf('://') == -1) {
		url = baseUrls + url;
	}
	return url
}

const getUrl = (url) => {
	if (url.indexOf('://') == -1) {
		url = baseUrl + url;
	}
	return url
}
// get方法
const _get = (url, param = {}) => {
	return http({
		url,
		param
	})
}

const _post = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'post'
	})
}

const _posts = (url, param = {}) => {
	return https({
		url,
		param,
		method: 'post'
	})
}

const _put = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'put'
	})
}

const _delete = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'put'
	})
}
module.exports = {
	baseUrl,
	baseUrls,
	_get,
	_post,
	_posts,
	_put,
	_delete
}