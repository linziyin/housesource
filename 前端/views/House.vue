<template>
	<div>
		<el-backtop>
			<i class="el-icon-caret-top"></i>
		</el-backtop>
		<div>
			<router-link to="/home">首页</router-link>
			<span>></span>
			<span>{{ this.HouseList[0].hname }}</span>
			<br />
			<h2>{{ this.HouseList[0].hname }}</h2>
			<el-tag>{{ this.HouseList[0].htype }}</el-tag>
			<el-tag type="info">{{ this.HouseList[0].hproperty }}</el-tag>
			<i class="el-icon-star-on" style="color: #e6a23c" v-if="show" @click="change">取消收藏</i>
			<i class="el-icon-star-off" v-if="!show" @click="change">收藏</i>
		</div>
		<div>
			<div class="left">
				<el-carousel trigger="click" height="300px">
					<el-carousel-item v-for="item in this.imgList" :key="item">
						<!-- <h3>{{ item }}</h3> -->
						<!-- {{ item }} -->
						<el-image :src=item class="imgurl">
							<div slot="placeholder" class="image-slot">
								加载中<span class="dot">...</span>
							</div>
						</el-image>
						<!-- <img
              :src="require('../assets/img/' + item + '')"
              alt=""
              class="imgurl"
            /> -->
					</el-carousel-item>
				</el-carousel>
			</div>
			<div class="right">
				<div class="price">
					<span class="title">参考均价</span>
					<span class="price-number">{{ this.HouseList[0].hprice }}/m<sup>2</sup></span><br />
				</div>
				<div class="other">
					<span class="title">项目地址</span><span>{{ this.HouseList[0].haddress }}</span><br />
					<span class="title">最新开盘</span><span>{{ this.HouseList[0].hopen }}</span><br />
					<span class="title">楼盘户型</span><span>{{ this.HouseList[0].hlayout }}</span><br />
					<span class="title">详情</span><span>{{ this.HouseList[0].hdesc }}</span><br />
				</div>
			</div>
		</div>
		<div style="clear: both"></div>
		<div class="next">
			<ul>
				<li><a href="#a1">户型介绍</a></li>
				<li><a href="#a2">楼盘动态</a></li>
				<li><a href="#a3">楼盘评论</a></li>
			</ul>
			<span>{{ "咨询电话：" + this.UserList[0].unumber }}</span>
		</div>
		<div>
			<h3 id="a1">户型介绍</h3>
			<div class="f">
				<span class="f1">{{ this.HouseList[0].hlayout }}</span><br />
				<span class="f2">{{
          "建面" +
          this.HouseList[0].harea +
          "平方米(" +
          this.HouseList[0].htoward +
          ")"
        }}</span><br />
				<span class="f2">{{ this.HouseList[0].hfloor }}</span><br />
				<span class="f3">{{ this.HouseList[0].hfeature }}</span><br />
			</div>
		</div>
		<div>
			<h3 id="a2">楼盘动态</h3>
			<div v-if="this.HouseList[0].htype === '新房'" class="f">
				<span class="f1">{{ "开盘时间" + this.HouseList[0].hopen }}</span><br />
				<span class="f2">{{ this.HouseList[0].hproperty }}</span><br />
				<span class="f2">{{ this.HouseList[0].hstatus }}</span><br />
				<span class="f3">{{ this.HouseList[0].hfitup }}</span><br />
			</div>
			<div v-else-if="this.HouseList[0].htype === '二手房'" class="f">
				<span class="f1">{{ this.HouseList[0].hage }}</span><br />
				<span class="f2">{{ this.HouseList[0].hfitup }}</span><br />
			</div>
			<div v-else class="f">
				<span class="f1">{{ this.HouseList[0].hway }}</span><br />
				<span class="f2">{{ this.HouseList[0].htime }}</span><br />
			</div>
		</div>
		<div>
      <h3 id="a3">{{ "楼盘评论(" + this.clength + ")" }}</h3>
      <template v-if="this.clength!==0">
        <div
        class="f"
        style="width: 50%"
        v-for="(item, index) in commentList"
        :key="index"
      >
        <div style="float: left">
          <i class="el-icon-user-solid tou"></i>
        </div>
        <div class="comment">
          <h4 class="name">{{ item.cname }}</h4>
          <el-rate
            v-model="item.cscore"
            disabled
            text-color="#ff9900"
            score-template="item.cscore"
          >
          </el-rate>
          <span class="desc">{{ item.cdesc }}</span
          ><br />
          <span class="date">{{ item.cdate }}</span>
        </div>
      </div>
      </template>
      <template v-else>
        <div class="f" style="width: 50%">
          <p style="text-align:center">暂无评论</p>
        </div>
      </template>
    </div>
		<!-- <p>{{ this.commentList }}</p> -->
	</div>
</template>

<script>
	export default {
		name: "House",
		data() {
			return {
				HouseList: [],
				UserList: [],
				Houseid: "",
				imgList: [],
				// imgList: [
				//   require("../assets/img/1-1.jpg"),
				//   require("../assets/img/1-2.jpg"),
				// ],
				show: false,
				changeInfo: {
					uid: "",
					hid: "",
				},

				store: [],
				commentList: [],
				clength: "",
			};
		},
		created() {
			console.log('house.vue');
			this.getHouseList();
		},
		activated(){
			this.getHouseList();
		},
		methods: {
			async getHouseList() {
				await this.$axios.get("house/getAllHouses").then((res) => {
					console.log(res.data);
					this.HouseList = res.data.data;
					this.imgList = this.HouseList[0].himg;
					this.commentList = this.HouseList[0].hcomment;
					if(this.commentList==undefined) this.clength=0;
					else{
						this.clength = this.commentList.length;
						if(typeof(this.commentList[0])==String){
							for(var i=0;i<this.clength;i++){
								this.commentList[i] = JSON.parse(this.commentList[i]);
							}
						}
					} 
					
					this.Houseid = this.HouseList[0].hid;
				});
				await this.$axios.get('house/showstore').then((res) => {
					console.log(res.data.data);
					this.store = res.data.data[0].store;
					console.log(this.store)
					for (let i in this.store) {
						if (this.store[i] == this.Houseid) {
							this.show = true;
							break;
						}

					}
				});
				await this.$axios
					.get("house/getHouseid", {
						params: {
							uid: this.HouseList[0].h_uid,
						},
					})
					.then((res) => {
						console.log(res.data);
						this.UserList = res.data.data;
					});
			},
			async addstore() {
				await this.$axios.get("house/addstore").then((res) => {
					console.log(res.data.data);
				});
			},
			async reducestore() {
				await this.$axios.get("house/reducestore").then((res) => {
					console.log(res.data.data);
				});
			},
			change() {
				if (this.show) {
					this.show = false;
					this.reducestore();
				} else if (!this.show) {
					this.show = true;
					this.addstore();
				}
			},
		},
	};
</script>

<style scoped>
	.imgurl {
		width: 100%;
		height: 100%;
	}

	h2 {
		display: inline-block;
	}

	ul {
		width: 50%;
	}

	ul,
	li {
		list-style: none;
		margin: 0;
		padding: 0;
		display: inline-block;
	}

	li {
		height: 100%;
		line-height: 54px;
		visibility: middle;
		text-align: center;
		width: 97px;
		position: relatve;
		transition: color 0.3s linear;
	}

	li a {
		color: #101d37;
		text-decoration: none;
		display: inline-block;
		height: 50px;
		box-sizing: border-box;
	}

	.headContainer {
		height: 100vh;
		overflow-x: hidden;
	}

	.left {
		float: left;
		width: 50%;
		text-align: center;
		/* background-color: red; */
	}

	.right {
		position: absolute;
		float: left;
		width: 50%;
		height: 200px;
		left: 50%;
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 50px;
	}

	/* .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
	.price {
		border-bottom: #ccc 1px solid;
	}

	.title {
		width: 81px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #9399a5;
		display: inline-block;
		margin: 10px;
	}

	.price-number {
		font-family: Tahoma-Bold;
		font-size: 30px;
		line-height: 1;
		color: #fe615a;
	}

	.other {
		margin-top: 20px;
	}

	.next {
		background-color: #ebeef5;
		margin-top: 20px;
	}

	.f {
		border: #ccc 1px solid;
		width: 300px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
		padding: 20px;
		overflow: hidden;
	}

	.f1 {
		font-weight: 700;
		display: inline-block;
		margin: 10px;
	}

	.f2 {
		color: #9399a5;
		display: inline-block;
		margin: 10px;
	}

	.f3 {
		font-family: Tahoma-Bold;
		font-size: 20px;
		line-height: 1;
		color: #fe615a;
		display: inline-block;
		margin: 10px;
	}

	.tou {
		display: inline-block;
		border-radius: 50%;
		background-color: #ccc;
		margin-top: 30px;
	}

	.comment {
		/* float: left; */
		left: 120px;
		padding: 10px;
		margin-left: 20px;
		/* display: inline-block; */
	}

	.desc {
		display: inline-block;
		padding: 20px 0;
	}

	.date {
		padding: 20px 0;
		color: #9399a5;
	}
</style>
