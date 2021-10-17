<template>
	<view>我的</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	onLoad() {
		// 如果没有token,跳转到登录页面
		if (!this.$u.utils.isLogin()) return
	}
}
</script>

<style></style>
