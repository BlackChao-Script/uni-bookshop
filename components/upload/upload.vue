<template>
	<u-upload
		ref="upload"
		:action="action"
		:max-size="5 * 1024 * 1024"
		max-count="1"
		:custom-btn="true"
		:show-progress="false"
		:form-data="formData"
		:multiple="false"
		:deletable="false"
		:before-upload="beforeUpload"
		width="0"
		height="0"
		@on-success="onSuccess"
	>
		<u-avatar slot="addBtn" :src="vuex_user.avatar_url" size="140"></u-avatar>
	</u-upload>
</template>

<script>
let _this = {}
export default {
	data() {
		return {
			formData: {},
			action: '',
			upFileName:''
		}
	},
	created() {
		_this = this
	},
	methods: {
		// 上传之前的钩子
		async beforeUpload(index, list) {
			// 处理上传文件名
			const {file} = list[0]
			// #ifdef H5
			const fileName= file.name
			// #endif
			// #ifndef H5
			const fileName= file.path
			// #endif
			// 请求API,获取OssToken
			const OssToken = await _this.$u.api.authOssToken()
			// 设置上传域名
			_this.action = OssToken.host
			// 处理唯一文件名
			const suffix = fileName.slice(fileName.lastIndexOf('.'))
			const upFileName = _this.$u.guid(20) + suffix
			_this.upFileName = upFileName
			// 额外的上传参数
			_this.formData = {
				// 上传后的文件名
				'key': upFileName,
				'policy': OssToken.policy,
				'OSSAccessKeyId':OssToken.accessid,
				 //让服务端返回200,不然，默认会返回204
				'success_action_status' : '200',
				'signature': OssToken.signature,
			}
			return true
		},
		// 上传成功之后的钩子
		async onSuccess(){
			// 移除预览区域的图片
			this.$refs.upload.remove(0)
			// 请求API,更新头像
			await this.$u.api.upadtaAvatar({avatar: _this.upFileName})
			// 更新缓存的用户信息
			this.$u.utils.updateUser()
			this.$u.toast('更新头像成功')
		}
	}
}
</script>

<style></style>
