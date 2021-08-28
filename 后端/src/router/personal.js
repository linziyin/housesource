const express = require('express');
const router = express.Router();
const personalService = require('../services/personalService.js');

//假设已经得到session中的用户信息
// var uid = "5";

router.get('/',function(req,res){
	var uid = req.session.userinfo.uid;
	personalService.getUsername(uid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	})
});
//审核中
router.get('/incheck',function(req,res){
	// console.log('incheck 路由');
	var uid = req.session.userinfo.uid;
	personalService.getIncheck(uid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	})
});
//已通过
router.get('/pass',function(req,res){
	// console.log('pass 路由');
	var uid = req.session.userinfo.uid;
	personalService.getPass(uid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	})
});
//未通过
router.get('/notpass',function(req,res){
	// console.log('notpass 路由');
	var uid = req.session.userinfo.uid;
	personalService.getNotpass(uid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	})
});

router.get('/store',function(req,res){
	// console.log('store路由');
	var uid = req.session.userinfo.uid;
	personalService.getStore(uid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	})
});

router.get('/getStarhouse',function(req,res){
	// console.log('Starhouse路由');
	// console.log('req.query---'+JSON.stringify(req.query));
	// console.log('req.query---'+req.query[0]);
	var hid = req.query[0];
	personalService.getStarhouse(hid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	})
	// res.end();
})

//新房
router.get('/newhouse',function(req,res){
	console.log('newhouse 路由');
	var uid = req.session.userinfo.uid;
	personalService.getNewhouse(uid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	})
});
//二手房
router.get('/oldhouse',function(req,res){
	console.log('oldhouse 路由');
	var uid = req.session.userinfo.uid;
	personalService.getOldhouse(uid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	})
});
//租房
router.get('/renthouse',function(req,res){
	console.log('renthouse 路由');
	var uid = req.session.userinfo.uid;
	personalService.getRenthouse(uid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	})
});

module.exports = router;