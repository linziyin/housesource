const dao=require('../dao/houseDao')

module.exports.getallHouseInfo=function(city,type,cb){
  dao.getallhouseinfo(city,type,function(err,res){
     if(!err){
       return cb(null,res)
     }else{
       return cb(err)
     }
  })
}

module.exports.findHouseInfo=function(query,page,pagecount,cb){
  dao.findhouseinfo(query,page,pagecount,function(err,res){
     if(!err){
       return cb(null,res)
     }else{
       return cb(err)
     }
  })
}

module.exports.findCountInfo=function(query,cb){
  dao.findcountinfo(query,function(err,res){
     if(!err){
       return cb(null,res)
     }else{
       return cb(err)
     }
  })
}

module.exports.getHouseInfo = function (hid, cb) {

    // dao.getUser(username, function (err, res) {
    //     if (!err) return cb(null, res);
    //     else return cb('错误！');
    // })

    dao.getHouseFromMdb(hid, function (err, res) {
        if (!err) return cb(null, res);
        else return cb('错误！');
    })

}

module.exports.getHuidInfo = function (uid, cb) {
    dao.getHuidFromMdb(uid, function (err, res) {
        if (!err) return cb(null, res);
        else return cb('错误！');
    })

}

module.exports.addstore = function (uid, hid,cb) {
    dao.addstoreFromMdb(uid,hid, function (err, res) {
        if (!err) return cb(null, res);
        else return cb('错误！');
    })

}

module.exports.reducestore = function (uid, hid, cb) {
    dao.reducestoreFromMdb(uid, hid, function (err, res) {
        if (!err) return cb(null, res);
        else return cb('错误！');
    })

}
module.exports.showstore = function (uid, cb) {
  dao.showstoreFromMdb(uid, function (err, res) {
    if (!err) return cb(null, res);
    else return cb('错误！');
  })

}

//xc  管理员
module.exports.getHouseInfo1 = function(options, cb) {
	dao.getHouseInfo1(options, async function(err, res) {
			if (!err){
				console.log('service-getNewHouseInfo: '+res);
				return cb(null,res);
			}
			else{
				return cb(err);
			}
	});

},

module.exports.insertInfo = function(options, cb) {
	dao.insertInfo(options, async function(err, res) {
			if (!err){
				console.log('service-getNewHouseInfo: '+res);
				return cb(null,res);
			}
			else{
				return cb(err);
			}
	});

},
module.exports.deleteHouseInfo = function(hid, cb) {

	dao.deleteHouseInfo(hid, function(err, res) {
		if (err) return cb(err);
		else {
			return cb(null, res);
		}
	})
},

module.exports.updateOneInfo = function(whereStr,updateStr, cb) {

	dao.updateOneInfo(whereStr,updateStr, function(err, res) {
		if (err) return cb(err);
		else {
			return cb(null, res);
		}
	})
}