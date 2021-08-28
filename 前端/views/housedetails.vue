<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/managehome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>房源管理</el-breadcrumb-item>
			<el-breadcrumb-item>新房管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<el-card>
		<div class="latest">
			<div class="polaroid" v-for="value in postForm.himg">
				<img :src="value" alt="">
			</div>
			<div class="latest-details">
				<li class="first"><i>名称:</i>{{postForm.hname}}</li>
				<li class="second"><i>地址:</i>{{postForm.haddress}}</li>
				<li><i>类型:</i>{{postForm.htype}}</li>
				<div v-if="postForm.htype == '出租'">
					<li><i>方式:</i>{{postForm.hway}}</li>
					<li><i>租期:</i>{{postForm.htime}}</li>
				</div>
				<div v-else-if="postForm.htype == '新房'">
					<li><i>开盘:</i>{{postForm.hopen}}</li>
					<li><i>物业:</i>{{postForm.hproperty}}</li>
					<li><i>状态:</i>{{postForm.hstatus}}</li>
				</div>
				<div v-else>
					<li><i>楼龄:</i>{{postForm.hage}}</li>
				</div>
				<li><i>装修:</i>{{postForm.hfitup}}</li>
				<li v-if="postForm.htype == '出租'"><i>租金:</i>{{postForm.hprice}}元</li>
				<li v-else><i>期望售价:</i>{{postForm.hprice}}元/平方米</li>
				<li><i>面积:</i>{{postForm.harea}}</li>
				<li><i>户型:</i>{{postForm.hlayout}}</li>
				<li><i>朝向:</i>{{postForm.htoward}}</li>
				<li><i>楼层:</i>{{postForm.hfloor}}</li>
				<li><i>联系方式:</i>{{postForm.unumber}}</li>
				<li class="last"><i>特色:</i>{{postForm.hfeature}}</li>
			</div>
		</div>
		<div style="margin-top: 200px;text-align: center;" class="buttons">
			<p v-show="postForm.hchange!=0" class="watchout" style="text-align: center;">修改原因:
				{{postForm.hdialogue}}</p>
			<p v-show="postForm.hcheck==2" class="watchout" style="text-align: center;">审核不通过原因: {{postForm.hdialogue}}</p>
			<el-button v-show="postForm.hchange==0" type="primary" @click="check">审核通过</el-button>
			<el-button v-show="postForm.hchange==0" @click="postForm.hcheck=2">审核不通过</el-button>
			<el-button v-show="postForm.hchange==1" type="primary" @click="agressChange">同意修改</el-button>
			<p v-show="postForm.hchange==2" class="watchout" style="text-align: center;">已同意修改，用户还未进行修改</p>
			<div v-if="postForm.hcheck==2" style="width: 1000px;margin-top:20px;margin-left: 105px;">
				<el-input v-model="postForm.hdialogue" placeholder="请填写审核不通过原因">
					<el-button slot="append" @click="discheck">确认</el-button>
				</el-input>
			</div>
		</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				postForm: '',

			}
		},
		created() {
			this.getpostForm();
		},
		methods: {
			async getpostForm() {
				const {
					data: response
				} = await this.$axios.get('house/gethouse');

				console.log('post.vue : ' + Object.keys(response.data[0]));
				this.postForm = response.data[0];
				// response.data[0].hprice = Number(response.data[0].hprice);
				this.postForm.hprice = Number(response.data[0].hprice);
				this.postForm.harea = Number(response.data[0].harea);
				this.postForm.hid = response.data[0].hid;
			},
			async check() { //管理员审核通过操作，修改状态改为不修改，审核状态改为审核通过
				const {
					data: res
				} = await this.$axios.get('house/updateOneInfo', {
					params: {
						'hid': this.postForm.hid,
						'hcheck': '1',
						'hchange': '0',
						'hdialogue': ''
					}
				})
				alert('操作成功：审核通过');
			
			},
			async discheck() { //管理员审核不通过操作
				const {
					data: res
				} = await this.$axios.get('house/updateOneInfo', {
					params: {
						'hid': this.postForm.hid,
						'hcheck': '2',
						'hdialogue': this.postForm.hdialogue
					}
				})
				alert('操作成功：审核不通过');
			},
			async agressChange() {  //管理员同意修改  统一修改后，审核状态改为未通过，修改状态改为未修改
				this.postForm.hchange = 2;
				const {
					data: res
				} = await this.$axios.get('house/updateOneInfo', {
					params: {
						'hid': this.postForm.hid,
						'hcheck': '2',
						'hchange': '2'
					}
				})
				alert('操作成功：同意修改');
			}
		}
	}
</script>

<style>
	.latest {
		position: relative;
		width: 1250px;
		height: 600px;
		margin: 0px;
		/* margin-left: 200px; */
		background-color: #fff;
		z-index: 1;
	}

	.latest .polaroid {
		/* display: none; */
		position: relative;
		float: left;
		width: 288px;
		height: 360px;
		border: 1px solid #eee;
		border-radius: 10px;
		padding: 18px 18px 70px 18px;
		box-sizing: border-box;
		box-shadow: 3px 3px 5px #eee;
		overflow: hidden;
		z-index: 3;
		background-color: #fff;
	}

	.latest .polaroid:nth-child(-n+3) {
		margin-right: 20px;
	}

	.polaroid img {
		width: 250px;
		height: 270px;
		object-fit: cover;
		transition: all .4s;
		/* z-index: 1; */
	}

	.polaroid img:hover {
		width: 288px;
		height: 360px;
		transform: translate(-18px, -18px);
	}

	.latest .latest-details {
		position: absolute;
		/* bottom: 0px; */
		top: 400px;
		height: 50%;
		text-align: left;
		font-size: 19px;
		background-color: #fff;
		border: 3px solid #eee;
		border-radius: 10px;
		padding-top: 40px;
		z-index: 2;
	}

	.latest-details li {
		float: left;
		width: 250px;
		margin: 10px;
	}

	.latest-details .first,
	.latest-details .second,
	.latest-details .last {
		width: 520px;
	}

	.latest-details li i {
		letter-spacing: 0.15em;
		font-size: 20px;
		font-weight: 700;
		margin-right: 8px;
	}
</style>
