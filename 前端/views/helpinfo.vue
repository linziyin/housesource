<template>
	<div class="helpinfo">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/personal' }">个人中心</el-breadcrumb-item>
		  <el-breadcrumb-item>帮助与投诉</a></el-breadcrumb-item>
		</el-breadcrumb>
		<div class="helploop">
      <el-carousel height="250px" :interval="2500">
        <el-carousel-item>
          <img src="../assets/card1.png" alt="">
				</el-carousel-item>
				<el-carousel-item>
				  <img src="../assets/card2.png" alt="">
				</el-carousel-item>
				<el-carousel-item>
				  <img src="../assets/card3.png" alt="">
				</el-carousel-item>
				<el-carousel-item>
				  <img src="../assets/card4.png" alt="">
				</el-carousel-item>
      </el-carousel>
    </div>
		<div class="project">
			<h3>小组成员</h3>
			李晓晴 黎凯莹 林子茵 彭小春 杨坤鑫
			<h3>项目名称</h3>
			房源信息管理系统
			<h3>其他</h3>
			以贝壳网为原型开发的房源信息管理系统
		</div>
	</div>
</template>

<script>
</script>

<style>
	.helploop{
		text-align: center;
		margin: 20px 30px;
	}
	.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 250px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
	
	.helpinfo{
		text-align: left;
	}
	.project{
		width: 500px;
		margin-left: 30px;
	}
</style>
