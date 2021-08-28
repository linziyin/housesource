const dao = require('../dao/registerDao.js');

module.exports.postRegister = function(userinfo,callback){
	dao.postRegister(userinfo,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};

module.exports.checkUname = function(uname,callback){
	dao.checkUname(uname,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};

module.exports.getProvince = function(options,callback){
	dao.getProvince(options,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
}

module.exports.getCities = function(pname,callback){
	dao.getCities(pname,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};

module.exports.getArea = function(address,callback){
	dao.getArea(address,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
}