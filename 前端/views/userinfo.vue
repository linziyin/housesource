<template>
	<div class="userinfo">
		<el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/personal' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</a></el-breadcrumb-item>
    </el-breadcrumb>
		<hr />
		<div class="info">
			<li><i>ID</i><span>{{user.uid}}</span></li>
			<li><i>用户名</i><span>{{user.username}}</span></li>
			<li><i>性别</i><span>{{user.gender}}</span></li>
			<li><i>地址</i><span>{{user.uaddress}}</span></li>
			<li><i>联系方式</i><span>{{user.unumber}}</span></li>
			<div class="profilepic">
				<div class="pic">
					<img src="../assets/boypic.png" alt="" v-if="user.gender=='男'">
					<img src="../assets/girlpic.png" alt="" v-else-if="user.gender=='女'">
				</div>
				<p>我的头像</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				user: {
					uid: '',
					username: '',
					gender: '',
					uaddress: '',
					unumber: '',
				}
			}
		},
		created() {
			this.getUserinfo();
		},
		methods: {
			async getUserinfo(){
				const {data : res} = await this.$axios.get('personal');
				if(res.code !== 200) this.$message.error('获取信息失败');
				else {
					this.user = res.data;
					// console.log(this.user);
				}
			}
		}
	}
</script>

<style>
	.pic img{
		width: 100%;
		height: 100%;
	}
	.userinfo{
		text-align: left;
	}
	li{
		list-style: none;
	}
	.info{
		position: relative;
		margin: 40px 0 0 25px;
	}
	.info li{
		margin: 50px 0;
	}
	.info li i{
		display: inline-block;
		width: 80px;
		font-style: normal;
		font-size: 19px;
		color: #555;
		text-align: right;
		font-weight: 700;
		margin-right: 30px;
		padding-right: 10px;
		border-right: 5px solid #ccc;
		text-shadow: 1px 1px #888;
	}
	.info li span{
		font-size: 19px;
	}
	.el-breadcrumb{
		margin: 5px 0 0 5px;
		font-size: 16px;
		letter-spacing: 0.02em;
	}
	hr{
		margin-top: 10px;
	}
	.profilepic{
		position: absolute;
		top: 0;
		right: 60px;
		width: 250px;
		height: 250px;
		border: 2px solid #eee;
		border-radius: 10px;
	}
	.pic{
		width: 130px;
		height: 130px;
		margin: 15px auto;
		border: 1px solid #ccc;
		border-radius: 50%;
		overflow: hidden;
	}
	.profilepic p{
		margin: 30px 10px 0;
		text-align: center;
		font-size: 22px;
		font-weight: 700;
		cursor: pointer;
	}
/* 	.profilepic p:hover{
		color: #1E90FF;
	} */
</style>
