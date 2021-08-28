const mdb = require('../utils/database')

module.exports.getcityinfo =async function (cb) {
  var result=await mdb.getDatabase().collection("address").distinct('cname',{});
		console.log(result)
		if(result.length>0){
			return cb(null,result)
		}else{
			return cb('查询失败')
		}
}

module.exports.getareainfo =async function (city,cb) {
  var result=await mdb.getDatabase().collection("address").distinct('aname',{'cname':city});
		console.log(result)
		if(result.length>0){
			return cb(null,result)
		}else{
			return cb('查询失败')
		}
}