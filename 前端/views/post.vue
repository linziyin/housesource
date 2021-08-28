<template>
	<div class="post">
		<div class="nav">
			<span class="tab"><a href="#" v-for="(tab,index) in tabs" @click="tabClick(index+1)" v-bind:class="changeStyle(index+1)">{{tab}}</a></span>
		</div>

		<div v-show="ifshow==1" class="sale">
			<h1>发布我的房源</h1>
			<el-form :model="postForm" :rules="rules" ref="postForm" label-width="135px" class="demo-ruleForm" size="medium"
			 :disabled="bool">
				<el-form-item label="房屋所在城市" prop="haddress">
					<el-select v-model="postForm.haddress.pname" placeholder="请选择省" style="width: 120px" @click.native="getProvince">
						<el-option v-for="(province,index) in addresses" :key="index" :label="province" :value="province"></el-option>
					</el-select>
					<el-select v-model="postForm.haddress.cname" placeholder="请选择市" style="margin-left: 20px;  width: 120px"
					 @click.native="getCity">
						<el-option v-for="(city,index) in addresses" :key="index" :label="city" :value="city"></el-option>
					</el-select>
					<el-select v-model="postForm.haddress.aname" placeholder="请选择区" style="margin-left: 20px;  width: 120px"
					 @click.native="getArea">
						<el-option v-for="(area,index) in addresses" :key="index" :label="area" :value="area"></el-option>
					</el-select>
					<el-input type="textarea" :rows="2" resize="none" v-model="postForm.haddress.details" placeholder="请输入具体地址,如--镇--村(乡)--小区--栋--号"></el-input>
				</el-form-item>
				<el-form-item label="房屋名称" prop="hname">
					<el-input v-model="postForm.hname"></el-input>
				</el-form-item>
				<el-form-item label="房屋类型" prop="htype">
					<el-radio-group v-model="postForm.htype">
						<el-radio label="新房"></el-radio>
						<el-radio label="二手房"></el-radio>
						<el-radio label="出租"></el-radio>
					</el-radio-group>
				</el-form-item>
				<div v-show="postForm.htype=='新房'" class="firsthand">
					<el-form-item label="开盘" prop="hopen" label-width="125px">
						<el-radio-group v-model="postForm.hopen">
							<el-radio label="近期"></el-radio>
							<el-radio label="未来一个月"></el-radio>
							<el-radio label="未来三个月"></el-radio>
							<el-radio label="未来半年"></el-radio>
							<el-radio label="过去一个月"></el-radio>
							<el-radio label="过去三个月"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="物业" prop="hproperty" label-width="125px">
						<el-radio-group v-model="postForm.hproperty">
							<el-radio label="住宅"></el-radio>
							<el-radio label="别墅"></el-radio>
							<el-radio label="商业"></el-radio>
							<el-radio label="写字楼"></el-radio>
							<el-radio label="底商"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="状态" prop="hstatus" label-width="125px">
						<el-radio-group v-model="postForm.hstatus">
							<el-radio label="在售"></el-radio>
							<el-radio label="未开盘"></el-radio>
							<el-radio label="售罄"></el-radio>
						</el-radio-group>
					</el-form-item>
				</div>
				<div v-show="postForm.htype=='二手房'" class="secondhand">
					<el-form-item label="楼龄" prop="hage" label-width="125px">
						<el-radio-group v-model="postForm.hage">
							<el-radio label="5年以内"></el-radio>
							<el-radio label="10年以内"></el-radio>
							<el-radio label="15年以内"></el-radio>
							<el-radio label="20年以内"></el-radio>
							<el-radio label="20年以上"></el-radio>
						</el-radio-group>
					</el-form-item>
				</div>
				<div v-show="postForm.htype=='出租'" class="renthouse">
					<el-form-item label="方式" prop="hway" label-width="125px">
						<el-radio-group v-model="postForm.hway">
							<el-radio label="整租"></el-radio>
							<el-radio label="合租"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="租期" prop="htime" label-width="125px">
						<el-radio-group v-model="postForm.htime">
							<el-radio label="月租"></el-radio>
							<el-radio label="年租"></el-radio>
							<el-radio label="一个月起租"></el-radio>
							<el-radio label="1-3个月"></el-radio>
							<el-radio label="4-6个月"></el-radio>
						</el-radio-group>
					</el-form-item>
				</div>
				<el-form-item label="装修" prop="hfitup">
					<el-radio-group v-model="postForm.hfitup">
						<el-radio label="精装"></el-radio>
						<el-radio label="毛坯"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-if="postForm.htype!='出租'" label="期望售价" prop="hprice">
					<el-input v-model.number="postForm.hprice" placeholder="请输入您期望卖出的价格">
						<template slot="append" class="append">元 / 平方米</template>
					</el-input>
				</el-form-item>
				<el-form-item v-if="postForm.htype=='出租'" label="租金" prop="hprice">
					<el-input v-model.number="postForm.hprice" placeholder="请输入您期望租出的价格">
						<template slot="append" class="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item label="房屋面积" prop="harea">
					<el-input v-model.number="postForm.harea" placeholder="请输入房屋的占地面积">
						<template slot="append" class="append">平方米</template>
					</el-input>
				</el-form-item>
				<el-form-item label="户型" prop="hlayout">
					<el-radio-group v-model="postForm.hlayout">
						<el-radio label="1居"></el-radio>
						<el-radio label="2居"></el-radio>
						<el-radio label="3居"></el-radio>
						<el-radio label="4居"></el-radio>
						<el-radio label="4居+"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="朝向" prop="htoward">
					<el-radio-group v-model="postForm.htoward">
						<el-radio label="朝东"></el-radio>
						<el-radio label="朝西"></el-radio>
						<el-radio label="朝南"></el-radio>
						<el-radio label="朝北"></el-radio>
						<el-radio label="朝南北"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="楼层" prop="hfloor">
					<el-radio-group v-model="postForm.hfloor">
						<el-radio label="低楼层"></el-radio>
						<el-radio label="中楼层"></el-radio>
						<el-radio label="高楼层"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="特色" prop="hfeature">
					<el-input type="textarea" :rows="2" resize="none" v-model="postForm.hfeature" placeholder="如电梯房,复式,地铁沿线,公交直达,无理由退房等"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="unumber">
					<el-input v-model="postForm.unumber" placeholder="请输入您的联系方式,方便及时联系"></el-input>
				</el-form-item>
				<el-form-item label="房屋图片" prop="himg" class="pictures">
					<div class="demo-image" style="display: inline-block;">
						<div v-if="postForm.hcheck==0&&postForm.hchange==2||postForm.hcheck!=0" class="block" v-for="url in postForm.himg"
						 :key="fit" style="display: inline-block;text-align: center;">
							<el-popover placement="top-start" title="删除操作" width="60px" trigger="hover" content="删除该图片">
								<el-image slot="reference" style="margin-right:10px; width: 200px; height: 200px" :src="url" :fit="cover">
								</el-image>
								<el-popconfirm title="你确定删除改图片吗" @confirm="Remove(url)">
									<el-button slot="reference">删除</el-button>
								</el-popconfirm>
							</el-popover>
						</div>
					</div>
					<el-upload accept=".jpg, .jepg, .png" :file-list="postForm.himg" :action="$axios.defaults.baseURL + 'upload'"
					 list-type="picture-card" :on-success="afterUpload" :on-remove="handleRemove" :limit="4" v-show="postForm.himg.length<4">
						<i class="el-icon-plus"></i>
						<div class="el-upload__tip" slot="tip" style="font-weight: bold">
							建议大小不超过2M,图片不超过4张
						</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="postForm.himg" alt="">
					</el-dialog>

				</el-form-item>
				<p v-show="postForm.hchange==1||postForm.hchange==2" class="watchout" style="text-align: center;">修改原因:
					{{postForm.hdialogue}}</p>
				<p v-show="postForm.hchange==1&&postForm.hcheck==1" class="watchout1" style="text-align: center;">申请修改中，请耐心等待</p>
				<p v-show="postForm.hcheck==2" class="watchout" style="text-align: center;">审核不通过原因: {{postForm.hdialogue}}</p>
				<p class="watchout" v-show="this.bool==false">*需要按照表单提示填写表单，提示信息前带有*是必填项;您点击确认发布后，还必须经过网站管理员审核，通过审核后方可正式发布。</p>
				<el-form-item v-show="this.bool==false">
					<el-button class="button" type="primary" @click="submitForm('postForm')">确认发布</el-button>
					<el-button class="button" @click="resetForm('postForm')">重置</el-button>
				</el-form-item>
			</el-form>


			<el-button type="warning" @click="shenqing" v-if="postForm.hcheck==1&&postForm.hchange==0" style="margin: 300px 0px 20px 500px;">申请修改</el-button>
			<!-- <el-button type="primary" @click="topay" v-if="postForm.hcheck==1&&postForm.hpay==0" style="margin-top: 200px;">支付</el-button> -->
			<div v-show="xiugai==1" >
				<el-input v-model="postForm.hdialogue" placeholder="请填写申请修改的原因" style="margin-left: 500px;width: 500px;margin-bottom: 500px;">
					<el-button slot="append" @click="changeInfo">确认</el-button>
				</el-input>
			</div>
		</div>
		<div v-show="ifshow==2">
			<div class="latest">
				<div class="polaroid" v-for="value in latest.himg">
					<img :src="value" alt="">
				</div>
				<div class="latest-details">
					<li class="first"><i>名称:</i>{{latest.hname}}</li>
					<li class="second"><i>地址:</i>{{latest.haddress}}</li>
					<li><i>类型:</i>{{latest.htype}}</li>
					<div v-if="latest.htype == '出租'">
						<li><i>方式:</i>{{latest.hway}}</li>
						<li><i>租期:</i>{{latest.htime}}</li>
					</div>
					<div v-else-if="latest.htype == '新房'">
						<li><i>开盘:</i>{{latest.hopen}}</li>
						<li><i>物业:</i>{{latest.hproperty}}</li>
						<li><i>状态:</i>{{latest.hstatus}}</li>
					</div>
					<div v-else>
						<li><i>楼龄:</i>{{latest.hage}}</li>
					</div>
					<li><i>装修:</i>{{latest.hfitup}}</li>
					<li v-if="latest.htype == '出租'"><i>租金:</i>{{latest.hprice}}元</li>
					<li v-else><i>期望售价:</i>{{latest.hprice}}元/平方米</li>
					<li><i>面积:</i>{{latest.harea}}</li>
					<li><i>户型:</i>{{latest.hlayout}}</li>
					<li><i>朝向:</i>{{latest.htoward}}</li>
					<li><i>楼层:</i>{{latest.hfloor}}</li>
					<li class="last"><i>特色:</i>{{latest.hfeature}}</li>
				</div>
			</div>
		</div>
		<!-- <div class="data">发布房源信息:{{data}}---{{this.$route.params.hid}}</div> -->
	</div>
</template>

<script>
	export default {
		data() {
			var validateNumber = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入您的联系方式'));
				} else {
					if (!/^1[3|5|7|8|9]\d{9}$/.test(this.postForm.unumber)) {
						callback(new Error('手机号码格式错误，请重新输入'))
					}
					callback();
				}
			};
			var validateFirsthand = (rule, value, callback) => {
				if (this.postForm.htype == '新房' && value === '') {
					callback(new Error('选择不能为空，请选择'));
				}
				callback();
			};
			var validateSecondhand = (rule, value, callback) => {
				if (this.postForm.htype == '二手房' && value === '') {
					callback(new Error('选择不能为空，请选择'));
				}
				callback();
			};
			var validateRenthouse = (rule, value, callback) => {
				if (this.postForm.htype == '出租' && value === '') {
					callback(new Error('选择不能为空，请选择'));
				}
				callback();
			};
			return {
				data: {},
				addresses: [],
				tabs: ['我要租售', '最新发布'],
				ifshow: 1,
				postForm: { //卖房
					haddress: {
						pname: '',
						cname: '',
						aname: '',
						details: ''
					},
					h_uid: '',
					hid: '',
					hname: '',
					htype: '',
					hopen: '',
					hproperty: '',
					hstatus: '',
					hage: '',
					hway: '',
					htime: '',
					hfitup: '',
					hprice: '',
					harea: '',
					hlayout: '',
					htoward: '',
					hfloor: '',
					hfeature: '',
					unumber: '',
					himg: [],
					hcheck: '',
					hchange: '',
					hpay: '',
					hdialogue: ''
				},
				dialogVisible: false,
				rules: {
					haddress: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}],
					hname: [{
						required: true,
						message: '请输入房屋名称',
						trigger: 'blur'
					}],
					htype: [{
						required: true,
						message: '请选择房屋类型',
						trigger: 'blur'
					}],
					hopen: [{
						validator: validateFirsthand,
						trigger: 'blur'
					}],
					hproperty: [{
						validator: validateFirsthand,
						trigger: 'blur'
					}],
					hstatus: [{
						validator: validateFirsthand,
						trigger: 'blur'
					}],
					hage: [{
						validator: validateSecondhand,
						trigger: 'blur'
					}],
					hway: [{
						validator: validateRenthouse,
						trigger: 'blur'
					}],
					htime: [{
						validator: validateRenthouse,
						trigger: 'blur'
					}],
					hfitup: [{
						required: true,
						message: '请选择装修状态',
						trigger: 'blur'
					}],
					hprice: [{
							required: true,
							message: '请输入期望售价',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '期望售价必须为数字值'
						}
					],
					harea: [{
							required: true,
							message: '请输入房屋面积',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '房屋面积必须为数字值'
						}
					],
					hlayout: [{
						required: true,
						message: '请输选择户型',
						trigger: 'blur'
					}],
					htoward: [{
						required: true,
						message: '请选择朝向',
						trigger: 'blur'
					}],
					hfloor: [{
						required: true,
						message: '请选择楼层',
						trigger: 'blur'
					}],
					hfeature: [{
						required: true,
						message: '请输入房屋特色',
						trigger: 'blur'
					}],
					unumber: [{
							required: true,
							message: '请输入您的联系方式',
							trigger: 'blur'
						},
						{
							validator: validateNumber,
							trigger: 'blur'
						}
					]
				},
				latest: '',
				bool: false, //是否禁止编辑
				num: 3,
				showUpload: false,
				xiugai: '0',

			};
		},
		created: async function() {
			//个人中心点击详情跳转路由传参
			if (this.$route.params.hid != undefined) {
				const {
					data: response
				} = await this.$axios.get('house/gethouse', {
					params: {
						'hid': [this.$route.params.hid]
					}
				});

				console.log('post.vue : ' + Object.keys(response.data[0]));
				var address = response.data[0].haddress
				var pname = address.split('省')[0] + '省';
				var cname = address.split('省')[1].split('市')[0] + '市';
				var aname = address.split('市')[1].split('区')[0] + '区';
				var details = address.split('区')[1];
				response.data[0].haddress = {
					'pname': pname,
					'cname': cname,
					'aname': aname,
					'details': details
				};
				console.log('地址：' + response.data[0].haddress.pname + response.data[0].haddress.cname + response.data[0].haddress.aname);
				this.postForm = response.data[0];
				// response.data[0].hprice = Number(response.data[0].hprice);
				this.postForm.hprice = Number(response.data[0].hprice);
				this.postForm.harea = Number(response.data[0].harea);
				this.postForm.hid = response.data[0].hid;
				if (this.postForm.hcheck == '1') this.bool = true;
			}

		},
		methods: {
			//点击选项卡
			tabClick: function(index) {
				this.ifshow = index;
				if (index == 2) this.getlatest();
				else return;
			},
			changeStyle: function(i) {
				return this.ifshow == i ? 'stylechange' : ''
			},
			//动态渲染城市下拉列表
			async getProvince() {
				const {
					data: res
				} = await this.$axios.get('register/province');
				if (res.code !== 200) {
					return this.$message.error('获取城市失败');
				}
				this.addresses = res.data;
			},
			async getCity() {
				const {
					data: res
				} = await this.$axios.get('register/city', {
					params: this.postForm.haddress
				});
				if (res.code !== 200) {
					return this.$message.error('获取城市失败');
				}
				this.addresses = res.data;
			},
			async getArea() {
				const {
					data: res
				} = await this.$axios.get('register/area', {
					params: this.postForm.haddress
				});
				if (res.code !== 200) {
					return this.$message.error('获取城市失败');
				}
				this.addresses = res.data;
			},
			Remove: function(url) {
				console.log(url);
				var himgs = this.postForm.himg;
				for (var i = 0; i < himgs.length; i++) {
					if (url == himgs[i]) {
						himgs.splice(i, 1);
					}
					continue;
				}
				this.postForm.himg = himgs;
			},
			//图片上传
			handleRemove: function(file) {
				console.log(this.postForm.himg);
				var himgs = this.postForm.himg;
				for (var i = 0; i < himgs.length; i++) {
					if (file.response.url == himgs[i]) {
						himgs.splice(i, 1);
					}
					continue;
				}
				this.postForm.himg = himgs;
			},
			afterUpload: function(res) {
				// this.postForm.dialogImageUrl = file.url;
				// this.dialogVisible = true;
				// console.log(res);
				this.postForm.himg.push(res.url);
				console.log(this.postForm.himg);
			},
			//提交
			submitForm: function(formName) {
				var flag = true;
				console.log(this.postForm.hcheck);
				if (this.postForm.hcheck == '') {
					flag = false;
				}
				this.postForm.hchange = 0;
				this.postForm.hcheck = 0;
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						this.$message.error('提交失败');
						return false;
					}
					this.data = this.postForm;
					const {
						data: res
					} = await this.$axios.get('house/insertInfo', {
						params: this.postForm
					});
					if (res.code !== 200) {
						this.$message.error('提交失败');
					}
					this.$refs[formName].resetFields();
					this.postForm.haddress.pname = "";
					this.postForm.haddress.cname = "";
					this.postForm.haddress.aname = "";
					this.postForm.haddress.details = "";
					// this.dialogVisible = false;
					this.$message.success('提交成功');
					if(flag==false){
						this.tabClick(2);
						this.changeStyle(2);
					}

				})
				
			},
			//重置
			resetForm: function(formName) {
				this.$refs[formName].resetFields();
			},
			async getlatest() {
				const {
					data: res
				} = await this.$axios.get('post/latest');
				if (res.code !== 200) this.$message.error('获取信息失败');
				else {
					this.latest = res.data;
				}
			},
			shenqing() { //申请修改的原因框显示
				if (this.xiugai == 1) this.xiugai = 0;
				else this.xiugai = 1;
			},
			async changeInfo() { //用户申请修改
				this.postForm.hchange = 1;
				const {
					data: res
				} = await this.$axios.get('house/updateOneInfo', {
					params: {
						'hid': this.postForm.hid,
						'hchange': '1',
						'hdialogue': this.postForm.hdialogue
					}
				})
				alert('已提交修改申请');
			},
			async topay() { //房主缴费操作
				const {
					data: res
				} = await this.$axios.get('house/updateOneInfo', {
					params: {
						'hid': this.postForm.hid,
						'hpay': '1'
					}
				})
				alert('已提交修改申请');
			},
		}
	}
</script>

<style>
	.hide .el-upload--picture-card {
		display: none;
	}

	li {
		list-style: none;
	}

	i {
		font-style: normal;
	}

	.tab {
		cursor: pointer;
	}

	.post a {
		display: inline-block;
		font-size: 20px;
		font-weight: 700;
		color: black;
		text-decoration: none;
		margin: 10px 30px;
		padding-bottom: 10px;
	}

	.post {
		margin: 20px 0 0 20px;
	}

	.nav {
		text-align: left;
	}

	.stylechange {
		color: dodgerblue;
		border-bottom: 4px solid dodgerblue;
	}

	.sale h1 {
		font-size: 45px;
		margin-bottom: 60px;
	}

	.el-form {
		width: 1000px;
		height: 1200px;
		font-size: 18px;
		margin: 0 auto;
		text-align: left;
	}

	.el-form-item {
		padding: 10px;
		padding-left: 0;
	}

	.el-form-item:last-child {
		margin-left: 0;
	}

	.el-form-item__label {
		font-size: 18px;
		font-weight: 700;
		color: #000;
		text-align: left;
	}

	.el-select {
		margin-bottom: 20px;
	}

	.el-input,
	.el-textarea {
		font-size: 18px;
		/* padding: 10px; */
	}

	.el-radio__label {
		font-size: 18px;
	}

	.el-input-group__append {
		font-weight: 700;
		color: #666;
		background-color: #fff;
	}

	.firsthand .el-form-item,
	.secondhand .el-form-item,
	.renthouse .el-form-item {
		margin-left: 10px;
	}

	.el-upload--picture-card {
		line-height: 153px;
	}

	.watchout {
		color: dodgerblue;
	}

	.watchout1 {
		color: red;
	}

	.button {
		font-size: 18px;
		padding: 15px;
	}

	.button:first-child {
		margin: 40px 0 20px 100px;
	}

	.button:last-child {
		margin: 40px 0 20px 60px;
	}

	.latest {
		position: relative;
		width: 1250px;
		height: 360px;
		margin: 50px 100px;
		margin-left: 200px;
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
		bottom: -200px;
		left: 40px;
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

	.data {
		position: absolute;
		top: 100px;
		right: 0;
		width: 200px;
		line-height: 25px;
		border: 1px solid #666;
	}
</style>
