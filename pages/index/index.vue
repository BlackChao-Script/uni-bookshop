<template>
	<view>{{ title }}</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'index'
		}
	},
	onLoad() {
		// this.$u.api.getIndexData().then(res => {
		// 	console.log(res);
		// })
		// uview封装的vuex
		// console.log(this.vuex_version)
		// this.$u.vuex('vuex_user.name','Chaoer')
		// console.log(this.vuex_user.name)
	},
	methods: {}
}
</script>

<style lang="scss" scoped></style>
