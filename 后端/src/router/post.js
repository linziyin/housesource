const express = require('express');
const router = express.Router();
const postService = require('../services/postService.js');
//假设已经获取到会话中的uid
// var uid = "5";

router.get('/',function(req,res){
	// console.log('session---'+JSON.stringify(req.session.userinfo));
	// console.log(JSON.stringify(req.query));
	var uid = req.session.userinfo.uid;
	var houseinfo = req.query;
	var address = JSON.parse(req.query.haddress)
	houseinfo.haddress = address.pname+address.cname+address.aname+address.details;
	houseinfo.h_uid =uid;
	for(var i=0; i<Object.keys(houseinfo).length; i++){
		var property = Object.keys(houseinfo)[i];
		if (houseinfo[property] == '') houseinfo[property]=undefined;
		else continue;
	}
	console.log(houseinfo);
	postService.postHouse(uid,houseinfo,function(err,result){
		if(err) res.sendResult(null,500,err);
		else res.sendResult(result,200,'valid');
	})
});

router.get('/latest',function(req,res){
	var uid = req.session.userinfo.uid;
	console.log('latest --- '+uid);
	postService.getLatest(uid,function(err,result){
		if(err) res.sendResult(null,500,err);
		else{
			res.sendResult(result,200,'valid');
		} 
	})
});

module.exports = router;