const express=require('express')
const router=express.Router()

const houseservice=require('../services/houseService')

router.get('/allhouse',function(req,res){
	    var city=req.query.cityname
					var types=req.query.types
    houseservice.getallHouseInfo(city,types,function(err,result){
        if(err) {
            console.log(err);
            res.sendResult(false,500,err)
        }
        else{
									   res.sendResult(result,200,'ok')
        }
    })
})

router.get('/findhouse',function(req,res){
	    var query=JSON.parse(req.query.query)
					var page=parseInt(req.query.page);
					var pagecount=parseInt(req.query.pagecount)
					query.hpay='1';
					query.hcheck='1';
					console.log(page+'---------'+pagecount)
				console.log(query)
		var cityarea=new RegExp(query.haddress)
			query.haddress=cityarea
			if(query.hname){
				var n=new RegExp(query.hname)
					query.hname=n
			}
			if(query.harea){
				var area=query.harea;
				var low=parseInt(area[0]);
				var high=parseInt(area[1]);
				if(low==0){
					query.harea={$lte:high}
				}else if(low==1){
					console.log(high)
					query.harea={$gte:high}
				}else{
					query.harea={$gte:low,$lte:high}
				}
			}
			if(query.hprice){
				var price=query.hprice;
				var low=parseInt(price[0]);
				var high=parseInt(price[1]);
				if(low==0){
					query.hprice={$lte:high}
				}else if(low==1){
					console.log(high)
					query.hprice={$gte:high}
				}else{
					query.hprice={$gte:low,$lte:high}
				}
			}
    houseservice.findHouseInfo(query,page,pagecount,function(err,result){
        if(err) {
            console.log(err);
            res.sendResult(false,500,err)
        }
        else{
				res.sendResult(result,200,'ok')
        }
    })
})

router.get('/findcount',function(req,res){
	    var query=JSON.parse(req.query.query)
					query.hpay='1';
					query.hcheck='1';
				console.log(query)
		var cityarea=new RegExp(query.haddress)
			query.haddress=cityarea
			if(query.hname){
				var n=new RegExp(query.hname)
					query.hname=n
			}
			if(query.harea){
				var area=query.harea;
				var low=parseInt(area[0]);
				var high=parseInt(area[1]);
				if(low==0){
					query.harea={$lte:high}
				}else if(low==1){
					console.log(high)
					query.harea={$gte:high}
				}else{
					query.harea={$gte:low,$lte:high}
				}
			}
			if(query.hprice){
				var price=query.hprice;
				var low=parseInt(price[0]);
				var high=parseInt(price[1]);
				if(low==0){
					query.hprice={$lte:high}
				}else if(low==1){
					console.log(high)
					query.hprice={$gte:high}
				}else{
					query.hprice={$gte:low,$lte:high}
				}
			}
    houseservice.findCountInfo(query,function(err,result){
        if(err) {
            console.log(err);
            res.sendResult(false,500,err)
        }
        else{
									   res.sendResult(result,200,'ok')
        }
    })
})

router.get('/getAllHouses', function (req, res) {
    // var hid = req.query.hid;
	var hid = req.session.hid.hid;
    console.log('进来了' + hid);
    houseservice.getHouseInfo(hid, function (err, data) {
        if (err) res.sendResult(data, 500, 'query err');
        else {
            console.log('housedata:' + data)
            res.sendResult(data, 200, 'query ok');
        }
    })
})

router.get('/getHouseid', function (req, res) {
    var uid = req.query.uid;

	console.log('进来了userinfo.uid:' + uid);
    houseservice.getHuidInfo(uid, function (err, data) {
        if (err) res.sendResult(data, 500, 'query err');
        else {
            console.log('userdata:' + data)
            res.sendResult(data, 200, 'query ok');
        }
    })
})

router.get('/addstore', function (req, res) {
    // var uid = req.query.uid;
	var uid = req.session.userinfo.uid;
	var hid = req.session.hid.hid;
    // var hid = req.query.hid;
    console.log('进来了' + uid);
    houseservice.addstore(uid, hid,function (err, data) {
        if (err) res.sendResult(data, 500, 'query err');
        else {
            console.log('userdata:' + data)
            res.sendResult(data, 200, 'query ok');
        }
    })
})

router.get('/reducestore', function (req, res) {
    // var uid = req.query.uid;
    // var hid = req.query.hid;
	var uid = req.session.userinfo.uid;
	var hid = req.session.hid.hid;
    console.log('进来了' + uid);
    houseservice.reducestore(uid, hid, function (err, data) {
        if (err) res.sendResult(data, 500, 'query err');
        else {
            console.log('userdata:' + data)
            res.sendResult(data, 200, 'query ok');
        }
    })
})

router.get('/sethid', function (req, res) {
	var id = req.query.hid
	req.session.hid = { 'hid': id };
	console.log('===============')
	console.log(req.session.hid)
	res.sendResult(true, 200, 'ok')
})
router.get('/showstore', function (req, res) {
    // var uid = req.query.uid;
    var uid = req.session.userinfo.uid;

    console.log('进来了userinfo.uid:' + uid);
    houseservice.showstore(uid, function (err, data) {
        if (err) res.sendResult(data, 500, 'query err');
        else {
            console.log('userdata:' + data)
            res.sendResult(data, 200, 'query ok');
        }
    })
})

//xc    管理员查询
router.get('/',function(req,res){
	var htype = req.query.type;//查询条件
	var query = JSON.parse(req.query.query);
	var querytype = req.query.querytype; 
	var pagenum = 0;//页码
	var pagesize = req.query.pagesize;//每页条数
	// console.log(Object.keys(query).length+'---'+Object.keys(query)[0]+' ---house中查询类型：'+typeof(Object.keys(query)));
	console.log('这是指什么呢'+pagenum);
	var condition = {
		'query':query,
		'querytype':querytype,
		'htype':htype,
		'pagenum':pagenum,
		'pagesize':pagesize
	};
	houseservice.getHouseInfo1(condition,function(err,result){
		if(err){
			var data = {'result':null};
			res.sendResult(data,500,err);
		} 
		else{
			var data = result;
			res.sendResult(result,200,'ok');
		}
	})
}),
router.get('/gethouselist',function(req,res){
	req.session.uid = req.query.uid;///////////会话关键
	// console.log('进入了goodlist路由');
	var htype = req.query.type;//查询条件
	var query = '';
	var query = JSON.parse(req.query.query);
	var querytype = req.query.querytype; 
	var pagenum = req.query.pagenum;//页码
	var pagesize = req.query.pagesize;//每页条数
	// console.log(Object.keys(query).length+'---'+Object.keys(query)[0]+' ---house中查询类型：'+typeof(Object.keys(query)));
	console.log('这是指什么呢'+pagenum);
	var condition = {
		'query':query,
		'querytype':querytype,
		'htype':htype,
		'pagenum':pagenum,
		'pagesize':pagesize
	};
	houseservice.getHouseInfo1(condition,function(err,result){
		if(err){
			var data = {'result':null};
			res.sendResult(data,500,err);
		} 
		else{
			var data = result;
			res.sendResult(result,200,'ok');
		}
	})
}),
router.get('/gethouse',function(req,res){
	var hid = '';
	if(req.query.hid == undefined) hid = req.session.hid;//查询条件
	else{
		req.session.hid = req.query.hid;
	} 
	hid = req.session.hid;//查询条件
	var query = {'hid':[hid]};
	// var query = JSON.parse(req.query.query);
	var querytype = ['hid']; 
	var htype = '';
	var pagenum = 0;//页码
	var pagesize = 0;//每页条数
	var condition = {
		'query':query,
		'querytype':querytype,
		'htype':htype,
		'pagenum':pagenum,
		'pagesize':pagesize
	};
	houseservice.getHouseInfo1(condition,function(err,result){
		if(err){
			var data = {'result':null};
			res.sendResult(data,500,err);
		} 
		else{
			var data = result;
			console.log('hid返回结果:'+data);
			res.sendResult(data,200,'ok');
		}
	})
}),
router.get('/insertInfo',function(req,res){
	var condition = req.query;
	var address = JSON.parse(req.query.haddress)
	condition.haddress = address.pname+address.cname+address.aname+address.details;
	condition.h_uid = req.session.userinfo.uid;
	condition.hprice = parseInt(condition.hprice);
	condition.harea = parseInt(condition.harea);

	for(var i =0;i<Object.keys(condition).length;i++){
		var property = Object.keys(condition)[i];
		if(condition[property]==''){
			console.log('property:'+property);
			condition[property]=undefined;
		} 
	}
	houseservice.insertInfo(condition,function(err,result){
		if(err){
			var data = {'result':null};
			res.sendResult(data,500,err);
		} 
		else{
			var data = result;
			console.log('插入返回结果:'+data);
			res.sendResult(data,200,'ok');
		}
	})
}),

router.get('/updateOneInfo',function(req,res){
	var whereStr = {};
	var updateStr = {};
	
	whereStr['hid'] = req.query.hid;
	updateStr.$set = {};
	for(var i =1;i<Object.keys(req.query).length;i++){
		var property = Object.keys(req.query)[i];
		console.log(i+'---'+property);
		updateStr.$set[property] = req.query[property];
	}
	console.log('updateStr : '+Object.keys(updateStr));
	houseservice.updateOneInfo(whereStr,updateStr,function(err,result){
		if(err) res.sendResult(null,500,err);
		else{
			console.log('更新结果 ： '+Object.keys(result)+'----'+result.upsertedCount+'---'+result.matchedCount);
			res.sendResult(result,200,'更新成功');
		} 
	})
});
router.get('/delete',function(req,res){
	var hid = req.query.hid;
	houseservice.deleteHouseInfo(hid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(null,200,'成功删除');
	})
});


module.exports=router