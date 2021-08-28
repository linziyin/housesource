const db = require('../utils/database.js');

module.exports.postHouse = async function(uid,houseinfo,callback){
	db.getDatabase().collection('user').updateOne({"uid":uid},{$set:{"unumber":houseinfo.unumber}});
	db.getDatabase().collection('house').find({}).sort({"hid":-1}).limit(1).toArray(function(err,res){
		if(res.length == 0){
			var hid = "1";
		}
		else{
			var hid = Number(res[0].hid)+1;
		}
	  db.getDatabase().collection('house').insertOne({"hid":hid.toString(),"h_uid":uid,"htype":houseinfo.htype,"hname":houseinfo.hname,"haddress":houseinfo.haddress,"hprice":houseinfo.hprice,"harea":houseinfo.harea,"hlayout":houseinfo.hlayout,"htoward":houseinfo.htoward,"hfloor":houseinfo.hfloor,"hfeature":houseinfo.hfeature,"hopen":houseinfo.hopen,"hproperty":houseinfo.hproperty,"hstatus":houseinfo.hstatus,"hage":houseinfo.hage,"hway":houseinfo.hway,"htime":houseinfo.htime,"hfitup":houseinfo.hfitup,"hcheck":"0","hchange":"0","hpay":"0","himg":houseinfo.himg,"hdialogue":"","hcomment":[{}]}, function(err,result){
				if(err) return callback(err);
		  else{
			  console.log(result);
			  return callback(null,res);
		  }
	  })
	});
};

module.exports.getLatest = function(uid,callback){
	db.getDatabase().collection('house').find({"h_uid":uid}).collation({"locale":"zh",numericOrdering:true}).sort({"hid":-1}).limit(1).toArray(function(err,res){
		if(err) return callback(err);
		else {
			console.log(res[0]);
			return callback(null,res[0]);
		}
	})
}