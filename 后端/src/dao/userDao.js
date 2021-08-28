const mdb = require('../utils/database')

module.exports.getUserinfo = function (username, cb) {
    mdb.getDatabase().collection("user").find({ 'username': username }).toArray(function (err, result) { // 返回集合中所有数据
        if (err) return cb('查询出错');
        console.log(result);
        if (result.length < 1) {
            return cb('该用户不存在')
        } else {
            return cb(null, result)
        }
    });
}

module.exports.setstoreinfo =async function (username,storeid, cb) {
   await mdb.getDatabase().collection("user").update({ 'username': username },{ $addToSet: { store:storeid } })
				return cb(null, true)
}

//xc
module.exports.getusermenuinfo = function(uid,cb){
	// db.user.distinct("role",{uid:"0"})
	var params = uid;
	// mdb.getDatabase().collection('user').find({"uid":"0"},{"role":1,"_id":0}).toArray(function(err,result){
		mdb.getDatabase().collection('user').distinct("role",{uid:params},function(err,result){

		if (err) {
			console.log('获取角色数据库出错' + err)
			return cb('获取角色数据库出错');
		} else {
			console.log('查询角色结果：' + result);
			return cb(null, result);
		}
	})
}
module.exports.getUserInfomation = function(options,cb){
	var index = (options.pagenum - 1) * options.pagesize; //查询的起始索引
	var size = Number(options.pagesize);
	var type = options.querytype;
	var query = options.query;
	var flag = true;
	for (var i = 0; i < Object.keys(query).length; i++) {
		var property = Object.keys(query)[i];
		if (query[property] != '') flag = false;
	}
	if (flag) {
		if (options.pagenum == 0) {  //查询全部，无条件无分页
			mdb.getDatabase().collection('user').find().toArray(function(err, result) {
				if (err) {
					console.log('获取alluser数据库出错111' + err)
					return cb('获取alluser数据库出错');
				} else {
					console.log('alluser查询结果：' + result);
					return cb(null, result);
				}
	
			});
		} else {   //无条件分页搜索
			mdb.getDatabase().collection('user').find().limit(size).skip(options.pagesize * (options.pagenum - 1)).toArray(function(err, result) {
				if (err) {
					console.log('获取分页user数据库出错111' + err)
					return cb('获取分页user数据库出错');
				} else {
					console.log('分页user查询结果：' + result);
					return cb(null, result);
				}
	
			});
		}
	
	} else {  
		console.log('模糊查找');
		var whereStr = {};
		var querys = options.query;
		for (var i = 0; i < Object.keys(query).length; i++) {
			var property = Object.keys(query)[i];
			if (query[property] != '') {
				if (query[property].length == 1) {
					console.log('if---' + typeof(query[property]) + '---' + property);
					var mohu = new RegExp(query[property]);
					if (property == 'uid') mohu = query[property].toString();
					whereStr[type[i]] = mohu;
				} else {
					console.log('else---' + query[property].length);
					whereStr.$or = [];
					var x = query[property];
					console.log(x[0]);
					var xiabiao = 0;
					for (var j = 0; j < (x.length); j++) {
						if (x[j] == '') continue;
						var mohu1 = new RegExp(x[j]);
						var obj = {};
						obj[type[i]] = mohu1;
						whereStr.$or[xiabiao] = obj;
						xiabiao++;
					}
					if (xiabiao == 0) whereStr.$or = undefined;
	
				}
			}
	
		}
		console.log(whereStr);
		if (options.pagenum == 0) {
			mdb.getDatabase().collection('user').find(whereStr).toArray(
				function(
					err, result) {
					if (err) {
						console.log('获取user1数据库出错' + err)
						return cb('获取user1数据库出错');
					} else {
						console.log('user1查询结果：' + result);
						return cb(null, result);
					}
				});
		} else {
			mdb.getDatabase().collection('user').find(whereStr).limit(size).skip(options.pagesize * (options.pagenum - 1)).toArray(
				function(
					err, result) {
					if (err) {
						console.log('获取user2数据库出错' + err)
						return cb('获取user2数据库出错');
					} else {
						console.log('user2查询结果：' + result);
						return cb(null, result);
					}
				});
		}
	
	
	}
}
module.exports.deleteUserInfo = function(uid,cb) {
	console.log(typeof(uid)+'删除的uid为 ： ' + Object.keys(uid)+uid.length);
	var whereStr = {};
	whereStr.$or = [];
	// if(uid.length==1)
	for(var i=0;i<Object.keys(uid).length;i++){
		var property = Object.keys(uid)[i];
		var obj = {'uid':uid[property]};
		whereStr.$or[i] = obj;
	}
	mdb.getDatabase().collection('user').deleteMany(whereStr, function(err, result) {
		if (err) {
			console.log('user delete查询数据出错 : '+err);
			return cb('user delete查询数据出错');
		} else {
			console.log('user delete结果 : '+result);
			return cb(null, result);
		}
	})
}