<template>
  <div>
    <div class="head">
      <div class="city">
        <el-select v-model="value" @change="sel">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="query">
        <el-input v-model="input1" placeholder="请输入内容" @blur='change'></el-input>
      </div>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="querys">
      <el-row
        ><label>区域</label>
        <el-radio-group v-model="radio1" @change="rad">
          <el-radio-button
            v-for="item in roptions"
            :key="item"
            :label="item"
          ></el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row
        ><label>装修</label>
        <el-radio-group v-model="radio2" @change="rad">
          <el-radio-button label="精装"></el-radio-button>
          <el-radio-button label="毛坯"></el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row><label>单价</label>
        <el-radio-group v-model="radio3" @change="rad">
          <el-radio-button label="0">10000/㎡以下</el-radio-button>
          <el-radio-button label="1">10000/㎡-20000/㎡</el-radio-button>
          <el-radio-button label="2">20000/㎡-40000/㎡</el-radio-button>
          <el-radio-button label="3">40000/㎡-60000/㎡</el-radio-button>
          <el-radio-button label="4">60000/㎡-80000/㎡</el-radio-button>
          <el-radio-button label="5">80000/㎡以上</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row><label>面积</label>
        <el-radio-group v-model="radio4" @change="rad">
          <el-radio-button label="0">50㎡以下</el-radio-button>
          <el-radio-button label="1">50㎡-100㎡</el-radio-button>
          <el-radio-button label="2">100㎡-200㎡</el-radio-button>
          <el-radio-button label="3">200㎡以上</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row><label>房型</label>
        <el-radio-group v-model="radio5" @change="rad">
          <el-radio-button label="1居"></el-radio-button>
          <el-radio-button label="2居"></el-radio-button>
          <el-radio-button label="3居"></el-radio-button>
          <el-radio-button label="4居"></el-radio-button>
          <el-radio-button label="4居+"></el-radio-button>
        </el-radio-group>
      </el-row>
    </div>
    <div>
      <div class="item" v-for="item in house" :key="item.hid" >
        <img
              :src=item.himg[0]
              alt=""
              class="left"
            />
				<div></div>
        <div class="right">
          <h1 @click="cl(item.hid)">{{item.hname}}</h1>
          <p>描述:{{item.hfeature}}</p>
          <div class="buttom">
            <p>装修类型:{{item.hfitup}}</p>
            <p>地址:{{item.haddress}}</p>
            <p>面积:{{item.harea}}㎡</p>
          </div>
          <el-button round class="but" @click="store(item.hid)">收藏</el-button>
          <div class="price">{{item.hprice}}/㎡</div>
        </div>
      </div>
    </div>
     <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total='totals'>
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      options: [],
      roptions: [],
      radio1: "",
      input: "",
      input1:'',
      radio2: "",
      radio3: "",
      house:[],
      type:'新房',
      radio4:'',
      radio5:'',
      currentPage:1,
      totals:0,
      pagecount:10,
      area:[[0,50],[50,100],[100,200],[1,200]],
      price:[[0,10000],[10000,20000],[20000,40000],[40000,60000],[60000,80000],[1,80000]]
    };
  },
  created: async function () {
    var { data: res } = await this.$axios.get("address/city");
    this.options = res.data;
    var { data: res } = await this.$axios.get("login/user");
    var user;
   user = res.data;
	console.log('user : '+Object.keys(user));
   this.value=user.cname
    var { data: res } = await this.$axios.get("address/area", {
      params: { cityname: this.value },
    });
    this.roptions = res.data;
    var cityhouse={htype:this.type,haddress:this.value}
    var { data: res } = await this.$axios.get("house/findcount", {
      params: {'query':cityhouse},
    });
    var to=res.data;
    this.totals=parseInt(to);
    console.log(this.totals)
    var { data: res } = await this.$axios.get("house/findhouse", {
      params: {'query':cityhouse,'page':0,'pagecount':10},
    });
    this.house=res.data;
  },
  methods: {
    sel: async function () {
      console.log(this.value);
      var { data: res } = await this.$axios.get("address/area", {
        params: { cityname: this.value },
      });
      this.roptions = res.data;
      this.input='';
      this.radio1='';
      this.rad();
    },
    rad:async function () {
      var cityhouse={htype:this.type,haddress:this.value+this.radio1}
      if(this.input!=''){
        cityhouse.hname=this.input
      }
      if(this.radio2!=''){
         cityhouse.hfitup=this.radio2
      }
      if(this.radio5!=''){
        cityhouse.hlayout=this.radio5
      }
      if(this.radio4!=''){
         var i=parseInt(this.radio4)
         console.log(this.area[i])
         cityhouse.harea=this.area[i]
      }
      if(this.radio3!=''){
         var i=parseInt(this.radio3)
         console.log(this.price[i])
         cityhouse.hprice=this.price[i]
      }
      var { data: res } = await this.$axios.get("house/findcount", {
      params: {'query':cityhouse},
    });
    var to=res.data;
    this.totals=parseInt(to);
    console.log(this.totals)
    var { data: res } = await this.$axios.get("house/findhouse", {
      params: {'query':cityhouse,'page':0,'pagecount':this.pagecount},
    });
    this.house=res.data;
    },
    cl:async function(index){
      console.log(index)
     var { data: res } = await this.$axios.get("house/sethid", {
      params: {'hid':index},
    });
    console.log(res.data);
    this.$router.push('/House')
    },
    async store(index){
      console.log(index)
       var { data: res } = await this.$axios.get("login/setstore", {
      params: {'store':index}
       });
       var data=res.data;
       if(data!=false){
         this.$alert('收藏成功', '收藏提示', {
          confirmButtonText: '确定'
        });
       }
    },
    search:async function(){
      if(this.input1!=''){
        this.input=this.input1;
        this.rad();
      }
    },
    change:function(){
      if(this.input!=this.input1&&this.input!=''){
          this.input='';
          this.rad();
      }
    },
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagecount=val;
        this.currentPage=1;
        var pag=0;
        this.housedata(pag);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        var pag=val-1;
        this.housedata(pag);
      },
     async housedata(pa){
        var cityhouse={htype:this.type,haddress:this.value+this.radio1}
      if(this.input!=''){
        cityhouse.hname=this.input
      }
      if(this.radio2!=''){
         cityhouse.hfitup=this.radio2
      }
      if(this.radio5!=''){
        cityhouse.hlayout=this.radio5
      }
      if(this.radio4!=''){
         var i=parseInt(this.radio4)
         console.log(this.area[i])
         cityhouse.harea=this.area[i]
      }
      if(this.radio3!=''){
         var i=parseInt(this.radio3)
         console.log(this.price[i])
         cityhouse.hprice=this.price[i]
      }
    var { data: res } = await this.$axios.get("house/findhouse", {
      params: {'query':cityhouse,'page':pa,'pagecount':this.pagecount},
    });
    this.house=res.data;
      }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.head {
  overflow: hidden;
  margin-top: 5px;
  margin-left: 300px;
}
.city {
  width: 195px;
  float: left;
  padding-left: 5px;
}
.query,
.el-button {
  float: left;
}
.querys {
  background-color: #fbfbfb;
  padding-left: 5px;
  margin-top: 10px;
}
.el-row {
  margin-bottom: 20px;
  padding: 5px;
}
.item {
  border-top: 2px solid #f1f1f1;
  margin-top: 10px;
  overflow: hidden;
  height: 250px;
  padding-top: 10px;
}
.left,
.right {
  float: left;
}
.left {
  width: 236px;
  height: 178px;
  border: 1px black solid;
  margin-left: 10px;
}
.right {
  position: relative;
  height: 190px;
  margin-left: 10px;
  /* border:1px black solid; */
  width: 937px;
}
.buttom {
  position: absolute;
  bottom: 5px;
  height: 50px;
}
.price {
  position: absolute;
  right: 33px;
  top: 48px;
  font-weight: 400;
  font-size: 40px;
  color: red;
}
.but {
  position: absolute;
  right: 10px;
  top: 5px;
}
label {
  margin-right: 10px;
}
h1{
  cursor: pointer;
}
h1:hover{
  color: red;
}
</style>