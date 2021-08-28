<template>
	<div class="login">
		<div class="header">
			用户登录
			<div class="right">
				<el-link type="primary" @click="topath('register')">注册新用户</el-link>
			</div>
		</div>
		<el-form :model="loginForm" ref='loginForm' label-width="80px" :rules="loginFormrules">
			<el-form-item label='用户名' porp='username'>
				<el-input v-model="loginForm.username" clearable></el-input>
			</el-form-item>
			<el-form-item label='密码' porp='password' >
				<el-input v-model="loginForm.password" type="password" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submit">登录</el-button>
				<el-button type="primary" @click="reset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					username: '',
					password: ''
				},
				loginFormrules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 10,
							message: '长度在 2 到 10 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 18,
							message: '长度在 6 到 18 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			submit: function() {
				this.$refs.loginForm.validate(async valid => {
					if (!valid) return false;
					const {
						data: res
					} = await this.$axios.get('login', {
						params: this.loginForm
					});
					var userdata = res.data
					if (userdata != false) {
						if (userdata.role == 1) {
							this.$router.push('home')
						} else if (userdata.role == 0) {
							this.$router.push('managehome')
						} else {
							this.$alert('收藏成功', '收藏提示', {
								confirmButtonText: '确定'
							});
						}
					}
					// console.log(res.data)
					// if(res.code==200){
					// 	this.$router.push('myhome')
					// }
					// console.log('后端响应数据'+res)

				})
			},
			reset: function() {
				this.loginForm.username = '';
				this.loginForm.password = ''
			},
			topath: function(path) {
				this.$router.push(path)
			}
		}
	}
</script>

<style scoped>
	.el-form {
		margin-top: 10px;
		width: 300px;
		height: 250px;
	}

	.login {
		margin: 0 auto;
		width: 350px;
		border: 1px solid #f1f1f1;
		border-radius: 5px;
	}

	.header {
		border-bottom: 1px solid #f1f1f1;
		padding: 20px;
	}

	.right {
		float: right;
	}
</style>
