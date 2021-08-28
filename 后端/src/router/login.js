const express = require('express')
const router = express.Router()

const loginservice = require('../services/loginServices')
router.get('/', function(req, res) {
	var username = req.query.username;
	var password = req.query.password
	loginservice.getUserInfo(username, function(err, result) {
		if (err) {
			console.log(err);
			res.sendResult(false, 500, err)
		} else {
			if (result[0].password == password) {
				req.session.userinfo = result[0]; //将用户信息保存到会话session中
				var data = result[0];
				res.sendResult(data, 200, 'login ok')
			} else {
				var data = false;
				res.sendResult(data, 500, 'password is not vaild')
			}

		}
	})
	//res.end('login登录成功')
})

router.get('/user', function(req, res) {
	var data = req.session.userinfo
	console.log('-------------------')
	console.log(data)
	res.sendResult(data, 200, 'ok')
})

router.get('/setstore', function(req, res) {
	var storeid = req.query.store;
	var username = req.session.userinfo.username
	loginservice.setStoreInfo(username, storeid, function(err, result) {
		if (err) {
			console.log(err);
			res.sendResult(false, 500, err)
		} else {
			res.sendResult(result, 200, 'ok')
		}
	})
})

//xc    获取登录过来的uid
router.get('/menu', function(req, res) {
	// var uid = req.session.uid;//从会话中获取用户信息
	var uid = req.session.userinfo.uid;
	// var uid = req.query.uid;
	console.log(uid + ' login.js 会话得uid:  ' + Object.keys(req.session))
	loginservice.getmenuinfo(uid, function(err, result) {
		if (err) {
			console.log(err);
			var data = {
				'result': null
			};
			res.sendResult(data, 500, err);
		} else {
			var data = result;
			console.log('login.js : ' + result + '---' + data);
			res.sendResult(data, 200, 'login ok');
		}
	})
})
router.get('/getalluser', function(req, res) {
	var query = JSON.parse(req.query.query);
	var querytype = req.query.querytype;
	var pagenum = 0; //页码
	var pagesize = req.query.pagesize; //每页条数
	var condition = {
		'query': query,
		'querytype': querytype,
		'pagenum': pagenum,
		'pagesize': pagesize
	};
	loginservice.getUserInfomation(condition, function(err, result) {
		if (err) {
			var data = {
				'result': null
			};
			res.sendResult(data, 500, err);
		} else {
			var data = result;
			res.sendResult(result, 200, 'ok');
		}
	})
})
router.get('/getuserlist', function(req, res) {
	var query = JSON.parse(req.query.query);
	var querytype = req.query.querytype;
	var pagenum = req.query.pagenum; //页码
	var pagesize = req.query.pagesize; //每页条数
	var condition = {
		'query': query,
		'querytype': querytype,
		'pagenum': pagenum,
		'pagesize': pagesize
	};
	loginservice.getUserInfomation(condition, function(err, result) {
		if (err) {
			var data = {
				'result': null
			};
			res.sendResult(data, 500, err);
		} else {
			var data = result;
			res.sendResult(result, 200, 'ok');
		}
	})
})
router.get('/delete', function(req, res) {
	var uid = req.query.uid;
	console.log('uid : ' + uid);
	loginservice.deleteUserInfo(uid, function(err, result) {
		if (err) res.sendResult(null, 500, err);
		else res.sendResult(null, 200, '成功删除');
	})
})

module.exports = router
