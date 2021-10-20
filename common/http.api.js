const install = (Vue, vm) => {
	// 请求首页数据
	let getIndexData = (params = {}) => vm.$u.get('/api/index', params);

	// 认证相关
	let authLogin = params => vm.$u.post('/api/auth/login', params); // 登录
	let authRegister = params => vm.$u.post('/api/auth/register', params); // 注册
	let authExit = () => vm.$u.post('/api/auth/logout') // 退出登录
	let authOssToken = () => vm.$u.get('/api/auth/oss/token') //OssToken

	// 用户相关
	let userInfo = () => vm.$u.get('/api/user') // 用户详情
	let updateUser = params => vm.$u.put('/api/user', params) // 修改用户信息
	let upadtaAvatar = params => vm.$u.patch('/api/user/avatar') // 更新用户头像

	// 商品相关
	let getShowGoodsData = params => vm.$u.get(`/api/goods/${params}`); // 商品数据
	let goodsCollects = params => vm.$u.post(`/api/collects/goods/${params}`) // 收藏与取消
	let goodsList = (params = {}) => vm.$u.get(`/api/goods`, params) // 商品分类

	// 购物车相关
	let cartAddGoods = params => vm.$u.post('/api/carts', params) // 添加购物车
	let cartList = () => vm.$u.get('/api/carts') // 购物车列表


	// 导出请求方法
	vm.$u.api = {
		getIndexData,
		authLogin,
		authRegister,
		userInfo,
		updateUser,
		authExit,
		authOssToken,
		upadtaAvatar,
		getShowGoodsData,
		goodsCollects,
		cartAddGoods,
		cartList,
		goodsList
	};
}

export default {
	install
}
