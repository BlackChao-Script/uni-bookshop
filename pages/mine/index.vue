<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10"><u-avatar :src="vuex_user.avatar_url" size="140"></u-avatar></view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{ vuex_user.name }}</view>
				<view class="u-font-14 u-tips-color">邮箱:{{ vuex_user.email }}</view>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group><u-cell-item icon="setting" title="修改个人信息" @click="tomineInfo"></u-cell-item></u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="订单"></u-cell-item>
				<u-cell-item icon="star" title="收藏"></u-cell-item>
				<u-cell-item icon="car" title="收货地址"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group><u-cell-item icon="minus-circle" title="退出登录"></u-cell-item></u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: true
		}
	},
	onLoad() {
		// 判断是否有token值
		if (!this.$u.utils.isLogin()) return
	},
	methods: {
		// 跳转至个人信息页面
		tomineInfo(){
			this.$u.route({
				url: 'pages/mine/mineInfo'
			})
		}
	}
}
</script>

<style lang="scss">
page {
	background-color: #ededed;
}
.u-flex {
	padding-top: 20rpx;
}
.camera {
	width: 54px;
	height: 44px;

	&:active {
		background-color: #ededed;
	}
}
.user-box {
	background-color: #fff;
}
</style>
