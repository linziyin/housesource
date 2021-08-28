const mdb = require('../utils/database')

module.exports.getallhouseinfo =async function (city,type,cb) {
	 var cityname=new RegExp(city)
  var result=await mdb.getDatabase().collection("house").find({'haddress':cityname,'htype':type}).toArray();
		console.log(result)
		if(result.length>0){
			return cb(null,result)
		}else{
			return cb('查询失败')
		}
}

module.exports.findhouseinfo =async function (query,page,pagecount,cb) {
	console.log('query:'+query)
	var sk=page*pagecount;
  var result=await mdb.getDatabase().collection("house").find(query).skip(sk).limit(pagecount).toArray();
		console.log('result: '+result)
		if(result.length>0){
			return cb(null,result)
		}else{
			return cb('查询失败')
		}
}

module.exports.findcountinfo =async function (query,cb) {
	console.log(query)
  var result=await mdb.getDatabase().collection("house").find(query).count();
		console.log(result)
	return cb(null,result)
}

module.exports.getHouseFromMdb = function (hid, cb) {
    mdb.getDatabase().collection('house').find({ 'hid': hid }).toArray(function (err, result) {
        if (err) throw err;
        // console.log('result[0].password:' + result[0].password);
        console.log('houseresult:' + result);
        return cb(null, result);
    })
}

module.exports.getHuidFromMdb = function (uid, cb) {
    mdb.getDatabase().collection('user').find({ 'uid': uid }).toArray(function (err, result) {
        if (err) throw err;
        // console.log('result[0].password:' + result[0].password);
        console.log('userresult:' + result);
        return cb(null, result);
    })
}

module.exports.changstoreFromMdb = function (uid, hid, cb) {
    mdb.getDatabase().collection('user').updateOne({ 'uid': uid }, { $push: { 'store': hid } }, function (err, res) {
        if (err) throw err;
        console.log(res)
        mdb.getDatabase().collection('user').find({ 'uid': uid }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            return cb(null, result);
        })
    })
}

module.exports.addstoreFromMdb = function (uid, hid, cb) {
    mdb.getDatabase().collection('user').updateOne({ 'uid': uid }, { $push: { 'store': hid } }, function (err, res) {
        if (err) throw err;
        console.log(res)
        mdb.getDatabase().collection('user').find({ 'uid': uid }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            return cb(null, result);
        })
    })
}

module.exports.reducestoreFromMdb = function (uid, hid, cb) {
    mdb.getDatabase().collection('user').updateOne({ 'uid': uid }, { $pull: { 'store': hid } }, function (err, res) {
        if (err) throw err;
        console.log(res)
        mdb.getDatabase().collection('user').find({ 'uid': uid }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            return cb(null, result);
        })
    })
}
module.exports.showstoreFromMdb = function (uid, cb) {
    mdb.getDatabase().collection('user').find({ 'uid': uid }).toArray(function (err, result) {
        if (err) throw err;
        // console.log('result[0].password:' + result[0].password);
        console.log('userresult:' + result);
        return cb(null, result);
    })
}



//xc

 function getMaxhid(){
	
	return new Promise(async function(resolve, reject) {
		console.log('1号位');
		var obj =await mdb.getDatabase().collection('house').find().collation({"locale": "zh", numericOrdering:true}).sort({"hid":-1}).skip(0).limit(1).toArray(function(err, result){
			resolve(result[0].hid);
		})
	})
};
module.exports.getHouseInfo1 = async function(options,cb) {
	
	var index = (options.pagenum - 1) * options.pagesize; //查询的起始索引
	// console.log(dbo);
	// var dbo = mdb.getDatabaseMongoDB().db('mydb1');
	var size = Number(options.pagesize);
	var type = options.querytype;
	var query = options.query;
	var flag = true;
	for (var i = 0; i < Object.keys(query).length; i++) {
		var property = Object.keys(query)[i];
		if (query[property] != '') flag = false;
	}
	if (flag) {
		if (options.pagenum == 0) {
			mdb.getDatabase().collection('house').find({
				'htype': options.htype
			}).toArray(function(err, result) {
				if (err) {
					console.log('获取newhouse数据库出错111' + err)
					return cb('获取newhouse数据库出错');
				} else {
					console.log('查询结果：' + result);
					return cb(null, result);
				}

			});
		} else {
			mdb.getDatabase().collection('house').find({
				'htype': options.htype
			}).limit(size).skip(options.pagesize * (options.pagenum - 1)).toArray(function(err, result) {
				if (err) {
					console.log('获取newhouse数据库出错111' + err)
					return cb('获取newhouse数据库出错');
				} else {
					console.log('查询结果：' + result);
					return cb(null, result);
				}

			});
		}

	} else {
		console.log('模糊查找');
		var whereStr = {};
		var querys = options.query;
		if(options.htype!='') whereStr['htype'] = options.htype;
		
		for (var i = 0; i < Object.keys(query).length; i++) {
			var property = Object.keys(query)[i];
			if (query[property] != '') {
				if (query[property].length == 1) {
					console.log('if---' + typeof(query[property]) + '---' + property);
					var mohu = new RegExp(query[property]);
					if (property == 'h_uid' || property == 'hid') mohu = query[property].toString();
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
			mdb.getDatabase().collection('house').find(whereStr).toArray(
				function(
					err, result) {
					if (err) {
						console.log('获取newhouse数据库出错' + err)
						return cb('获取newhouse数据库出错');
					} else {
						console.log('查询结果：' + result);
						return cb(null, result);
					}
				});
		} else {
			mdb.getDatabase().collection('house').find(whereStr).limit(size).skip(options.pagesize * (options.pagenum - 1)).toArray(
				function(
					err, result) {
					if (err) {
						console.log('获取newhouse数据库出错' + err)
						return cb('获取newhouse数据库出错');
					} else {
						console.log('查询结果：' + result);
						return cb(null, result);
					}
				});
		}


	}

},
module.exports.deleteHouseInfo = function(hid,cb) {
	console.log(typeof(hid)+'删除的hid为 ： ' + Object.keys(hid)+hid.length);
	var whereStr = {};
	whereStr.$or = [];
	// if(hid.length==1)
	for(var i=0;i<Object.keys(hid).length;i++){
		var property = Object.keys(hid)[i];
		var obj = {'hid':hid[property]};
		whereStr.$or[i] = obj;
	}
	mdb.getDatabase().collection('house').deleteMany(whereStr, function(err, result) {
		if (err) {
			console.log('house delete查询数据出错 : '+err);
			return cb('house delete查询数据出错');
		} else {
			console.log('house delete结果 : '+result);
			return cb(null, result);
		}
	})
},




module.exports.insertInfo =async function(condition,cb) {
	console.log('添加的condition ： ' + Object.keys(condition));
	var hid = '';
	if(condition.hid!=undefined){
		hid = condition.hid;
		mdb.getDatabase().collection('house').deleteOne({'hid':hid});
	}
	else{
		var max = await getMaxhid();
		max = Number(max) +1
		console.log('hid最大值查询11 : '+max);
		condition.hid =''+max;
		condition.hcheck ='0';
		condition.hchange ='0';
		condition.hpay ='0';
	} 
	mdb.getDatabase().collection('house').insertOne(condition, function(err, result) {
		if (err) {
			return cb('house 插入查询数据出错');
		} else {
			return cb(null, result);
		}
	})
},

module.exports.updateOneInfo = function(whereStr,updateStr,cb) {
	mdb.getDatabase().collection('house').updateOne(whereStr,updateStr,function(err, result) {
		if (err) {
			console.log('house 更新数据出错');
			return cb('house 更新数据出错');
		} else {
			console.log('更新结果'+result);
			return cb(null, result);
		}
	})
}