const dbo=require('../dao/userDao')

module.exports.getUserInfo=function(username,cb){
  //查询用户信息
  dbo.getUserinfo(username,function(err,res){
     if(!err){
       return cb(null,res)
     }else{
       return cb(err)
     }
  })
}

module.exports.setStoreInfo=function(username,storeid,cb){
  //查询用户信息
  dbo.setstoreinfo(username,storeid,function(err,res){
     if(!err){
       return cb(null,res)
     }else{
       return cb(err)
     }
  })
}

//xc  获取uid
module.exports.getmenuinfo = function(uid,cb){
	dbo.getusermenuinfo(uid,function(err,data){
		if (!err){
			console.log('loginService: '+uid);
			return cb(null,data);
		}
		else{
			return cb(err);
		}
	})
}

module.exports.getUserInfomation = function(condition,cb){
	dbo.getUserInfomation(condition,function(err,data){
		if (!err){
			console.log('loginService-getUserInfo: '+condition);
			return cb(null,data);
		}
		else{
			return cb(err);
		}
	})
}
module.exports.deleteUserInfo = function(uid, cb) {

	dbo.deleteUserInfo(uid, function(err, res) {
		if (err) return cb(err);
		else {
			return cb(null, res);
		}
	})
}
