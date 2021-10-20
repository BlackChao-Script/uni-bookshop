<template>
	<view class="mineInfo u-p-l-30 u-p-r-30">
		<u-form :model="form" ref="uForm" :error-type="errorType">
			<u-form-item label="昵称" prop="name" required><u-input v-model="form.name" /></u-form-item>
		</u-form>
		<view class="button"><u-button @click="submit">提交</u-button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: ''
			},
			errorType: ['message'],
			rules: {
				name: [
					{
						required: true,
						message: '请输入昵称',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				]
			}
		}
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules)
		this.form.name = this.vuex_user.name
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(async valid => {
				if (valid) {
					// 更新用户信息
					await this.$u.api.updateUser(this.form)
					// 刷新用户信息，更新vuex
					this.$u.utils.updateUser()
					this.$u.toast('更新成功')
				}
			})
		}
	}
}
</script>

<style></style>
