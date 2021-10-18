const install = (Vue, vm) => {
	// 请求首页数据
	let getIndexData = (params = {}) => vm.$u.get('/api/index', params);

	// 认证相关
	let authLogin = params => vm.$u.post('/api/auth/login', params); // 登录
	let authRegister = params => vm.$u.post('/api/auth/register', params); // 注册

	// 用户相关
	let userInfo = () => vm.$u.get('/api/user') // 用户详情
	let updateUser = params => vm.$u.put('/api/user',params) // 修改用户信息

	// 导出请求方法
	vm.$u.api = {
		getIndexData,
		authLogin,
		authRegister,
		userInfo,
		updateUser
	};
}

export default {
	install
}
