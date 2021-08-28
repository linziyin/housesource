<template>
	<div class="register">
		<h3>用户注册</h3>
		<el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="registerForm.username" @blur="checkName"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="registerForm.password" type="password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="pwd">
				<el-input v-model="registerForm.pwd" type="password" @blur="checkPwd"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-radio-group v-model="registerForm.gender">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<!-- 目前渲染的解决方案：页面初始化时向后端请求省、市、区名并返回push到各数组中 -->
			<el-form-item label="地址" prop="uaddress">
				<el-select v-model="registerForm.uaddress.pname" placeholder="请选择省" style="width: 120px" @click.native="getProvince">
					<el-option v-for="(province,index) in addresses" :key="index" :label="province" :value="province"></el-option>
			  </el-select>
				<el-select v-model="registerForm.uaddress.cname" placeholder="请选择市" style="margin-left: 20px;  width: 120px" @click.native="getCity">
					<el-option v-for="(city,index) in addresses" :key="index" :label="city" :value="city"></el-option>
				</el-select>
				<el-select v-model="registerForm.uaddress.aname" placeholder="请选择区" style="margin-left: 20px;  width: 120px" @click.native="getArea">
					<el-option v-for="(area,index) in addresses" :key="index" :label="area" :value="area"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitUser('registerForm')">注册</el-button>
				<el-button @click="resetUser('registerForm')">重置</el-button>
			</el-form-item>
		</el-form>
		<!-- <p>地址:{{addresses}}</p>
		<p>提交的数据:{{updata}}</p> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				updata: {},
				registerForm: {
					username: '',
					password: '',
					pwd: '',
					gender: '男',
					uaddress: {
						pname: '',
						cname: '',
						aname: ''
					}
				},
				addresses: [],
				rules: {
					username: [
						{required: true,message: '请输入用户名',trigger: 'blur'},
						{min: 2,max: 20,message: '长度在 2 到 20 个字符',trigger: 'blur'}
					],
					password: [
						{required: true,message: '请输入密码',trigger: 'blur'},
						{min: 6,max: 16,message: '长度在 6 到 16 个字符',trigger: 'blur'}
					],
					pwd: [
						{required: true,message: '两次密码输入不一致',trigger: 'blur'}
					],
					gender: [
						{required: true, trigger: 'blur'}
					],
					uaddress: [
						{required: true,message: '请选择城市',trigger: 'blur'},
					]
				}
			}
		},
		created(){
			
		},
		methods: {
			async getProvince(){
				const {data : res} = await this.$axios.get('register/province');
				if(res.code !== 200){
					return this.$message.error('获取城市失败');
				}
				this.addresses = res.data;
			},
			async getCity(){
				const {data : res} = await this.$axios.get('register/city',{params: this.registerForm.uaddress});
				if(res.code !== 200){
					return this.$message.error('获取城市失败');
				}
				this.addresses = res.data;
			},
			async getArea(){
				const {data : res} = await this.$axios.get('register/area',{params: this.registerForm.uaddress});
				if(res.code !== 200){
					return this.$message.error('获取城市失败');
				}
				this.addresses = res.data;
			},
			checkName: async function(){
				this.uname = this.registerForm.username;
				const {data : res} = await this.$axios.get('register/same',{params: {'uname':this.registerForm.username}})
				if(res.code !== 200){
					this.$message.error('用户名已存在');
					this.registerForm.username = "";
				}
				else {
					// console.log(res.code);
					// console.log(this.registerForm.password);
					return;
				};
			},
			checkPwd: function(){
				if(this.registerForm.pwd != ''){
					if(this.registerForm.pwd !== this.registerForm.password){
						this.registerForm.pwd = "";
					}
					else return;
				}else return;
			},
			submitUser: function(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						this.$message.error('注册失败');
						return false;
					}
					this.updata = this.registerForm;
					const {data : res} = await this.$axios.get('register',{params: this.updata});
					if(res.code == 200){
						this.$message.success(res.message);
					}
					else this.$message.error(res.message);
					// console.log(res.data);
					// console.log(res.code);
					// console.log(res.message);
					
					this.$router.push('login');
				})
			},
			resetUser: function(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style>
	.register{
		width: 500px;
		height: auto;
		margin: 100px auto;
		padding: 50px;
		padding-top: 20px;
		border: 1px solid #ccc;
		border-radius: 20px;
	}
	.register h3{
		margin-bottom: 30px;
	}
	.demo-ruleForm{
		width: 500px;
		height: auto;
	}
	.el-form-item__label{
		/* font-size: 15px; */
		font-weight: 700;
	}
	.el-radio-group{
		
	}
	.el-form-item:last-child{
		margin-top: 50px;
		margin-left: -15px;
	}
	.el-button{
		margin: 0 30px;
	}
</style>
