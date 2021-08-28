const dbo=require('../dao/addressDao')

module.exports.getCityInfo=function(cb){
  dbo.getcityinfo(function(err,res){
     if(!err){
       return cb(null,res)
     }else{
       return cb(err)
     }
  })
}

module.exports.getAreaInfo=function(city,cb){
  dbo.getareainfo(city,function(err,res){
     if(!err){
       return cb(null,res)
     }else{
       return cb(err)
     }
  })
}