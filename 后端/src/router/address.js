const express=require('express')
const router=express.Router()

const addressservice=require('../services/addressService')

router.get('/city',function(req,res){
    addressservice.getCityInfo(function(err,result){
        if(err) {
            console.log(err);
            res.sendResult(false,500,err)
        }
        else{
									   res.sendResult(result,200,'ok')
        }
    })
})

router.get('/area',function(req,res){
	   var city=req.query.cityname
    addressservice.getAreaInfo(city,function(err,result){
        if(err) {
            console.log(err);
            res.sendResult(false,500,err)
        }
        else{
									   res.sendResult(result,200,'ok')
        }
    })
})

module.exports=router