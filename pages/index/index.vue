<template>
	<view class="index">
		<!--  轮播图 -->
		<view class="swiper"><u-swiper :effect3d="true" :list="swiperData" name="img_url" height="320"></u-swiper></view>
		<!-- tabs切换栏 -->
		<view class="tabs"><u-tabs name="cate_name" active-color="#d4237a" :list="categoriesData" :is-scroll="false" :current="current" @change="change"></u-tabs></view>
		<!-- 商品列表 -->
		<view class="goods u-skeleton">
			<view class="goodsList" v-for="(item, index) in goodsData.length !== 0 ? goodsData : 4" :key="index">
				<view class="goodsList_img"><u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="item.cover_url"></u-image></view>
				<view class="text u-skeleton-rect">{{ item.title }}</view>
				<view class="pice u-skeleton-rect">
					<view class="pice_right u-skeleton-rect">￥{{ item.price }}</view>
					<view class="pice_left u-skeleton-rect">销量{{ item.sales }}</view>
				</view>
			</view>
		</view>
		<!-- 骨架屏 -->
		<u-skeleton bg-color="#fff" :loading="loading" :animation="true"></u-skeleton>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 轮播图数据
			swiperData: [],
			// 分类数据
			categoriesData: [
				{
					cate_name: '默认'
				},
				{
					cate_name: '销量'
				},
				{
					cate_name: '推荐'
				},
				{
					cate_name: '最新'
				}
			],
			// 各分类的选中的索引
			current: 0,
			// 商品数据
			goodsData: [],
			// 当前页
			page: 1,
			// 是否显示骨架屏
			loading: false
		}
	},
	onLoad() {
		this.getIndexData()
	},
	methods: {
		// 切换tabs时触发
		change(index) {
			this.current = index
			// 重置商品数据和分类
			this.goodsData = []
			this.page = 1
			this.getIndexData()
		},
		// 请求首页数据
		async getIndexData() {
			// 显示骨架屏
			this.loading = true
			const params = {
				page: this.page
			}
			// 判断tabs分类
			if (this.current == 1) params.sales = 1
			if (this.current == 2) params.recommend = 1
			if (this.current == 3) params.new = 1
			const res = await this.$u.api.getIndexData(params)
			// 隐藏骨架屏
			this.loading = false
			this.swiperData = res.slides
			this.goodsData = [...this.goodsData, ...res.goods.data]
		}
	},
	onReachBottom() {
		// 重新请求数据,带上分页数据
		this.page += 1
		this.getIndexData()
	}
}
</script>

<style lang="scss" scoped>
.index {
	.tabs {
		margin-top: 10rpx;
	}
	.goods {
		margin-top: 10rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.goodsList {
			width: 45%;
			box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
			margin-bottom: 20rpx;
			transition: all 1s;
			.text {
				text-align: center;
				font-size: 30rpx;
				margin-top: 5rpx;
				font-weight: 600;
			}
			.pice {
				display: flex;
				text-align: center;
				justify-content: space-between;
				margin-top: 10rpx;
				margin-bottom: 30rpx;
				.pice_right {
					width: 40%;
					color: #d4237a;
				}
				.pice_left {
					width: 40%;
					color: #c0c4cc;
					font-size: 15rpx;
				}
			}
		}
		.goodsList:hover {
			box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.5);
		}
	}
}
</style>
