<template>
	<div class="starinfo">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/personal' }">个人中心</el-breadcrumb-item>
			<el-breadcrumb-item>我的收藏</a></el-breadcrumb-item>
		</el-breadcrumb>
		<el-tabs type="border-card">
			<el-tab-pane label="新房">
				<div v-bind:style="tab1" class="none">无内容</div>
					<div class="house-content" v-for="(newhouse,index) in newhouses">
						<div class="post-image"><img :src="newhouse.himg[0]" /></div>
						<div class="description">
							<h1 @click="getsHid(1,index)">The name of house ● {{newhouse.hname}}</h1>
							<h2>The address of the house  {{newhouse.haddress}}</h2>
							<p> Something special of the house {{newhouse.hfeature}}</p>
							<p class="read-more"><i>{{newhouse.hfitup}}·朝{{newhouse.htoward}}·{{newhouse.hlayout}}</i><i>{{newhouse.hproperty}}</i><i>{{newhouse.hopen}}开盘</i></p>
						</div>
						<div class="price"><i>{{newhouse.hprice}}</i>元/平</div>
					</div>
			</el-tab-pane>
			<el-tab-pane label="二手房">
				<div v-bind:style="tab2" class="none">无内容</div>
				<div class="house-content" v-for="(oldhouse,index) in oldhouses">
					<div class="post-image"><img :src="oldhouse.himg[0]" /></div>
					<div class="description">
						<h1 @click="getsHid(2,index)">The name of house ● {{oldhouse.hname}}</h1>
						<h2>The address of the house  {{oldhouse.haddress}}</h2>
						<p> Something special of the house {{oldhouse.hfeature}}</p>
						<p class="read-more"><i>{{oldhouse.hfitup}}·朝{{oldhouse.htoward}}·{{oldhouse.hlayout}}</i><i>{{oldhouse.hage}}楼龄</i></p>
					</div>
					<div class="price"><i>{{oldhouse.hprice*10000}}</i>元/平</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="租房">
				<div v-bind:style="tab3" class="none">无内容</div>
				<div class="house-content" v-for="(renthouse,index) in renthouses">
					<div class="post-image"><img :src="renthouse.himg[0]" /></div>
					<div class="description">
						<h1 @click="getsHid(3,index)">The name of house ● {{renthouse.hname}}</h1>
						<h2>The address of the house  {{renthouse.haddress}}</h2>
						<p> Something special of the house {{renthouse.hfeature}}</p>
						<p class="read-more"><i>{{renthouse.hfitup}}·朝{{renthouse.htoward}}·{{renthouse.hlayout}}</i><i>{{renthouse.hway}}</i><i>{{renthouse.htime}}</i></p>
					</div>
					<div class="price"><i>{{renthouse.hprice}}</i>元</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				newhouses: [],
				oldhouses: [],
				renthouses: [],
				tab1: '',
				tab2: '',
				tab3: '',
				tabstyle: {
					display: 'none'
				},
			}
		},
		created() {
			this.getStore();
			// this.getNew();
			// this.getOld();
			// this.getRent();
		},
		methods: {
			async getStore(){
				const {data : res} = await this.$axios.get('personal/store');
				if(res.code !== 200) this.$message.error('获取信息失败');
				else {
					// console.log(res.data);
					this.getStarhouse(res.data);
				}
			},
			async getStarhouse(store){
				for(var i=0; i<store.length; i++){
					const {data : res} = await this.$axios.get('personal/getStarhouse',{params: store[i]});
					if(res.code !== 200) this.$message.error('获取信息失败');
					else {
						// console.log(res.data.htype);
					  if(res.data.htype == '新房') this.newhouses.push(res.data);
						else if(res.data.htype == '二手房') this.oldhouses.push(res.data);
						else this.renthouses.push(res.data);
				  }
				}
				if(this.newhouses.length != 0) this.tab1 = this.tabstyle;
				else this.tab1 = '';
				if(this.oldhouses.length != 0) this.tab2 = this.tabstyle;
				else this.tab2 = '';
				if(this.renthouses.length != 0) this.tab3 = this.tabstyle;
				else this.tab3 = '';
			},
			getsHid: function(status,index){
				if(status == 1){
					console.log('1---'+this.newhouses[index].hid);
				}
				else if(status == 2){
					console.log('2---'+this.oldhouses[index].hid);
				}
				else console.log('3---'+this.renthouses[index].hid);
			}
		}
	}
</script>

<style>
	.el-tabs {
		margin-top: 20px;
	}

	i {
		font-style: normal;
	}

	.house-content {
		border-bottom: 1px dotted #ccc;
		height: 210px;
	}

	.post-image {
		float: left;
		position: relative;
		width: 200px;
		height: 200px;
		overflow: hidden;
	}

	.post-image img {
		position: absolute;
		top: 0;
		left: 0;
		width: 200px;
		height: 200px;
		object-fit: cover;
	}

	.description {
		float: left;
		position: relative;
		margin-left: 30px;
		margin-right: 0px;
		width: 620px;
		height: 100%;
	}

	.description h1 {
		line-height: 1;
		margin-top: 15px;
		font-size: 1.7rem;
		cursor: pointer;
		transition: all .2s;
	}

	.description h1:hover {
		text-decoration: underline;
		color: deepskyblue;
	}

	.description h2 {
		font-size: 1rem;
		font-weight: 300;
		text-transform: uppercase;
		color: #a2a2a2;
		margin-top: 5px;
	}
	
	.description p{
		
	}

	.description .read-more {
		position: absolute;
		bottom: 10px;
		color: #5ad67d;
	}
	
	.read-more i {
		margin-right: 20px;
		border: 1px solid #5ad67d;
		border-radius: 7px;
		padding: 3px 6px;
	}

	.price {
		float: left;
		height: 100%;
		font-size: 20px;
		line-height: 130px;
		text-align: center;
		margin: 0 auto;
		color: red;
	}
	.price i{
		font-size: 36px;
		font-weight: 700;
		margin-right: 8px;
	}
</style>
