const install = (Vue, vm) => {
	// 校验是否登录
	const isLogin = () => {
		// 如果没有token,跳转到登录页面
		const token = vm.$u.vuex_token
		if (!token) {
			// 来自哪个页面
			const currentPages = getCurrentPages().pop()
			// 获取页面路径和请求参数
			const {
				options,
				route
			} = currentPages
			// 参数的key
			const optionsKeys = Object.keys(options)
			let params = ''
			if (optionsKeys.length !== 0) {
				params = optionsKeys.reduce((pre, current) => {
					return `${pre}${current}=${options[current]}&`
				}, '?').slice(0, -1)
			}
			// 缓存当前页,用于登录之后或者注册之后的跳转
			uni.setStorageSync('back_url', route + params)
			vm.$u.toast('请登录')
			setTimeout(() => {
				vm.$u.route({
					type: 'redirect',
					url: 'pages/auth/login'
				})
			}, 1500)
			return false
		}
		return true
	}

	// 导出方法
	vm.$u.utils = {
		isLogin,
	};
}

export default {
	install
}
