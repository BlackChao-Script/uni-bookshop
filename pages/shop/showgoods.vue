<template>
	<view class="showGoods">
		<!--  商品图片 -->
		<view class="showGoods_img"><u-image width="100%" height="600rpx" :src="goods.cover_url"></u-image></view>
		<!--  商品标题 -->
		<view class="showGoods_title">{{ goods.title }}</view>
		<!-- 商品价格与销量 -->
		<view class="showGoods_box">
			<view class="box1">￥{{ goods.price }}</view>
			<view class="box2">
				<text>销量</text>
				<text class="box2_l">{{ goods.sales }}</text>
			</view>
		</view>
		<!-- tabs切换 -->
		<view class="showGoods_tabs"><u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#d4237a"></u-tabs></view>
		<!-- 商品详情 -->
		<view class="showGoods_del" v-if="current == 0"><u-parse :html="goods.details"></u-parse></view>
		<!-- 商品评论 -->
		<view class="showGoods_comments" v-if="current == 1">
			<view class="comment" v-for="(res, index) in goods.comments" :key="res.id">
				<view class="left"><image :src="res.user.avatar_url" mode="aspectFill"></image></view>
				<view class="right">
					<view class="top">
						<view class="name">{{ res.user_id }}</view>
					</view>
					<view class="content">{{ res.content }}</view>
				</view>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="showGoods_likeGoods" v-if="current == 2">
			<view class="goods ">
				<view class="goodsList" v-for="(item, index) in LikeGoods" :key="index" @click="toShowGoods(item.id)">
					<view class="goodsList_img"><u-image width="100%" height="300rpx" :src="item.cover_url"></u-image></view>
					<view class="text">{{ item.title }}</view>
					<view class="pice ">
						<view class="pice_right ">￥{{ item.price }}</view>
						<view class="pice_left ">销量{{ item.sales }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 购物栏 -->
		<view class="navigation">
			<view class="left">
				<view class="item u-text-center" @click="likeGoodss">
					<block v-if="isCollects === 0">
						<u-icon name="heart" :size="40"></u-icon>
						<view class="text u-line-1">收藏</view>
					</block>
					<block v-else>
						<u-icon name="heart" :size="40" color="red"></u-icon>
						<view class="text u-line-1" style="color: red">已收藏</view>
					</block>
				</view>
				<view class="item car">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right"><view class="cart btn u-line-1" @click="addCart">加入购物车</view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 商品id
			goodsId: '',
			// 商品数据
			goods: [],
			// 推荐商品
			LikeGoods: [],
			list: [
				{
					name: '商品详情'
				},
				{
					name: '商品评论'
				},
				{
					name: '推荐商品'
				}
			],
			current: 0,
			// 是否显示骨架屏
			loading: false,
			// 是否收藏
			isCollects: 0,
			// 购物车数量
			cartCount: 0
		}
	},
	// 生命周期函数
	onLoad(options) {
		this.goodsId = options.id
		this.getShowGoods() // 获取商品数据
		this.getCartCuont() // 获取购物车数量
	},
	methods: {
		// 获取商品详细数据
		async getShowGoods() {
			// 显示骨架屏
			this.loading = true
			// 请求API,获取商品详细数据
			const goodsres = await this.$u.api.getShowGoodsData(this.goodsId)
			this.goods = goodsres.goods
			this.LikeGoods = goodsres.like_goods
			this.isCollects = goodsres.goods.is_collect
		},
		change(index) {
			this.current = index
		},
		// 点击商品触发
		toShowGoods(id) {
			this.$u.route({
				url: 'pages/shop/showgoods',
				params: {
					id
				}
			})
		},
		// 点击收藏商品
		async likeGoodss() {
			// 请求API,收藏商品
			await this.$u.api.goodsCollects(this.goodsId)
			// 收藏成功提示消息,并改变收藏状态
			if (this.isCollects === 0) {
				this.$u.toast('收藏成功')
				this.isCollects = 1
			} else {
				this.$u.toast('取消收藏')
				this.isCollects = 0
			}
		},
		// 点击添加购物车
		async addCart() {
			const params = {
				goods_id: this.goodsId
			}
			// 请求API,添加购物车
			await this.$u.api.cartAddGoods(params)
			this.$u.toast('添加成功')
			// 重新获取购物车数据
			this.getCartCuont()
		},
		// 获取购物车数量
		async getCartCuont() {
			const token = this.vuex_token
			if (token) {
				const res = await this.$u.api.cartList()
				this.cartCount = res.data.length
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.showGoods {
	.showGoods_img {
		height: 600rpx;
	}
	.showGoods_title {
		margin: 20rpx;
		font-size: 35rpx;
		font-weight: 600;
	}
	.showGoods_del {
		padding: 10rpx;
		padding-bottom: 150rpx;
	}
	.showGoods_box {
		display: flex;
		justify-content: space-between;
		text-align: center;
		margin-top: 30rpx;
		.box1 {
			width: 20%;
			font-size: 35rpx;
			color: red;
		}
		.box2 {
			width: 20%;
			.box2_l {
				padding-left: 20rpx;
			}
		}
	}
	.showGoods_tabs {
		margin-top: 20rpx;
		.comment {
			display: flex;
			padding: 30rpx;
			.left {
				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background-color: #f2f2f2;
				}
			}
			.right {
				flex: 1;
				padding-left: 20rpx;
				font-size: 30rpx;
				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 10rpx;
					.name {
						color: #5677fc;
					}
				}
				.content {
					margin-bottom: 10rpx;
				}
			}
		}
	}
	.showGoods_likeGoods {
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
	.navigation {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		.left {
			margin-left: 20rpx;
			width: 50%;
			display: flex;
			font-size: 20rpx;
			.item {
				margin: 0 30rpx;
				&.car {
					text-align: center;
					position: relative;
					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			margin-right: 20rpx;
			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}
			.cart {
				background-color: #ed3f14;
				margin-left: 40rpx;
			}
		}
	}
}
</style>
