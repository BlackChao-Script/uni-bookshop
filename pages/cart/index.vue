<template>
	<view class="cart">
		<!-- 购物车列表 -->
		<view class="cart_list" v-for="(item, index) in cartList" :key="item.id">
			<!-- 右侧商品展示 -->
			<view class="list_r">
				<view class="r_img"><u-image width="100%" height="300rpx" :src="item.goods.cover_url"></u-image></view>
				<view class="r_content">
					<view class="content_title">{{ item.goods.title }}</view>
					<view class="content_categor">{{ item.goods.description }}</view>
					<view class="content_bottom">
						<view class="bottom_pice">￥{{ item.goods.price }}</view>
						<view class="bottom_btn">
							<view class="btn_jian"><u-button @click="clickJian(item.id, index)" shape="circle" size="mini">-</u-button></view>
							<view class="btn_num">{{ item.num }}</view>
							<view class="btn_add"><u-button @click="clickAdd(item.id, index)" shape="circle" size="mini">+</u-button></view>
						</view>
						<view class="bottom_del" @click="clickTrash(item.id)"><u-icon name="trash" color="#d4237a" size="40"></u-icon></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 购物车底部结算栏 -->
		<view class="cart_tabar">
			<view class="tabar_text">
				合计:
				<text class="text_price">￥{{ totalRrice }}</text>
			</view>
			<view class="tabar_btn"><u-button @click="ClickToPreview" type="error" shape="square">去结算</u-button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			is_checked: false,
			cartList: [], // 购物车列表
			cart_ids: [], // 购物车所有id
			totalRrice: 0
		}
	},
	onShow() {
		this.getCartList()
	},
	onLoad() {
		this.changeCartChecked()
	},
	methods: {
		// 获取购物车列表数据
		async getCartList() {
			//请求API,获取购物车列表数据
			const res = await this.$u.api.cartList()
			// 计算总价格
			this.cartList = res.data
			const arr = []
			if (this.cartList.length == 0) return (this.totalRrice = 0)
			for (let i in this.cartList) {
				arr.push(this.cartList[i].num * this.cartList[i].goods.price)
				this.cartList[i].is_checked = 1
			}
			this.totalRrice = arr.reduce((a, b) => {
				return a + b
			}, 0)
		},
		// 改变选中购物车
		async changeCartChecked() {
			// 获取商品id
			const res = await this.$u.api.cartList()
			// 遍历得到所有商品id
			for (let r in res.data) {
				this.cart_ids.push(res.data[r].id)
			}
			await this.$u.api.cartChecked(this.cart_ids)
		},
		// 点击 -
		async clickJian(id, index) {
			if (this.cartList[index].num <= 1) {
				this.$u.toast('数量最少为1')
				return
			}
			this.cartList[index].num--
			await this.$u.api.cartChangeNum(id, { num: this.cartList[index].num })
			this.getCartList()
		},
		// 点击 +
		async clickAdd(id, index) {
			this.cartList[index].num++
			await this.$u.api.cartChangeNum(id, { num: this.cartList[index].num })
			this.getCartList()
		},
		// 点击删除
		async clickTrash(id) {
			await this.$u.api.cartRemGoods(id)
			this.$u.toast('移除成功')
			this.getCartList()
		},
		// 点击结算
		ClickToPreview() {}
	}
}
</script>

<style lang="scss" scoped>
.cart {
	.cart_list {
		margin-top: 20rpx;
		display: flex;
		background-color: #fafafa;
		height: 300rpx;
		.list_r {
			flex: 1;
			display: flex;
			.r_img {
				width: 35%;
			}
			.r_content {
				width: 65%;
				margin-left: 10rpx;
				margin-top: 10rpx;
				.content_title {
					font-size: 35rpx;
					font-weight: 700;
					padding: 10rpx;
				}
				.content_categor {
					font-size: 25rpx;
					margin-top: 20rpx;
					color: #8a8a8a;
				}
				.content_bottom {
					display: flex;
					align-items: center;
					margin-top: 120rpx;
					.bottom_pice {
						width: 30%;
						font-size: 35rpx;
						font-weight: 700;
						color: #d4237a;
					}
					.bottom_btn {
						width: 50%;
						display: flex;
						align-items: center;
						.btn_jian {
							width: 30%;
						}
						.btn_add {
							width: 30%;
						}
						.btn_num {
							width: 30%;
							margin: 0 5rpx;
							text-align: center;
						}
					}
					.bottom_del {
						margin-left: 20rpx;
						width: 20%;
					}
				}
			}
		}
	}
	.cart_tabar {
		position: fixed;
		bottom: 100rpx;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		.tabar_text {
			width: 50%;
			margin-left: 50rpx;
			.text_price {
				margin-left: 20rpx;
				color: #d4237a;
				font-size: 35rpx;
			}
		}
		.tabar_btn {
			width: 50%;
			padding: 10rpx;
		}
	}
}
</style>
