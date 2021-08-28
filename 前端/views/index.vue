<template>
  <div class="home">
    <div class="nav">
     <div class="select" @mouseover="activeindex=0" 
     @mouseout="activeindex=-1" @click="index=0"
     :class="{active:activeindex==0||index==0}">新房</div>
     <div class="select" 
     @mouseover="activeindex=1" @mouseout="activeindex=-1" @click="topath(1)"
     :class="{active:activeindex==1||index==1}">二手房</div>
     <div class="select" 
     @mouseover="activeindex=2" @mouseout="activeindex=-1" @click="topath(2)"
     :class="{active:activeindex==2||index==2}">租房</div>
     <div class="select" 
     @mouseover="activeindex=3" @mouseout="activeindex=-1" @click="topath(3)"
     :class="{active:activeindex==3||index==3}">发布房源</div>
     <div class="select" @mouseover="activeindex=4" @click="topath(4)"
     @mouseout="activeindex=-1" 
     :class="{active:activeindex==4||index==4}">个人中心</div>
     <div class="name">用户，您好！欢迎</div>
    </div>
		<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      activeindex:-1,
      index:0,
			path: ['','','','post','personal']
    }
  },
  methods:{
    ins:function(e){
        var el=e.target;
        el.css("color","#fff");
    },
    outs:function(){

    },
		topath: function(i){
			this.index = i;
			this.$router.push(this.path[i]);
		}
  }
}
</script>

<style scoped>
.home{
  /* margin: 0 auto; */
  /* width: 1400px; */
}
.nav{
	position: relative;
  height: 40px;
	font-size: 18px;
	font-weight: 700;
  background-color: #303035;
}
.nav::before,
.nav::after{
	position: absolute;
	display: block;
	content: '';
	width: 10px;
	height: 40px;
	background-color: #303035;
}
.nav::before{
	top: 0;
	left: -10px;
}
.nav::after{
	top: 0;
	right:-10px;
}
.name{
  float: right;
  color: #9399A5;
  line-height: 40px;
	margin-right: 50px;
}
.select{
  color: #9399A5;
  line-height: 40px;
  float: left;
  padding:0 60px;
  cursor: pointer;
}
.active{
  color: #fff;
}
</style>
