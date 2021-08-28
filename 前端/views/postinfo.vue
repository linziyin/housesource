<template>
	<div class="postinfo">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/personal' }">个人中心</el-breadcrumb-item>
		  <el-breadcrumb-item>查看发布房源</a></el-breadcrumb-item>
		</el-breadcrumb>
		<el-tabs type="border-card">
      <el-tab-pane label="审核中">
				<div v-bind:style="tab1" class="none">无内容</div>
				<div class="card" v-for="incheck in inchecks">
          <div class="card__image-holder">
            <img class="card__image" :src="incheck.himg[0]"/>
          </div>
          <h3 class="card-title">{{incheck.hname}}</h3>
          <div class="card-description">{{incheck.haddress}}</div>
          <div class="card-actions"><i class="incheck">审核中</i></div>
        </div>
			</el-tab-pane>
      
			<el-tab-pane label="已通过">
				<div v-bind:style="tab2" class="none">无内容</div>
				<div class="card" v-for="(pass,index) in passes">
				  <div class="card__image-holder">
				    <img class="card__image" :src="pass.himg[0]"/>
				  </div>
				  <h3 class="card-title">{{pass.hname}}</h3>
				  <div class="card-description" >{{pass.haddress}}</div>
				  <div class="card-actions"><i class="pass">已通过</i><i v-if="pass.hpay==1" class="pay">已支付</i><i v-else class="btn2" @click="topay(index)">支付</i><i class="btn1" @click="getpHid(1,index)">详情</i></div>
				</div>
			</el-tab-pane>
      <el-tab-pane label="未通过">
				<div v-bind:style="tab3" class="none">无内容</div>
				<div class="card" v-for="(notpass,index) in notpasses">
				  <div class="card__image-holder">
				    <img class="card__image" :src="notpass.himg[0]"/>
				  </div>
				  <h3 class="card-title">{{notpass.hname}}</h3>
				  <div class="card-description">{{notpass.haddress}}</div>
				  <div class="card-actions"><i class="notpass">未通过</i><i class="btn" @click="getpHid(2,index)">详情</i></div>
				</div>
			</el-tab-pane>
    </el-tabs>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				status: 0,
				inchecks: [],
				passes: [],
				notpasses: [],
				tab1: '',
				tab2: '',
				tab3: '',
				tabstyle: {
					display: 'none'
				},
				hid: ''
			}
		},
		created: function(){
			this.getincheck();
			this.getpass();
			this.getnotpass();
		},
		methods: {
			async getincheck(){
				const {data : res} = await this.$axios.get('personal/incheck');
				if(res.code !== 200) this.$message.error('获取信息失败');
				else {
					if(res.data.length != 0) {
						this.tab1 = this.tabstyle;
						this.inchecks = res.data;
					}
					else 	this.tab1 = '';
					console.log('inchecks : '+this.inchecks);
				}
			},
			async getpass(){
				const {data : res} = await this.$axios.get('personal/pass');
				if(res.code !== 200) this.$message.error('获取信息失败');
				else {
					if(res.data.length != 0) {
						this.tab2 = this.tabstyle;
						this.passes = res.data;
					}
					else 	this.tab2 = '';
				}
			},
			async getnotpass(){
				const {data : res} = await this.$axios.get('personal/notpass');
				if(res.code !== 200) this.$message.error('获取信息失败');
				else {
					if(res.data.length != 0) {
						this.tab3 = this.tabstyle;
						this.notpasses = res.data;
					}
					else 	this.tab3 = '';
				}
			},
			getpHid: function(status,index){
				if(status == 1){
					this.hid = this.passes[index].hid;
					console.log('1---'+this.hid);
					this.$router.push({name: 'post', params: {hid: this.hid}});
				}
				else {
					this.hid = this.notpasses[index].hid;
					console.log('2---'+this.hid);
					this.$router.push({name: 'post', params: {hid: this.hid}});
				}
			},
			async topay(index) { //房主缴费操作
			this.hid = this.passes[index].hid;
				const {
					data: res
				} = await this.$axios.get('house/updateOneInfo', {
					params: {
						'hid': this.hid,
						'hpay': '1'
					}
				})
				this.passes[index].hpay=1;
				alert('支付成功');
			},
		}
	}
</script>

<style>
	i{
		font-style: normal;
	}
	.el-tabs{
		margin-top: 20px;
	}
	.el-tabs__content{
		text-align: left;
	}
.cards {
  margin: 10px 0;
  max-width: 960px;
  text-align: left;
}
.card {
  background-color: #fff;
  display: inline-block;
  margin: 12px;
  text-align: left;
  width: 240px;
	box-shadow: -1px 0px 3px #eee , 1px 1px 3px #eee;
	border-radius: 3px;
	overflow: hidden;
}
.card__image-holder {
  background: rgba(0,0,0,0.1);
  height: 150px;
  width: 100%;	
  }
.card__image-holder .card__image{
	width: 240px;
	height: 150px;
	object-fit: cover;
}
.card .card-title {
	background-color: #fff;
	margin: 10px 5px;
 }
 .card-description{
	 margin: 0 5px;
	 height: 45px;
 }
.card-actions{
	box-shadow: 0 2px 0px 0 rgba(0,0,0,0.075);
	padding: 5px 5px 10px;
	text-align: left;
}
.incheck{
	color: gold;
	display: inline-block;
	padding: 6px 0px 8px;
}
.pass{
	color: limegreen;
	display: inline-block;
	padding: 6px 0px 8px;
}
.notpass{
	color: red;
	display: inline-block;
	padding: 6px 0px 8px;
}
.btn {
  background: #0096a0;
	border-radius: 4px;
	box-shadow: 0 2px 0px 0 rgba(0,0,0,0.25);
	color: #fff;
	display: inline-block;
	padding: 6px 20px 8px;
	margin-left: 110px;
  cursor: pointer;
}
.btn2 {
  background: #00BFFF;
	border-radius: 4px;
	box-shadow: 0 2px 0px 0 rgba(0,0,0,0.25);
	color: #fff;
	display: inline-block;
	padding: 6px 10px 8px;
	margin:0px 5px 0px 70px;
  cursor: pointer;
}
.pay{
	color: #00BFFF;
	margin:0px 5px 0px 65px;
}
.btn1{
	background: #0096a0;
		border-radius: 4px;
		box-shadow: 0 2px 0px 0 rgba(0,0,0,0.25);
		color: #fff;
		display: inline-block;
		padding: 6px 10px 8px;
		cursor: pointer;
}
.none {
	margin: 20px 0;
	text-align: center;
}
</style>
