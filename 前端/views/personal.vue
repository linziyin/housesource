<template>
	<div class="personal">
		<div class="title">
			<h1>个人中心</h1>
			<p>The Personal Center</p>
		</div>
		<el-container >
			<el-main class="aside">
				<div class="profile">
					<div class="propic">
						<img src="../assets/boypic.png" alt="" v-if="gender=='男'">
						<img src="../assets/girlpic.png" alt="" v-else-if="gender=='女'">
						</div>
				  <p class="username" @click="routeto(0)" v-bind:style="styleClick[0]">{{username}}</p>
				</div>
				<div class="operation">
					<li @click="routeto(1)" v-bind:style="styleClick[1]"><i class="el-icon-upload2"></i>我发布的房源</li>
					<li @click="routeto(2)" v-bind:style="styleClick[2]"><i class="el-icon-star-off"></i>我的收藏</li>
					<li  @click="routeto(3)" v-bind:style="styleClick[3]"><i class="el-icon-help"></i>帮助与投诉</li>
				</div>
			</el-main>
			<el-main class="main">
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				username: '',
				gender: '',
				styleClick: ['','','',''],
				style: {
					color: '#1E90FF'
				},
				infopath: ['userinfo','postinfo','starinfo','helpinfo']
			}
		},
		watch: {
			$route(){
				if(this.$route.path == '/userinfo') this.styleClick[0] = this.style;
				else this.styleClick[0] = '';
			}
		},
		created: function() {
			this.getUsername();
			this.$router.push('userinfo');
		},
		methods: {
			async getUsername(){
				const {data : res} = await this.$axios.get('personal');
				console.log(res.code);
				if(res.code != 200) this.$message.error('获取信息失败');
				else {
					this.username = res.data.username;
					this.gender = res.data.gender;
				}
			},
			routeto: function(index){
				this.styleClick=[];
				this.styleClick[index]=this.style;
				this.$router.push(this.infopath[index]);
			}
		}
	}
</script>

<style>
	.propic img{
		width: 100%;
		height: 100%;
	}
	li{
		list-style: none;
	}
	.personal{
		height: 870px;
		font-family: Helvetica;
		background-color: #F8F8F9;
		border: 1px solid #F8F8F9;
	}
	.title{
		text-align: left;
		margin-left: 20px;
	}
	.personal h1{
		font-size: 32px;
		margin-top: 30px;
		margin-bottom: 15px;
	}
	.title p{
		margin: 15px 0 20px 15px;
		color: #888;
	}
	.el-container{
		width: 1500px;
		max-height: 750px;
		margin: 0 auto;
	}
	.aside{
		/* display: none; */
		flex: 2;
		padding: 0;
		overflow: visible;
	}
	.aside .profile{
		margin-bottom: 30px;
		background-color: #fff;
		border: 1px solid #F8F8F9;
		border-radius: 15px;
		box-shadow: 3px 3px #ccc;
		transition: all .5s;
	}
	.profile:hover{
		transform: scale(1.05);
		box-shadow: 5px 5px #ddd;
	}
	.aside .propic{
		width: 85px;
		height: 85px;
		margin: 15px auto;
		border: 1px solid #ccc;
		border-radius: 50%;
		overflow: hidden;
	}
	.aside .username{
		text-align: center;
		margin: 25px 0;
		font-size: 19px;
		font-weight: 700;
		cursor: pointer;
	}
	.username:hover{
		color: #1E90FF;
	}
	
	.aside .operation{
		padding: 15px 0;
		background-color: #fff;
		border-radius: 15px;
		box-shadow: 3px 3px #ccc;
	}
	.operation li{
		font-size: 18px;
		color: #888;
		letter-spacing: 0.03em;
		text-align: left;
		line-height: 40px;
		margin-left: 30px;
		cursor: pointer;
		transition: all .1s;
	}
	.operation li:hover{
		transform: scale(1.02);
		color: #1E90FF;
		margin-left: 33px;
	}
	.operation li i{
		transform: scale(1.3);
		margin-right: 25px;
		cursor: pointer;
	}
	.main{
		flex: 7;
		margin-left: 25px;
		background-color: #fff;
		border-radius: 15px;
		box-shadow: 3px 3px #ccc;
	}
</style>
