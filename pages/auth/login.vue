<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录图书商城</view>
			<input class="u-border-bottom" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue" @click="toRegister">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: ''
		}
	},
	computed: {
		inputStyle() {
			let style = {}
			if (this.$u.test.email(this.email) && this.password) {
				style.color = '#fff'
				style.backgroundColor = this.$u.color['warning']
			}
			return style
		}
	},
	methods: {
		// 完成登录表单提交
		async submit() {
			if (!this.$u.test.email(this.email) || !this.password) return
			// 处理登录可用的参数
			const pamams = {
				email: this.email,
				password: this.password
			}
			// 请求API,执行登录
			const res = await this.$u.api.authLogin(pamams)
			// 缓存token
			this.$u.vuex('vuex_token', res.access_token)
			vm.$u.toast('登录成功')
			// 刷新用户信息，更新vuex
			this.$u.utils.updateUser()
			// 登录之后,跳转到来源页面
			const backUrl = uni.getStorageSync('back_url') || 'pages/index/index'
			setTimeout(() => {
				this.$u.route({
					type: 'reLaunch',
					url: backUrl
				})
			}, 1500)
		},
		// 点击跳转指注册页面
		toRegister() {
			this.$u.route({
				url: 'pages/auth/register'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;
		.u-border-bottom {
			margin-top: 30rpx;
			margin-bottom: 20rpx;
		}
		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;

			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
}
</style>
