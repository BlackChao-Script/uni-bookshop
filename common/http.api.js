const install = (Vue, vm) => {
	// 请求首页数据
	let getIndexData = (params = {}) => vm.$u.get('/api/index', params);

	// 认证相关
	let authLogin = params => vm.$u.post('/api/auth/login', params); // 登录

	// 用户相关
	let userInfo = params => vm.$u.get('/api/user') //用户详情

	// 导出请求方法
	vm.$u.api = {
		getIndexData,
		authLogin,
		userInfo
	};
}

export default {
	install
}
