const dao = require('../dao/postDao.js');

module.exports.postHouse = function(uid,houseinfo,callback){
	dao.postHouse(uid,houseinfo,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};

module.exports.getLatest = function(uid,callback){
	dao.getLatest(uid,function(err,res){
		if(err) return callback(err);
		else return callback(null,res);
	})
};
