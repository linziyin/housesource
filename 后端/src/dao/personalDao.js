const db = require('../utils/database.js');
//个人信息
module.exports.getUsername = function(uid,callback){
	db.getDatabase().collection('user').find({"uid":uid}).toArray(function(err,res){
		if(err) return callback(err);
		else {
			return callback(null,res[0]);
		}
	})
};
//展示发布的房源 审核中---已通过---未通过
module.exports.getIncheck = function(uid,callback){
	db.getDatabase().collection('house').find({"h_uid":uid,"hcheck":"0"}).toArray(function(err,res){
		if(err) return callback(err);
		else {
			// console.log(res);
			return callback(null,res);
		}
	})
};

module.exports.getPass = function(uid,callback){
	db.getDatabase().collection('house').find({"h_uid":uid,"hcheck":"1"}).toArray(function(err,res){
		if(err) return callback(err);
		else {
			// console.log(res);
			return callback(null,res);
		}
	})
};

module.exports.getNotpass = function(uid,callback){
	db.getDatabase().collection('house').find({"h_uid":uid,"hcheck":"2"}).toArray(function(err,res){
		if(err) return callback(err);
		else {
			// console.log(res);
			return callback(null,res);
		}
	})
};
//展示收藏的房源 新房---二手房---租房
module.exports.getStore = function(uid,callback){
	db.getDatabase().collection('user').find({"uid":uid}).toArray(function(err,res){
		if(err) return callback(err);
		else {
			// console.log(res[0].store);
			return callback(null,res[0].store);
		}
	})
};

module.exports.getStarhouse = function(hid,callback){
	db.getDatabase().collection('house').find({"hid":hid}).toArray(function(err,res){
		if(err) return callback(err);
		else {
			// console.log(res[0]);
			return callback(null,res[0]);
		}
	})
};
