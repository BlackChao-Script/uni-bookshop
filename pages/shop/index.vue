<template>
	<view class="u-wrap">
		<view class="u-search-box"><u-search placeholder="搜索商品" v-model="keyword" @custom="searchGoods" @clear="clearGoods"></u-search></view>
		<!-- tabs切换栏 -->
		<view class="tabs"><u-tabs name="cate_name" active-color="#d4237a" :list="categoriesData" :is-scroll="false" :current="current" @change="change"></u-tabs></view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<block v-for="(item, index) in categories">
					<view
						v-for="(e, ci) in item.children"
						:key="e.id"
						class="u-tab-item"
						:class="[current == e.id ? 'u-tab-item-active' : '']"
						:data-current="e.id"
						@tap.stop="swichMenu(e.id)"
					>
						<text class="u-line-1">{{ e.name }}</text>
					</view>
				</block>
			</scroll-view>
			<block>
				<scroll-view scroll-y class="right-box">
					<view class="page-view">
						<view class="class-item">
							<view class="item-container">
								<navigator class="thumb-box" v-for="(item, index) in goodsLists" :key="index" :url="'/pages/shop/showgoods?id=' + item.id">
									<image class="item-menu-image" :src="item.cover_url" mode=""></image>
									<view class="item-menu-name">{{ item.title }}</view>
								</navigator>

								<view class="u-flex-1 u-p-t-40 u-p-b-80" v-if="goodsLists.length == 0"><u-empty text="暂无此分类数据" mode="page"></u-empty></view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			categories: [], // 左侧分类数据
			goodsLists: [], // 商品数据
			scrollTop: 0, //tab标题的滚动条位置
			current: null, // 预设当前项的值
			menuHeight: 0, // 左边菜单的高度
			menuItemHeight: 0, // 左边菜单item的高度
			keyword: '', // 要搜索的商品值
			page: 1, // 分页
			// 排序分类数据
			categoriesData: [
				{
					cate_name: '销量'
				},
				{
					cate_name: '推荐'
				},
				{
					cate_name: '价格排序'
				},
				{
					cate_name: '评论数排序'
				}
			],
			// 各分类的选中的索引
			current: 0
		}
	},
	onLoad() {
		this.goodsList() // 获取商品分类数据
	},
	computed: {},
	methods: {
		getImg() {
			return Math.floor(Math.random() * 35)
		},
		// 点击左边的栏目切换
		async swichMenu(cid) {
			if (cid == this.current) return
			this.goodsLists = []
			this.current = cid
			this.page = 1
			this.goodsList()
		},
		// 获取一个目标元素的高度
		getElRect(elClass, dataVal) {
			new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(this)
				query
					.select('.' + elClass)
					.fields({ size: true }, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass)
							}, 10)
							return
						}
						this[dataVal] = res.height
					})
					.exec()
			})
		},
		// 获取商品分类数据
		async goodsList() {
			const params = {
				page: this.page,
				title: this.keyword
			}
			// 判断是否有分类id
			if (this.current) params.category_id = this.current
			// 判断tabs分类
			if (this.current == 0) params.sales = 1
			if (this.current == 1) params.recommend = 1
			if (this.current == 2) params.price = 1
			if (this.current == 3) params.comments_count = 1
			// 请求API,获取商品分类数据
			const res = await this.$u.api.goodsList(params)
			this.categories = res.categories
			this.goodsLists = [...this.goodsLists, ...res.goods.data]
		},
		// 搜索商品
		searchGoods() {
			this.page = 1
			this.goodsList()
		},
		// 清空搜索商品值
		clearGoods() {
			this.goodsList()
		},
		// 切换tabs时触发
		change(index) {
			this.current = index
			// 重置商品数据和分类
			this.goodsLists = []
			this.page = 1
			this.goodsList()
		}
	},
	// 触底的钩子
	onReachBottom() {
		this.pagr += 1
		this.goodsList()
	}
}
</script>

<style lang="scss" scoped>
.u-wrap {
	height: calc(100vh);
	/* #ifdef H5 */
	height: calc(100vh - var(--window-top));
	/* #endif */
	display: flex;
	flex-direction: column;
}

.u-search-box {
	padding: 18rpx 30rpx;
}

.u-menu-wrap {
	flex: 1;
	display: flex;
	overflow: hidden;
}

.u-search-inner {
	background-color: rgb(234, 234, 234);
	border-radius: 100rpx;
	display: flex;
	align-items: center;
	padding: 10rpx 16rpx;
}

.u-search-text {
	font-size: 26rpx;
	color: $u-tips-color;
	margin-left: 10rpx;
}

.u-tab-view {
	width: 200rpx;
	height: 100%;
}

.u-tab-item {
	height: 110rpx;
	background: #f6f6f6;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	color: #444;
	font-weight: 400;
	line-height: 1;
}

.u-tab-item-active {
	position: relative;
	color: #000;
	font-size: 30rpx;
	font-weight: 600;
	background: #fff;
}

.u-tab-item-active::before {
	content: '';
	position: absolute;
	border-left: 4px solid $u-type-primary;
	height: 32rpx;
	left: 0;
	top: 39rpx;
}

.u-tab-view {
	height: 100%;
}

.right-box {
	background-color: rgb(250, 250, 250);
}

.page-view {
	padding: 16rpx;
}

.class-item {
	margin-bottom: 30rpx;
	background-color: #fff;
	padding: 16rpx;
	border-radius: 8rpx;
}

.item-title {
	font-size: 26rpx;
	color: $u-main-color;
	font-weight: bold;
}

.item-menu-name {
	font-weight: normal;
	margin-top: 20rpx;
	font-size: 24rpx;
	color: $u-main-color;
}

.item-container {
	display: flex;
	flex-wrap: wrap;
}

.thumb-box {
	width: 45%;
	height: 300rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-left: 20rpx;
}

.item-menu-image {
	width: 120rpx;
	height: 150rpx;
}
</style>
