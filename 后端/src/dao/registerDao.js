const db = require('../utils/database.js');

module.exports.postRegister = function(userinfo, callback) {
	db.getDatabase().collection('user').find({}).sort({"uid": -1}).limit(1).toArray(function(err, res) {
		if (err) return callback('查询数据出错');
		else {
			var uid = Number(res[0].uid)+1;
			db.getDatabase().collection('user').insertOne({"uid":uid.toString(),"username":userinfo.username,"password":userinfo.password,"gender":userinfo.gender,"uaddress":userinfo.uaddress,"role":1,"store":[],"cname":userinfo.cname,"unumber":""},function(err,result){
				if(err) return callback('插入数据出错');
				else{
					// console.log('插入了'+result+'条数据');
					return callback(null,result);
				}
			})
		}
	})
};

module.exports.checkUname = function(uname,callback){
	db.getDatabase().collection('user').find({"username":uname}).toArray(function(err,res){
		console.log(res.length);
		if(res.length != 0) return callback('用户名已存在');
		else return callback(null,res);
	})
};

module.exports.getProvince = function(options,callback){
	db.getDatabase().collection('address').distinct("pname",function(err,res){
		if(err) return callback('err null');
		else{
			// console.log(res);
			return callback(null,res);
		}
	})
};

module.exports.getCities = function(pname,callback){
	db.getDatabase().collection('address').distinct("cname",{"pname":pname},function(err,res){
		if(err) return callback('err null');
		else{
			// console.log(res);
			return callback(null,res);
		}
	})
};

module.exports.getArea = function(address,callback){
	db.getDatabase().collection('address').distinct("aname",{"pname": address.pname,"cname":address.cname},function(err,res){
		if(err) return callback('err null');
		else{
			// console.log(res);
			return callback(null,res);
		}
	})
};


