
const install = (Vue, vm) => {
	// 请求首页数据
	let getIndexData = (params = {}) => vm.$u.get('/api/index', params);
	
	// 导出请求方法
	vm.$u.api = {
		getIndexData
	};
}

export default {
	install
}
