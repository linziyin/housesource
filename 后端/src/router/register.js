const express = require('express');
const router = express.Router();
const registerService = require('../services/registerService.js');

router.get('/',function(req,res){
	console.log('get注册页面');
	// console.log('req.query---'+JSON.stringify(req.query));
	var username = req.query.username;
	var password = req.query.password;
	var gender = req.query.gender;
	// req.query.uaddress为JSON格式 需要先转化为对象
	var address = JSON.parse(req.query.uaddress);
	var uaddress = address.pname+address.cname+address.aname;
	// console.log(uaddress);
	var cname = address.cname;
	var userinfo = {
		'username': username,
		'password': password,
		'gender': gender,
		'uaddress': uaddress,
		'cname': cname
	};
	registerService.postRegister(userinfo,function(err,result){
		if(err) res.sendResult(null, 500, err);
		else res.sendResult(result, 200, '注册成功');
	})
});

router.get('/same',function(req,res){
	console.log(req.query.uname);
	var uname = req.query.uname;
	registerService.checkUname(uname,function(err,result){
		if(err) res.sendResult(null, 500, err);
		else res.sendResult(result, 200, 'valid');
	})
});

router.get('/province',function(req,res){
	registerService.getProvince(null,function(err,result){
			if(err) res.sendResult(null,500,err);
			else res.sendResult(result,200,'valid');
	});
});

router.get('/city',function(req,res){
	// var uaddress = {'pname': '广东省','cname': '','aname': ''};
	// console.log(JSON.stringify(req.query));
	var pname = req.query.pname;
	registerService.getCities(pname,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	});
		
});

router.get('/area',function(req,res){
	// var uaddress = {'pname': '广东省','cname': '广州市','aname': ''};
	// console.log(JSON.stringify(req.query));
	var address = req.query;
	registerService.getArea(address,function(err,result){
			if(err) res.sendResult(null,500,err);
			else res.sendResult(result,200,'valid');
		});
})

module.exports = router;