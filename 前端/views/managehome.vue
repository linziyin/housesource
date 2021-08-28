<template>
	<el-container>
		<!-- 头部 -->
		<el-header>
			<div>
				<!-- <img src="../assets/img/1-2.jpg" alt /> -->
				<span>房源信息后台管理系统</span>
			</div>
			<el-button type="info" @click='logout'>退出</el-button>
		</el-header>
		<!-- 主体 -->
		<el-container>

			<!-- 侧边栏 -->
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<div class="toggle-button" @click="togleCollapse">|||</div>
				<el-menu :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath"
				 background-color="#333744" text-color="#fff" active-text-color="#409FFF" >
					<el-submenu index="/userManage"  @click="topath('/userManage')">
						<!-- 一级菜单 -->
						<template slot="title" >
							<i class="iconObj[1]"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item index="/userManage"  @click="topath('/userManage')">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>用户列表</span>
							</template>
						</el-menu-item>
					
					</el-submenu>
					<el-submenu index="/houseManage">
						<!-- 一级菜单 -->
						<template slot="title">
							<i class="iconObj[0]"></i>
							<span>房源管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/newHouseManage"  @click="topath('/newHouseManage')">
								<template slot="title">
									<i class="el-icon-menu"></i>
									<span>新房管理</span>
								</template>
							</el-menu-item>
							<el-menu-item index="/oldHouseManage"  @click="topath('/oldHouseManage')">
								<template slot="title">
									<i class="el-icon-menu"></i>
									<span>二手房管理</span>
								</template>
							</el-menu-item>
							<el-menu-item index="/rentManage"  @click="topath('/rentManage')">
								<template slot="title">
									<i class="el-icon-menu"></i>
									<span>租房管理</span>
								</template>
							</el-menu-item>
						</el-menu-item-group>
					
					</el-submenu>
				</el-menu>
			</el-aside>
			<!-- 主体内容 -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>

	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				iconObj: {
					'125': 'iconfont icon-user',
					'103': 'iconfont icon-tijikongjian',
					'101': 'iconfont icon-shangpin',
					'102': 'iconfont icon-danju',
					'145': 'iconfont icon-baobiao'
				},
				// 默认不折叠
				isCollapse: false,
				// 被激活导航地址
				activePath: ''
			}
		},
		created: async function() {
			this.activePath = window.sessionStorage.getItem('activePath');
		},
		methods: {
			logout: function() {
				//清空token
				// window.sessionStorage.clear();
				// this.$router.push('/login')

			},
			topath: function(path) {
				console.log('path : ' + path);
				window.sessionStorage.setItem('activePath', path);
				// this.$router.push( path);
			},
			// 菜单的折叠与展开
			togleCollapse() {
				this.isCollapse = !this.isCollapse
			},
		}
	}
</script>

<style scoped>
	.el-container {
		height: 100%;
	}

	.el-header {
		background-color: #373f41;
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		color: #fff;
		font-size: 20px;

		>div {
			display: flex;
			align-items: center;

			img {
				height: 40px;
			}

			span {
				margin-left: 15px;
			}
		}
	}

	.el-aside {
		background-color: #333744;

		.el-menu {
			border: none;
		}
	}

	.el-main {
		background-color: #eaedf1;
	}

	.iconfont {
		margin-right: 10px;
	}

	.toggle-button {
		background-color: #4A5064;
		font-size: 10px;
		line-height: 24px;
		color: #fff;
		text-align: center;
		letter-spacing: 0.2em;
		/* // 鼠标放上去变成小手 */
		cursor: pointer;
	}
</style>
