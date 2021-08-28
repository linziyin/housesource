<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/managehome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<el-card>
			<el-row :gutter="20">
				<!-- <el-checkbox-group v-model="queryInfo.querytype"> -->
				<el-col :span="7">
					<el-input placeholder="请输入内容" v-model="queryInfo.query.uid[0]" clearable @clear="getUserList">
						<!-- <el-checkbox slot="prepend" label="h_uid">按发布者编号查询</el-checkbox> -->
						<template slot="prepend">按用户编号查询</template>
					</el-input>
				</el-col>
				<el-col :span="7">
					<!-- <div style="margin: 15px 0;"></div> -->
					<el-input placeholder="请输入内容" v-model="queryInfo.query.username[0]" clearable @clear="getUserList">
						<template slot="prepend">按用户名称查询</template>
					</el-input>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="getUserList" icon="el-icon-search">查询</el-button>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="deleteMany" icon="el-icon-edit">{{mess}}</el-button>
				</el-col>
			</el-row>
			<!-- 表格数据 -->

			<el-table :data="userList" border stripe ref="multipleTable" @selection-change="handleSelectionChange" height="480">
				<el-table-column type="selection" width="55" v-if="show" :indeterminate="isIndeterminate"></el-table-column>

				<el-table-column type="index"></el-table-column>
				<!-- 发布者信息 -->
				<el-table-column sortable label="用户编号" prop="uid" width="120px"></el-table-column>
				<el-table-column label="用户名称" prop="username"></el-table-column>
				<el-table-column label="用户密码" prop="password" width="100px"></el-table-column>
				<el-table-column label="性别" prop="gender" width="70px"></el-table-column>
				<el-table-column label="联系方式" prop="unumber" width="180px"></el-table-column>
				<el-table-column label="用户地址" prop="uaddress" width="250px"></el-table-column>

				<el-table-column label="用户角色" prop="role" width="100px" :filters="[{ text: '管理员', value: '管理员' }, { text: '用户', value: '用户' }]"
				 :filter-method="filterRole" filter-placement="bottom-end">
					<template slot-scope="scope">{{rolestatus[scope.row.role]}}</template>
				</el-table-column>
				<el-table-column label="操作" width="100px">
					<template slot-scope="scope">
						<!-- <el-button type="primary" icon="el-icon-edit" size="mini" index="/post" @click="topath('/post',scope.row.hid)">详情</el-button> -->
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.uid)">删除</el-button>
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
				show: false,
				mess: '编辑',
				isIndeterminate: true,
				queryInfo: {
					query: {
						uid: [],
						username: []
					},
					querytype: ['uid', 'username'],
					pagenum: 1,
					pagesize: 10
				},
				// 用户列表
				userList: [],
				rolestatus: [
					'管理员',
					'用户'
				],
				// 用户总数
				total: 0,
				select: '',
				multipleSelection: [],
				// activePath: ''
			}
		},
		created() {
			// this.getAllhouseList();
			this.getUserList();
			// this.activePath = window.sessionStorage.getItem('activePath');
		},
		methods: {
			filterRole(value, row, column) {
				const property = column['property'];
				console.log('value : ' + value + '----' + row[property]);
				return this.rolestatus[row[property]] === value;
			},
			// 根据分页获取对应的商品列表
			async getAlluserList() {
				var quertInfo1 = this.queryInfo;
				// this.queryInfo.pagenum=1;
				const {
					data: res
				} = await this.$axios.get('login/getalluser', {
					params: quertInfo1
				})
				console.log('res123 : ' + Object.keys(res.message[1]));
				this.total = res.data.length;
				// console.log('res123 : '+total);

			},
			async getUserList() {
				this.getAlluserList();
				// console.log('newhouse : ' + this.queryInfo.pagenum);
				const {
					data: res
				} = await this.$axios.get('login/getuserlist', {
					params: this.queryInfo
				})
				
				this.userList = res.data
			},
			handleSizeChange(newSize) {
				this.queryInfo.pagesize = newSize
				this.getUserList()
			},
			handleCurrentChange(newSize) {
				this.queryInfo.pagenum = newSize
				this.getUserList()
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
				} = await this.$axios.get('login/delete', {
					params: {
						'uid': [id]
					}
				})
				this.$message.success('删除成功！')
				this.getUserList()
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
					console.log('删除多条 : ' + this.multipleSelection[0].uid);
					var multiple = [];
					for (var i = 0; i < this.multipleSelection.length; i++) {
						multiple[i] = this.multipleSelection[i].uid
					}
					const {
						data: res
					} = await this.$axios.get('login/delete', {
						params: {
							'uid': multiple
						}
					})
					// if (res.code.status !== 200) {
					//   return this.$message.error('删除商品失败！')
					// }
					this.$message.success('删除成功！');
					this.getUserList();
					this.mess = '编辑';
					this.show = false;
				} else {
					this.mess = '编辑';
					this.show = false;
				}
				this.multipleSelection = []
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
// 			topath: function(path, hid) {
// 				console.log('进来了吗' + this.queryInfo.uid);
// 				const {
// 					data: res
// 				} = this.$axios.get('login/menu', {
// 					params: {
// 						'uid': this.queryInfo.uid
// 					}
// 				});
// 				const {
// 					data: response
// 				} = this.$axios.get('house/gethouse', {
// 					params: {
// 						'hid': hid
// 					}
// 				});
// 				console.log('后端效应的数据：' + res);
// 				console.log('后端效应的数据：' + response);
// 
// 				//路由到主页
// 				// window.sessionStorage.setItem('activePath', path);
// 				this.$router.push(path);
// 
// 			}
		}
	}
</script>

<style scoped>

</style>
