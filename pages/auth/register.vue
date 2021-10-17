<template>
	<view class="register">
		<view class="top"></view>
		<view class="content">
			<view class="title">注册账号</view>
			<input class="u-border-bottom" v-model="name" placeholder="昵称" />
			<input class="u-border-bottom" v-model="email" placeholder="邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom" type="password" v-model="password_confirmation" placeholder="请确定密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">完成注册</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 昵称
			name: '',
			// 邮箱
			email: '',
			// 密码
			password: '',
			// 确定密码
			password_confirmation: ''
		}
	},
	computed: {
		inputStyle() {
			let style = {}
			if (this.$u.test.email(this.email) && this.password && this.password == this.password_confirmation && this.name) {
				style.color = '#fff'
				style.backgroundColor = this.$u.color['warning']
			}
			return style
		}
	},
	methods: {
		// 完成注册提交表单
		async submit() {
			if (!this.$u.test.email(this.email) || !this.password || this.password !== this.password_confirmation || !this.name) return
			// 处理登录可用的参数
			const pamams = {
				name: this.name,
				email: this.email,
				password: this.password,
				password_confirmation: this.password_confirmation
			}
			// 请求API,执行注册
			const RegisterApi = await this.$u.api.authRegister(pamams)
			this.$u.toast('注册成功')
			// 跳转至登录页面
			setTimeout(() => {
				this.$u.route({
					type: 'reLaunch',
					url: 'pages/auth/login'
				})
			}, 1500)
		}
	}
}
</script>

<style lang="scss" scoped>
.register {
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
