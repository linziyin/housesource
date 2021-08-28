const dao = require('../dao/personalDao.js');

module.exports.getUsername = function(uid,callback){
	dao.getUsername(uid,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};

module.exports.getIncheck = function(uid,callback){
	dao.getIncheck(uid,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};

module.exports.getPass = function(uid,callback){
	dao.getPass(uid,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};

module.exports.getNotpass = function(uid,callback){
	dao.getNotpass(uid,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};

module.exports.getStore = function(uid,callback){
	dao.getStore(uid,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};

module.exports.getStarhouse = function(hid,callback){
	dao.getStarhouse(hid,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};
