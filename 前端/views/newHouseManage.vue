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
			<el-row :gutter="20">
				<!-- <el-checkbox-group v-model="queryInfo.querytype"> -->
				<el-col :span="7">
					<el-input placeholder="请输入内容" v-model="queryInfo.query.h_uid[0]" clearable @clear="getNewhouseList">
						<!-- <el-checkbox slot="prepend" label="h_uid">按发布者编号查询</el-checkbox> -->
						<template slot="prepend">按用户编号查询</template>
					</el-input>
				</el-col>
				<el-col :span="7">
					<!-- <div style="margin: 15px 0;"></div> -->
					<el-input placeholder="请输入内容" v-model="queryInfo.query.hid[0]" clearable @clear="getNewhouseList">
						<template slot="prepend">按房源编号查询</template>
						<!-- <el-button slot="append" icon="el-icon-search" @click="getNewhouseList"></el-button> -->
					</el-input>
				</el-col>
				<el-col :span="2">
					<!-- <el-link icon="el-icon-edit" @click="deleteMany">编辑</el-link> -->
					<el-button type="primary" @click="getNewhouseList" icon="el-icon-search">查询</el-button>
				</el-col>
				<el-col :span="4">
					<!-- <el-link icon="el-icon-edit" @click="deleteMany">编辑</el-link> -->
					<el-button type="primary" @click="deleteMany" icon="el-icon-edit">{{mess}}</el-button>
				</el-col>
			</el-row>
			<!-- 表格数据 -->

			<el-table :data="newhouseList" border stripe ref="multipleTable" @selection-change="handleSelectionChange" height="480">
				<el-table-column type="selection" width="55" v-if="show" :indeterminate="isIndeterminate"></el-table-column>

				<el-table-column type="index"></el-table-column>
				<!-- 发布者信息 -->
				<el-table-column sortable label="房源编号" prop="hid" width="120px"></el-table-column>
				<el-table-column label="房源名称" prop="hname"></el-table-column>
				<el-table-column label="房源单价(元/平)" prop="hprice" width="100px"></el-table-column>
				<el-table-column label="房源面积(平)" prop="harea" width="70px"></el-table-column>
				<el-table-column label="房源地址" prop="haddress" width="250px"></el-table-column>

				<el-table-column label="审核状态" prop="hcheck" width="100px" :filters="[{ text: '未审核', value: '未审核' }, { text: '审核通过', value: '审核通过' },{ text: '审核不通过', value: '审核不通过' }]"
				 :filter-method="filterCheck" filter-placement="bottom-end">
					<template slot-scope="scope">
						{{checkstatus[scope.row.hcheck]}}
					</template>
					<!-- <template slot-scope="scope">{{checkstatus[scope.row.hcheck]}}</template> -->
					<!-- <template slot-scope="scope" >1{{checkstatus[0]}}</template> -->
				</el-table-column>
				<el-table-column label="支付状态" prop="hpay" width="100px" :filters="[{ text: '未支付', value: '未支付' }, { text: '已支付', value: '已支付' }]"
				 :filter-method="filterPay" filter-placement="bottom-end">
					<template slot-scope="scope">{{paystatus[scope.row.hpay]}}</template>
				</el-table-column>
				<el-table-column label="修改状态" prop="hchange" width="100px" :filters="[{ text: '不修改', value: '不修改' }, { text: '申请修改', value: '申请修改' }, { text: '未修改', value: '未修改' }]"
				 :filter-method="filterChange" filter-placement="bottom-end">
					<template slot-scope="scope">{{changestatus[scope.row.hchange]}}</template>
				</el-table-column>
				<el-table-column label="操作" width="180px">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" index="/housedetails" @click="topath('/housedetails',scope.row.hid)">详情</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.hid)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区域 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
			 :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"
			 background></el-pagination>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				uid: '0',
				show: false,
				mess: '编辑',
				isIndeterminate: true,
				queryInfo: {
					uid: '0', //此处的uid将从登录页面跳转过来，通过会话获取
					type: '新房',
					query: {
						h_uid: [],
						hid: []
					},
					querytype: ['h_uid', 'hid'],
					pagenum: 1,
					pagesize: 10
				},
				// 商品列表
				newhouseList: [],
				checkstatus: [
					'未审核',
					'审核通过',
					'审核不通过'
				],
				paystatus: [
					'未支付',
					'已支付'
				],
				changestatus: [
					'不修改',
					'申请修改',
					'未修改'
				],
				// 商品总数
				total: 0,
				select: '',
				multipleSelection: [],
				// activePath: ''
			}
		},
		created() {
			// this.getAllhouseList();
			this.getNewhouseList();
			// this.activePath = window.sessionStorage.getItem('activePath');
		},
		methods: {
			filterCheck(value, row, column) {
				const property = column['property'];
				console.log('value : ' + value + '----' + row[property]);
				return this.checkstatus[row[property]] === value;
			},
			filterPay(value, row, column) {
				const property = column['property'];
				console.log('value : ' + value + '----' + row[property]);
				return this.paystatus[row[property]] === value;
			},
			filterChange(value, row, column) {
				const property = column['property'];
				console.log('value : ' + value + '----' + row[property]);
				return this.changestatus[row[property]] === value;
			},
			// 根据分页获取对应的商品列表
			async getAllhouseList() {
				var quertInfo1 = this.queryInfo;
				// this.queryInfo.pagenum=1;
				const {
					data: res
				} = await this.$axios.get('house', {
					params: quertInfo1
				})
				console.log('res123 : ' + Object.keys(res.message[1]));
				this.total = res.data.length;
				// console.log('res123 : '+total);

			},
			async getNewhouseList() {
				this.getAllhouseList();
				// console.log('newhouse : ' + this.queryInfo.pagenum);
				const {
					data: res
				} = await this.$axios.get('house/gethouselist', {
					params: this.queryInfo
				})
				// console.log('res : ' + res.data[0].pagenum);
				// if (res.code.status !== 200) {}
				//   return this.$message.error('获取商品列表失败！')
				// }
				this.newhouseList = res.data
				//   console.log(this.goodsList)
				// this.total = res.data.total;
			},
			handleSizeChange(newSize) {
				this.queryInfo.pagesize = newSize
				this.getNewhouseList()
			},
			handleCurrentChange(newSize) {
				this.queryInfo.pagenum = newSize
				this.getNewhouseList()
			},
			// 通过Id删除商品
			async removeById(id) {
				const confirmResult = await this.$confirm(
					'此操作将永久删除该房源信息, 是否继续?',
					'提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}
				).catch(err => err)
				if (confirmResult !== 'confirm') {
					return this.$message.info('已取消删除！')
				}
				console.log('删除');

				const {
					data: res
				} = await this.$axios.get('house/delete', {
					params: {
						'hid': [id]
					}
				})
				// if (res.code.status !== 200) {
				//   return this.$message.error('删除商品失败！')
				// }
				this.$message.success('删除成功！')
				this.getNewhouseList()
			},
			async deleteMany() {
				// this.$router.push('/newhousemanage/add')
				if (this.show == false) {
					this.mess = '删除';
					this.show = true;
				} else if (this.multipleSelection != '') {
					const confirmResult = await this.$confirm(
						'此操作将永久删除所选房源信息, 是否继续?',
						'提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}
					).catch(err => err)
					if (confirmResult !== 'confirm') {
						return this.$message.info('已取消删除！')
					}
					console.log('删除多条 : ' + this.multipleSelection[0].hid);
					var multiple = [];
					for (var i = 0; i < this.multipleSelection.length; i++) {
						multiple[i] = this.multipleSelection[i].hid
					}


					const {
						data: res
					} = await this.$axios.get('house/delete', {
						params: {
							'hid': multiple
						}
					})
					// if (res.code.status !== 200) {
					//   return this.$message.error('删除商品失败！')
					// }
					this.$message.success('删除成功！');
					this.getNewhouseList();
					this.mess = '编辑';
					this.show = false;
				} else {
					this.mess = '编辑';
					this.show = false;
				}
				this.multipleSelection = []
			},
			// check(gid) {
			// 	const {
			// 		data: res
			// 	} = this.$axios.get('newhousemanage/checkhouse', {
			// 		params: {
			// 			'hid': hid
			// 		}
			// 	});
			// 	this.$message.success('审核通过！')
			// },
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			topath: function(path, hid) {
				console.log('进来了吗' + this.queryInfo.uid);
				const {
					data: res
				} = this.$axios.get('login/menu', {
					params: {
						'uid': this.queryInfo.uid
					}
				});
				const {
					data: response
				} = this.$axios.get('house/gethouse', {
					params: {
						'hid': hid
					}
				});
				console.log('后端效应的数据：' + res);
				console.log('后端效应的数据：' + response);

				//路由到主页
				// window.sessionStorage.setItem('activePath', path);
				this.$router.push(path);

			}
		}
	}
</script>

<style scoped>

</style>
