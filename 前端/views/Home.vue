<template>
  <div class="home">
    <div class="nav">
     <div class="select" @mouseover="activeindex=0" 
     @mouseout="activeindex=-1" @click="topath(0)"
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
     <div class="name">用户，您好！ <el-button type="info" @click="topath(5)">退出</el-button></div>
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
      path:['home','oldhouse','rent','post','personal','login']
    }
  },
  methods:{
    topath:function(i){
        this.index=i;
        this.$router.push(this.path[i])
    }
  }
}
</script>

<style scoped>
.home{
  /* margin: 0 auto;
  width: 1200px; */
}
.nav{
    height: 50px;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    background-color:#303035;
}
.name{
  float: right;
  color: #9399A5;
  line-height: 50px;
  margin-right: 9px;
}
.select{
  color: #9399A5;
  line-height: 50px;
  float: left;
  padding:0 60px;
  cursor: pointer;
}
.active{
  color: #fff;
}
</style>
